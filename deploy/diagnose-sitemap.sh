#!/usr/bin/env bash
# Read-only sitemap diagnostics for AvioSupportDesk (does not change other sites).
set -euo pipefail
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE=(docker compose -f docker-compose.prod.yml --env-file deploy/.env.production)
DOMAIN="${DOMAIN:-aviosupportdesk.com}"

echo "==> ufw"
ufw status || true
echo "==> fail2ban"
fail2ban-client status 2>/dev/null || echo "fail2ban not active"
echo "==> listening 80/443"
ss -tlnp | grep -E ':80|:443' || true
echo "==> this project containers"
"${COMPOSE[@]}" ps
echo "==> nginx sitemap locations"
"${COMPOSE[@]}" exec -T nginx nginx -T 2>/dev/null | grep -E 'location = /sitemap|location = /sitemaps' || true
echo "==> static files"
"${COMPOSE[@]}" exec -T nginx ls -la /var/www/static || true
echo "==> live fetches"
for path in /sitemap.xml /sitemap_index.xml /sitemaps/urls.xml /robots.txt; do
  code=$(curl -s -o /dev/null -w "%{http_code}" -A "Googlebot/2.1" "https://${DOMAIN}${path}" || echo err)
  ctype=$(curl -sI -A "Googlebot/2.1" "https://${DOMAIN}${path}" | tr -d '\r' | awk -F': ' 'tolower($1)=="content-type"{print $2}')
  echo "$path => $code | $ctype"
done
echo "==> recent sitemap access log (if any)"
"${COMPOSE[@]}" exec -T nginx sh -c 'tail -n 30 /var/log/nginx/sitemap.log 2>/dev/null || echo "(no sitemap.log yet)"'
echo "==> Done"
