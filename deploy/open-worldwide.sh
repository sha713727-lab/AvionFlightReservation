#!/usr/bin/env bash
# Open aviosupportdesk.com to the whole world (remove all country blocks).
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

ENV_FILE="$ROOT_DIR/deploy/.env.production"
COMPOSE=(docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE")

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE"
  exit 1
fi

echo "==> Pulling latest code..."
git pull origin main

echo "==> Removing country block rules..."
mkdir -p deploy/geo
printf '%s\n' '# No countries blocked — site is open worldwide.' > deploy/geo/blocked-countries.txt
printf '%s\n' '# No CIDR denylist — site is open worldwide.' > deploy/geo/blocked-cidrs.conf
rm -f deploy/nginx/00-geo-block.conf

echo "==> Syncing open nginx config (no geo deny)..."
cp deploy/nginx/aviosupportdesk.conf deploy/nginx/active.conf

echo "==> Ensuring host firewall allows the world on 80/443..."
if command -v ufw >/dev/null 2>&1; then
  ufw allow OpenSSH >/dev/null 2>&1 || true
  ufw allow 80/tcp >/dev/null 2>&1 || true
  ufw allow 443/tcp >/dev/null 2>&1 || true
  ufw --force enable >/dev/null 2>&1 || true
  ufw status numbered || true
fi

echo "==> Recreating nginx without country blocking..."
"${COMPOSE[@]}" up -d --force-recreate nginx

echo "==> Waiting for HTTPS..."
ready=0
for _ in $(seq 1 30); do
  if curl -fsS --max-time 5 "https://aviosupportdesk.com/" >/dev/null 2>&1 \
    || curl -fsS --max-time 5 -k "https://127.0.0.1/" -H "Host: aviosupportdesk.com" >/dev/null 2>&1; then
    ready=1
    break
  fi
  sleep 2
done

if [[ "$ready" -ne 1 ]]; then
  echo "WARNING: HTTPS check did not succeed yet. Recent nginx logs:"
  "${COMPOSE[@]}" logs --tail=60 nginx || true
  exit 1
fi

echo
echo "DONE. Website is open worldwide. No country is blocked."
