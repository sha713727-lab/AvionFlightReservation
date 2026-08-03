#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

ENV_FILE="$ROOT_DIR/deploy/.env.production"
DOMAIN="${DOMAIN:-aviosupportdesk.com}"
ACTIVE_CONF="$ROOT_DIR/deploy/nginx/active.conf"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE — copy deploy/env.production.example to deploy/.env.production and set secrets."
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

mkdir -p deploy/certbot/www deploy/certbot/conf

cp deploy/nginx/aviosupportdesk.bootstrap.conf "$ACTIVE_CONF"

echo "==> Building and starting stack (HTTP)..."
docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE" up -d --build

echo "==> Waiting for API via nginx..."
ready=0
for _ in $(seq 1 90); do
  if curl -fsS "http://127.0.0.1/api/v1/health" >/dev/null 2>&1; then
    ready=1
    break
  fi
  sleep 2
done

if [[ "$ready" -ne 1 ]]; then
  echo "API did not become healthy in time."
  docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE" logs --tail=80 api frontend nginx
  exit 1
fi

echo "==> Seeding catalog..."
docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE" exec -T \
  -e ALLOW_DESTRUCTIVE_SEED="${ALLOW_DESTRUCTIVE_SEED:-true}" \
  api npx prisma db seed || true

if [[ ! -f "deploy/certbot/conf/live/${DOMAIN}/fullchain.pem" ]]; then
  echo "==> Requesting Let's Encrypt certificate..."
  docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE" --profile tools run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "${CERTBOT_EMAIL}" \
    --agree-tos \
    --no-eff-email \
    -d "${DOMAIN}" \
    -d "www.${DOMAIN}"
fi

echo "==> Enabling TLS nginx config..."
cp deploy/nginx/aviosupportdesk.conf "$ACTIVE_CONF"
docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE" up -d --force-recreate nginx

sleep 3
docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE" ps nginx
docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE" logs --tail=40 nginx

echo "==> Done. Site: https://${DOMAIN}"
