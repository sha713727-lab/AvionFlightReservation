#!/usr/bin/env bash
# Safe AvioSupportDesk update — touches ONLY this project's containers.
# Does not restart host nginx, other compose projects, or other site directories.
#
# Usage (on the VPS):
#   cd /var/www/aviosupportdesk
#   bash deploy/safe-update.sh              # pull + nginx reload (sitemap/config)
#   bash deploy/safe-update.sh --frontend   # also rebuild frontend (meta/robots/JS)

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

ENV_FILE="${ENV_FILE:-deploy/.env.production}"
COMPOSE=(docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE")
DOMAIN="${DOMAIN:-aviosupportdesk.com}"
REBUILD_FRONTEND=0

for arg in "$@"; do
  case "$arg" in
    --frontend) REBUILD_FRONTEND=1 ;;
    -h|--help)
      echo "Usage: bash deploy/safe-update.sh [--frontend]"
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

echo "==> Syncing nginx active.conf from aviosupportdesk.conf"
cp deploy/nginx/aviosupportdesk.conf deploy/nginx/active.conf

echo "==> Containers in THIS project:"
"${COMPOSE[@]}" ps --format 'table {{.Name}}\t{{.Status}}\t{{.Ports}}' || "${COMPOSE[@]}" ps

if [[ "$REBUILD_FRONTEND" -eq 1 ]]; then
  echo "==> Rebuilding ONLY frontend image (not api/postgres/redis)"
  "${COMPOSE[@]}" build --no-cache frontend
  echo "==> Recreating ONLY frontend container"
  "${COMPOSE[@]}" up -d --no-deps --force-recreate frontend
fi

echo "==> Validating THIS project's nginx config"
"${COMPOSE[@]}" exec -T nginx nginx -t

echo "==> Reloading THIS project's nginx (graceful — no container recreate, no port drop)"
"${COMPOSE[@]}" exec -T nginx nginx -s reload

echo "==> Health checks for $DOMAIN only"
sleep 3
curl -fsS -o /dev/null -w "homepage:%{http_code}\n" "https://${DOMAIN}/" || true
curl -fsS -o /dev/null -w "sitemap:%{http_code}\n" "https://${DOMAIN}/sitemap.xml" || true
curl -fsS -o /dev/null -w "sitemap_index:%{http_code}\n" "https://${DOMAIN}/sitemap_index.xml" || true
curl -fsS "https://${DOMAIN}/sitemap.xml" | head -n 5 || true

echo "==> Done. Other VPS sites were not restarted."
