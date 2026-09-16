#!/usr/bin/env bash
# Safe AvioSupportDesk update — touches ONLY this project's containers.
# Does not restart host nginx, other compose projects, or other site directories.
#
# Usage (on the VPS):
#   cd /var/www/aviosupportdesk
#   bash deploy/safe-update.sh              # pull + nginx reload (sitemap/config)
#   bash deploy/safe-update.sh --frontend   # also rebuild frontend (meta/robots/JS)
#   bash deploy/safe-update.sh --recreate-nginx  # remount nginx volumes (brief 80/443 blip for THIS edge only)

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

ENV_FILE="${ENV_FILE:-deploy/.env.production}"
COMPOSE=(docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE")
DOMAIN="${DOMAIN:-aviosupportdesk.com}"
REBUILD_FRONTEND=0
RECREATE_NGINX=0

for arg in "$@"; do
  case "$arg" in
    --frontend) REBUILD_FRONTEND=1 ;;
    --recreate-nginx) RECREATE_NGINX=1 ;;
    -h|--help)
      echo "Usage: bash deploy/safe-update.sh [--frontend] [--recreate-nginx]"
      exit 0
      ;;
    *)
      echo "Unknown option: $arg" >&2
      exit 1
      ;;
  esac
done

echo "==> Project dir: $ROOT_DIR"
echo "==> Compose project containers only (aviosupportdesk-*). Other sites are not touched."

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE" >&2
  exit 1
fi

echo "==> Fetching origin/main (this repo only)"
git fetch origin main

echo "==> Updating working tree to origin/main"
git reset --hard origin/main

echo "==> Syncing nginx active.conf in-place (keeps Docker bind-mount inode)"
# IMPORTANT: do not use `cp` here — replacing the inode leaves the container on stale config.
# Strip UTF-8 BOM if present (Windows editors); nginx fails with: unknown directive "#"
if command -v python3 >/dev/null 2>&1; then
  python3 - <<'PY'
from pathlib import Path
src = Path('deploy/nginx/aviosupportdesk.conf')
dst = Path('deploy/nginx/active.conf')
data = src.read_bytes()
if data.startswith(b'\xef\xbb\xbf'):
    data = data[3:]
dst.write_bytes(data)
PY
else
  cat deploy/nginx/aviosupportdesk.conf > deploy/nginx/active.conf
fi
cp -f Frontend/public/sitemap.xml deploy/nginx/static/sitemap.xml
cp -f Frontend/public/sitemap_index.xml deploy/nginx/static/sitemap_index.xml

# Preserve multi-site HTTPS vhosts. git tracks HTTP-only enabled.conf for bootstrap;
# without this, `git reset --hard` drops SSL blocks and browsers get aviosupportdesk.com
# cert on jumpifzero/flightbugs/quantara → ERR_CERT_COMMON_NAME_INVALID.
CERT_LIVE="$ROOT_DIR/deploy/certbot/conf/live"
if [[ -f "$CERT_LIVE/jumpifzero.com/fullchain.pem" \
   && -f "$CERT_LIVE/flightbugs.com/fullchain.pem" \
   && -f "$CERT_LIVE/quantarafinancial.info/fullchain.pem" ]]; then
  echo "==> Restoring HTTPS multi-site vhosts (certs present)"
  cp -f deploy/nginx/sites/other-sites.conf.tpl deploy/nginx/sites/enabled.conf
elif [[ -f "$CERT_LIVE/jumpifzero.com-0002/fullchain.pem" \
   && -f "$CERT_LIVE/flightbugs.com/fullchain.pem" \
   && -f "$CERT_LIVE/quantarafinancial.info/fullchain.pem" ]]; then
  echo "==> WARN: jumpifzero.com live path missing; found jumpifzero.com-0002"
  echo "    Run: bash deploy/enable-multi-site-edge.sh"
  cp -f deploy/nginx/sites/other-sites.http-only.conf.tpl deploy/nginx/sites/enabled.conf
else
  echo "==> Multi-site certs incomplete — keeping HTTP-only other-site vhosts"
  cp -f deploy/nginx/sites/other-sites.http-only.conf.tpl deploy/nginx/sites/enabled.conf
fi

echo "==> Containers in THIS project:"
"${COMPOSE[@]}" ps --format 'table {{.Name}}\t{{.Status}}\t{{.Ports}}' || "${COMPOSE[@]}" ps

if [[ "$REBUILD_FRONTEND" -eq 1 ]]; then
  echo "==> Rebuilding ONLY frontend image (not api/postgres/redis)"
  "${COMPOSE[@]}" build --no-cache frontend
  echo "==> Recreating ONLY frontend container"
  "${COMPOSE[@]}" up -d --no-deps --force-recreate frontend
fi

if [[ "$RECREATE_NGINX" -eq 1 ]]; then
  echo "==> Recreating ONLY aviosupportdesk-nginx (remounts config/static volumes)"
  echo "    Note: this process owns host :80/:443 — expect a 1–3s blip for sites on those ports."
  "${COMPOSE[@]}" up -d --no-deps --force-recreate nginx
else
  echo "==> Validating THIS project's nginx config"
  "${COMPOSE[@]}" exec -T nginx nginx -t
  echo "==> Reloading THIS project's nginx (graceful — no container recreate)"
  "${COMPOSE[@]}" exec -T nginx nginx -s reload
fi

echo "==> Confirm loaded sitemap locations"
"${COMPOSE[@]}" exec -T nginx nginx -T 2>/dev/null | grep -E 'location = /sitemap|sitemap(_index)?\.xml' || true
"${COMPOSE[@]}" exec -T nginx ls -la /var/www/static || true

echo "==> Health checks for $DOMAIN only"
sleep 3
curl -fsS -o /dev/null -w "homepage:%{http_code}\n" "https://${DOMAIN}/" || true
curl -fsS -o /dev/null -w "sitemap:%{http_code} ctype:%{content_type}\n" "https://${DOMAIN}/sitemap.xml" || true
echo -n "sitemap_redirect:"
curl -sI "https://${DOMAIN}/sitemap" | tr -d '\r' | awk '/^HTTP/{c=$2} tolower($1)=="location:"{l=$2} END{print c " location:" l}'
curl -fsS -o /dev/null -w "sitemap_index:%{http_code} ctype:%{content_type}\n" "https://${DOMAIN}/sitemap_index.xml" || true
echo "-- sitemap.xml cache-control --"
curl -fsSI "https://${DOMAIN}/sitemap.xml" | grep -i cache-control || true
echo "-- sitemap_index.xml cache-control --"
curl -fsSI "https://${DOMAIN}/sitemap_index.xml" | grep -i cache-control || true

echo "==> Done. Other compose projects were not restarted."
echo "    GSC: remove old /sitemap if listed, submit sitemap.xml; confirm Success in GSC UI."
