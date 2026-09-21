#!/usr/bin/env bash
# Read-only sitemap diagnostics for AvioSupportDesk (does not change other sites).
set -euo pipefail
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE=(docker compose -f docker-compose.prod.yml --env-file deploy/.env.production)
DOMAIN="${DOMAIN:-aviosupportdesk.com}"

echo "==> DNS (must match this VPS public IP)"
echo "public IP => $(curl -s --max-time 8 https://api.ipify.org || echo unknown)"
echo "A       => $(getent ahostsv4 "$DOMAIN" | awk '{print $1}' | sort -u | tr '\n' ' ')"
echo "AAAA    => $(getent ahostsv6 "$DOMAIN" | awk '{print $1}' | sort -u | tr '\n' ' ')"

echo "==> TLS certificate (GSC rejects ECDSA-only or incomplete chains more often than curl)"
if command -v openssl >/dev/null 2>&1; then
  openssl s_client -connect "${DOMAIN}:443" -servername "$DOMAIN" -showcerts </dev/null 2>/dev/null | grep -E '^ [0-9] s:|^ [0-9] i:|^Verify return code|Peer signature type|Server public key' || true
else
  echo "openssl not installed on host — run: apt-get install -y openssl"
fi

echo "==> ufw"
ufw status || true
echo "==> host packet filters that bypass ufw (docker publishes past ufw)"
iptables -S DOCKER-USER 2>/dev/null || echo "(no DOCKER-USER chain)"
iptables -S INPUT 2>/dev/null | grep -iE 'DROP|REJECT' || echo "(no INPUT drops)"
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

# The main access log is the nginx image default (symlinked to stdout), so it lives in the
# container log, not in /var/www or /var/log/nginx. Only sitemap.log is a real file.
echo "==> REAL Googlebot hits (66.249.x.x) on sitemap URLs — dedicated sitemap.log"
sitemap_goog="$("${COMPOSE[@]}" exec -T nginx sh -c 'grep -c "66\.249\." /var/log/nginx/sitemap.log 2>/dev/null || true' | tr -dc '0-9')"
echo "count: ${sitemap_goog:-0}"
"${COMPOSE[@]}" exec -T nginx sh -c 'grep "66\.249\." /var/log/nginx/sitemap.log 2>/dev/null | tail -n 10 || true'

echo "==> REAL Googlebot hits (66.249.x.x) site-wide — nginx container log"
all_goog="$("${COMPOSE[@]}" logs --no-color --since 72h nginx 2>/dev/null | grep -c '66\.249\.' || true)"
echo "count (last 72h): ${all_goog:-0}"
"${COMPOSE[@]}" logs --no-color --since 72h nginx 2>/dev/null | grep '66\.249\.' | tail -n 15 || true
echo "==> Done"
