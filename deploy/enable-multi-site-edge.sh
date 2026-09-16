#!/usr/bin/env bash
# Make aviosupportdesk-nginx the shared :80/:443 edge for all VPS sites.
# Do NOT use `certbot --nginx` on the host — Docker already owns those ports.
#
# Usage:
#   cd /var/www/aviosupportdesk
#   bash deploy/enable-multi-site-edge.sh
#
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

ENV_FILE="${ENV_FILE:-deploy/.env.production}"
COMPOSE=(docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE")
CERT_DIR="$ROOT_DIR/deploy/certbot/conf/live"

read_env() {
  local key="$1"
  local line
  line="$(grep -E "^${key}=" "$ENV_FILE" | tail -n 1 || true)"
  printf '%s' "${line#*=}" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//"
}

CERTBOT_EMAIL="${CERTBOT_EMAIL:-$(read_env CERTBOT_EMAIL)}"
if [[ -z "$CERTBOT_EMAIL" ]]; then
  echo "Set CERTBOT_EMAIL in $ENV_FILE" >&2
  exit 1
fi

echo "==> Create shared Docker network: web"
docker network create web >/dev/null 2>&1 || true

echo "==> Attach site containers to web network"
for c in \
  aviosupportdesk-nginx-1 \
  jumpifzero-frontend-1 \
  flightbugs-proxy-1 \
  flightbugs-frontend-1 \
  quantara-frontend-1
do
  if docker inspect "$c" >/dev/null 2>&1; then
    docker network connect web "$c" >/dev/null 2>&1 || true
    echo "  linked: $c"
  else
    echo "  missing (skip): $c"
  fi
done

echo "==> Pull latest edge config"
git fetch origin main
git reset --hard origin/main

echo "==> Phase 1: HTTP-only vhosts (so ACME + sites work without certs yet)"
cat deploy/nginx/aviosupportdesk.conf > deploy/nginx/active.conf
cp -f deploy/nginx/sites/other-sites.http-only.conf.tpl deploy/nginx/sites/enabled.conf

"${COMPOSE[@]}" up -d --no-deps --force-recreate nginx
sleep 2
"${COMPOSE[@]}" exec -T nginx nginx -t
"${COMPOSE[@]}" exec -T nginx nginx -s reload || true

issue_cert() {
  local primary="$1"
  shift
  local -a domains=(-d "$primary")
  local d
  for d in "$@"; do
    domains+=(-d "$d")
  done

  if [[ -f "$CERT_DIR/$primary/fullchain.pem" ]]; then
    echo "==> Cert exists for $primary — renewing RSA if needed"
  else
    echo "==> Issuing cert for $primary"
  fi

  "${COMPOSE[@]}" --profile tools run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "$CERTBOT_EMAIL" \
    --agree-tos \
    --no-eff-email \
    --non-interactive \
    --cert-name "$primary" \
    --key-type rsa \
    --rsa-key-size 2048 \
    --force-renewal \
    "${domains[@]}"
}

issue_cert jumpifzero.com www.jumpifzero.com
issue_cert flightbugs.com www.flightbugs.com
issue_cert quantarafinancial.info www.quantarafinancial.info

echo "==> Phase 2: enable HTTPS vhosts"
cp -f deploy/nginx/sites/other-sites.conf.tpl deploy/nginx/sites/enabled.conf
cat deploy/nginx/aviosupportdesk.conf > deploy/nginx/active.conf
"${COMPOSE[@]}" exec -T nginx nginx -t
"${COMPOSE[@]}" up -d --no-deps --force-recreate nginx

sleep 3
echo "==> Verify HTTPS"
for host in jumpifzero.com flightbugs.com quantarafinancial.info aviosupportdesk.com; do
  code="$(curl -sI --resolve "${host}:443:127.0.0.1" "https://${host}/" | awk 'NR==1{print $2}')"
  echo "  https://$host => ${code:-err}"
done

echo "==> Done. Do NOT run host certbot --nginx anymore."
echo "    Edge proxy is aviosupportdesk-nginx on :80/:443."
