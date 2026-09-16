#!/usr/bin/env bash
# Critical GSC sitemap fix for AvioSupportDesk only.
# - Syncs nginx edge (canonical /sitemap.xml, 301 /sitemap)
# - Optionally reissues RSA cert
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

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE" >&2
  exit 1
fi

# Never `source` .env — values often break bash (quotes, $, newlines).
read_env() {
  local key="$1"
  local line
  line="$(grep -E "^${key}=" "$ENV_FILE" | tail -n 1 || true)"
  printf '%s' "${line#*=}" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//"
}

CERTBOT_EMAIL="${CERTBOT_EMAIL:-$(read_env CERTBOT_EMAIL)}"
if [[ -z "${DOMAIN_FROM_ENV:=$(read_env DOMAIN)}" ]]; then
  true
else
  DOMAIN="$DOMAIN_FROM_ENV"
fi

echo "==> Pull latest (this repo only)"
git fetch origin main
git reset --hard origin/main

echo "==> Sync nginx config in-place"
cat deploy/nginx/aviosupportdesk.conf > deploy/nginx/active.conf
cp -f Frontend/public/googlebc6e5bbda029aa82.html deploy/nginx/static/googlebc6e5bbda029aa82.html
cp -f Frontend/public/sitemap.xml deploy/nginx/static/sitemap.xml
cp -f Frontend/public/sitemap_index.xml deploy/nginx/static/sitemap_index.xml

if [[ "$RSA_CERT" -eq 1 ]]; then
  if [[ -z "$CERTBOT_EMAIL" ]]; then
    echo "CERTBOT_EMAIL missing in $ENV_FILE — required for --rsa-cert" >&2
    exit 1
  fi
  echo "==> Reissuing Let's Encrypt RSA certificate (keeps same domain)"
  "${COMPOSE[@]}" --profile tools run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "${CERTBOT_EMAIL}" \
    --agree-tos \
    --no-eff-email \
    --non-interactive \
    --cert-name "${DOMAIN}" \
    --key-type rsa \
    --rsa-key-size 2048 \
    --force-renewal \
    -d "${DOMAIN}" \
    -d "www.${DOMAIN}"
fi

echo "==> Rebuild frontend (robots.txt)"
"${COMPOSE[@]}" build --no-cache frontend
"${COMPOSE[@]}" up -d --no-deps --force-recreate frontend

echo "==> Recreate ONLY this project's nginx"
"${COMPOSE[@]}" up -d --no-deps --force-recreate nginx

sleep 4
echo "==> Verify"
for path in /sitemap /sitemap.xml /googlebc6e5bbda029aa82.html /robots.txt; do
  echo -n "$path => "
  curl -sI "https://${DOMAIN}${path}" | tr -d '\r' | awk 'BEGIN{c="?"} /^HTTP/{c=$2} tolower($1)=="content-type:"{t=$0} tolower($1)=="location:"{l=$0} END{print c " | " t " | " l}'
done
echo "==> Body /sitemap.xml (first lines)"
curl -fsSL "https://${DOMAIN}/sitemap.xml" | head -n 8
echo "==> Done. In GSC: remove /sitemap if present, then submit: sitemap.xml"
echo "    Do not claim GSC Success until the Sitemaps UI shows it."
