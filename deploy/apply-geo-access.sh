#!/usr/bin/env bash
# Apply worldwide ALLOW + selective country BLOCK on Hostinger VPS.
# Also hardens common misconfigs that accidentally block UK/Europe.
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

echo "==> Syncing nginx server config..."
cp deploy/nginx/aviosupportdesk.conf deploy/nginx/active.conf

echo "==> Building country blocklist (Middle East + South Asia only)..."
chmod +x deploy/scripts/build-geo-blocklist.sh
bash deploy/scripts/build-geo-blocklist.sh

echo "==> Ensuring host firewall allows the world on 80/443..."
if command -v ufw >/dev/null 2>&1; then
  ufw allow OpenSSH >/dev/null 2>&1 || true
  ufw allow 80/tcp >/dev/null 2>&1 || true
  ufw allow 443/tcp >/dev/null 2>&1 || true
  ufw --force enable >/dev/null 2>&1 || true
  ufw status numbered || true
else
  echo "ufw not installed — skipping (check Hostinger hPanel → VPS → Firewall)"
fi

echo "==> Reloading nginx with geo access policy..."
"${COMPOSE[@]}" up -d --force-recreate nginx

echo "==> Waiting for HTTPS..."
ready=0
for _ in $(seq 1 30); do
  if curl -fsS --max-time 5 "https://127.0.0.1/" -H "Host: aviosupportdesk.com" -k >/dev/null 2>&1 \
    || curl -fsS --max-time 5 "https://aviosupportdesk.com/" >/dev/null 2>&1; then
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
echo "DONE. Site is open worldwide EXCEPT blocked countries in deploy/geo/blocked-countries.txt"
echo
echo "CRITICAL — Hostinger CDN (if enabled):"
echo "  hPanel → Websites → aviosupportdesk.com → CDN → Traffic blocking"
echo "  1) Turn OFF \"Allow only specific countries\" (this blocks UK/Europe)."
echo "  2) Use \"Block country\" and add the same blocked list, OR leave CDN country rules empty"
echo "     and rely on this nginx blocklist."
echo
echo "CRITICAL — Hostinger VPS Firewall:"
echo "  hPanel → VPS → Firewall must ACCEPT TCP 22, 80, 443 from Anywhere (0.0.0.0/0)."
echo "  Do NOT restrict 80/443 to a country allowlist."
