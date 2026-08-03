#!/usr/bin/env bash
# Quick fix when nginx is restarting after first deploy.
set -euo pipefail
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "==> nginx logs (last 40 lines)"
docker compose -f docker-compose.prod.yml --env-file deploy/.env.production logs --tail=40 nginx || true

echo "==> cert files"
ls -la deploy/certbot/conf/live/aviosupportdesk.com/ || true

echo "==> switching to TLS active.conf and recreating nginx"
cp deploy/nginx/aviosupportdesk.conf deploy/nginx/active.conf
docker compose -f docker-compose.prod.yml --env-file deploy/.env.production up -d --force-recreate nginx

sleep 2
docker compose -f docker-compose.prod.yml --env-file deploy/.env.production ps nginx
curl -Ik https://127.0.0.1 2>&1 | head -n 15 || true
curl -sk https://127.0.0.1/api/v1/health || true
echo
