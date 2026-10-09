#!/usr/bin/env bash
# Renews the Let's Encrypt certificates on this shared nginx edge, then reloads nginx gracefully
# when a certificate changed. An expired certificate makes Search Console report "Couldn't fetch".
#
# Usage (on the VPS, as root):
#   cd /var/www/aviosupportdesk
#   bash deploy/renew-certs.sh --dry-run   # rehearse against the Let's Encrypt staging CA
#   bash deploy/renew-certs.sh             # renew certificates within 30 days of expiry
#
# Root crontab (add after a passing --dry-run, only when `crontab -l` has no certbot job):
#   17 3,15 * * * cd /var/www/aviosupportdesk && bash deploy/renew-certs.sh >> /var/log/aviosupportdesk-cert-renew.log 2>&1

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

ENV_FILE="${ENV_FILE:-deploy/.env.production}"
COMPOSE=(docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE")
CERT_ARCHIVE_DIR="deploy/certbot/conf/archive"
DRY_RUN=0

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    -h|--help)
      echo "Usage: bash deploy/renew-certs.sh [--dry-run]"
      exit 0
      ;;
    *)
      echo "Unknown option: $arg" >&2
      exit 1
      ;;
  esac
done

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE" >&2
  exit 1
fi

echo "==> $(date -u '+%Y-%m-%dT%H:%M:%SZ') certificate renewal check"

if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "==> Dry run against the Let's Encrypt staging CA; no certificate changes"
  "${COMPOSE[@]}" --profile tools run --rm certbot renew --dry-run
  echo "==> Validating THIS project's nginx config (no reload in a dry run)"
  "${COMPOSE[@]}" exec -T nginx nginx -t
  exit 0
fi

RENEW_STAMP="$(mktemp)"
trap 'rm -f "$RENEW_STAMP"' EXIT

renew_status=0
"${COMPOSE[@]}" --profile tools run --rm certbot renew --quiet || renew_status=$?

if [[ -n "$(find "$CERT_ARCHIVE_DIR" -type f -newer "$RENEW_STAMP" -print -quit)" ]]; then
  echo "==> Certificates renewed; validating and gracefully reloading THIS project's nginx"
  "${COMPOSE[@]}" exec -T nginx nginx -t
  "${COMPOSE[@]}" exec -T nginx nginx -s reload
else
  echo "==> No certificate was due; nginx left running as-is"
fi

if [[ "$renew_status" -ne 0 ]]; then
  echo "ERROR: certbot renew exited with status ${renew_status}; see the certbot output above" >&2
  exit "$renew_status"
fi
echo "==> Renewal check complete"
