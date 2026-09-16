#!/usr/bin/env bash
# Critical GSC sitemap fix for AvioSupportDesk only.
# - Disables HTTP/2
# - Serves extensionless /sitemap (avoids *.xml bot blocks)
# - Optionally reissues RSA cert (YE2 ECDSA can break some Google fetches)
#
# Usage:
#   cd /var/www/aviosupportdesk
#   bash deploy/fix-gsc-sitemap.sh
#   bash deploy/fix-gsc-sitemap.sh --rsa-cert

set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

ENV_FILE="${ENV_FILE:-deploy/.env.production}"
COMPOSE=(docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE")
DOMAIN="${DOMAIN:-aviosupportdesk.com}"
RSA_CERT=0

for arg in "$@"; do
  case "$arg" in
    --rsa-cert) RSA_CERT=1 ;;
    -h|--help) echo "Usage: bash deploy/fix-gsc-sitemap.sh [--rsa-cert]"; exit 0 ;;
    *) echo "Unknown option: $arg" >&2; exit 1 ;;
  esac
done

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

echo "==> Pull latest (this repo only)"
git fetch origin main
git reset --hard origin/main

echo "==> Sync nginx config in-place"
cat deploy/nginx/aviosupportdesk.conf > deploy/nginx/active.conf
cp -f Frontend/public/googlebc6e5bbda029aa82.html deploy/nginx/static/googlebc6e5bbda029aa82.html

if [[ "$RSA_CERT" -eq 1 ]]; then
  echo "==> Reissuing Let's Encrypt RSA certificate (keeps same domain)"
  "${COMPOSE[@]}" --profile tools run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "${CERTBOT_EMAIL}" \
    --agree-tos \
    --no-eff-email \
    --key-type rsa \
    --rsa-key-size 2048 \
    --force-renewal \
    -d "${DOMAIN}" \
    -d "www.${DOMAIN}"
fi

echo "==> Rebuild frontend (robots + /sitemap route)"
"${COMPOSE[@]}" build --no-cache frontend
"${COMPOSE[@]}" up -d --no-deps --force-recreate frontend

echo "==> Recreate ONLY this project's nginx"
"${COMPOSE[@]}" up -d --no-deps --force-recreate nginx

sleep 4
echo "==> Verify"
for path in /sitemap /sitemap.xml /googlebc6e5bbda029aa82.html /robots.txt; do
  echo -n "$path => "
  curl -sI "https://${DOMAIN}${path}" | tr -d '\r' | awk 'BEGIN{c="?"} /^HTTP/{c=$2} tolower($1)=="content-type:"{t=$0} END{print c " | " t}'
done
echo "==> Body /sitemap (first lines)"
curl -fsS "https://${DOMAIN}/sitemap" | head -n 6
echo "==> Done. In GSC submit: sitemap   (NOT sitemap.xml)"
