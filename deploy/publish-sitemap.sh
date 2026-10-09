#!/usr/bin/env bash
# Publishes the sitemap to the nginx static mount only after every listed URL is live,
# so Google Search Console never reads a sitemap that points at 404s or non-canonical pages.
#
# Usage (on the VPS):
#   cd /var/www/aviosupportdesk
#   bash deploy/publish-sitemap.sh hold <dir>     # before git reset: save the live sitemap files
#   bash deploy/publish-sitemap.sh restore <dir>  # after git reset: put the live files back
#   bash deploy/publish-sitemap.sh                # verify every <loc>, then publish

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

DOMAIN="${DOMAIN:-aviosupportdesk.com}"
ORIGIN="https://${DOMAIN}"
SOURCE_DIR="Frontend/public"
STATIC_DIR="deploy/nginx/static"
SITEMAP_FILES=(sitemap.xml sitemap_index.xml)
READY_ATTEMPTS=36
READY_DELAY_SECONDS=5
REQUEST_TIMEOUT_SECONDS=30
GOOGLEBOT_UA="Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"

hold_live() {
  local dir="$1" name
  mkdir -p "$dir"
  for name in "${SITEMAP_FILES[@]}"; do
    if [[ -f "${STATIC_DIR}/${name}" ]]; then
      cp -f "${STATIC_DIR}/${name}" "${dir}/${name}"
    fi
  done
}

restore_live() {
  local dir="$1" name
  for name in "${SITEMAP_FILES[@]}"; do
    if [[ -f "${dir}/${name}" ]]; then
      cp -f "${dir}/${name}" "${STATIC_DIR}/${name}"
    fi
  done
}

wait_for_homepage() {
  local status
  for _ in $(seq 1 "$READY_ATTEMPTS"); do
    status="$(curl -s -o /dev/null -w '%{http_code}' --max-time "$REQUEST_TIMEOUT_SECONDS" "${ORIGIN}/" || true)"
    if [[ "$status" == "200" ]]; then
      return 0
    fi
    sleep "$READY_DELAY_SECONDS"
  done
  return 1
}

# Prints sitemap <loc> values one per line; exits non-zero when either file is not valid XML.
read_locs() {
  python3 - "${SOURCE_DIR}/sitemap.xml" "${SOURCE_DIR}/sitemap_index.xml" <<'PY'
import sys
import xml.etree.ElementTree as ET

namespace = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
sitemap_root = ET.parse(sys.argv[1]).getroot()
ET.parse(sys.argv[2])
for loc in sitemap_root.findall('sm:url/sm:loc', namespace):
    print(loc.text.strip())
PY
}

# Prints the failure reason and returns 1 when a URL is not ready to be listed.
check_url() {
  local loc="$1" body="$2" status canonical
  status="$(curl -s -o "$body" -w '%{http_code}' -A "$GOOGLEBOT_UA" --max-time "$REQUEST_TIMEOUT_SECONDS" "$loc" || true)"
  if [[ "$status" != "200" ]]; then
    echo "HTTP ${status}"
    return 1
  fi
  if grep -qiE '<meta name="robots" content="[^"]*noindex' "$body"; then
    echo "noindex"
    return 1
  fi
  canonical="$(grep -oE '<link rel="canonical" href="[^"]*"' "$body" | head -n 1 | sed -E 's/.*href="([^"]*)"/\1/' || true)"
  if [[ "$canonical" != "$loc" && "$canonical" != "${loc%/}" ]]; then
    echo "canonical ${canonical:-missing}"
    return 1
  fi
}

publish() {
  local work_dir locs_file body loc reason name failed=0
  local -a locs

  echo "==> Syncing robots.txt"
  cp -f "${SOURCE_DIR}/robots.txt" "${STATIC_DIR}/robots.txt"

  echo "==> Waiting for ${ORIGIN}/ to return 200"
  if ! wait_for_homepage; then
    echo "ERROR: ${ORIGIN}/ is not returning 200; the live sitemap was left unchanged" >&2
    return 1
  fi

  work_dir="$(mktemp -d)"
  locs_file="${work_dir}/locs.txt"
  body="${work_dir}/body.html"

  echo "==> Parsing ${SOURCE_DIR}/sitemap.xml"
  if ! read_locs >"$locs_file"; then
    rm -rf "$work_dir"
    echo "ERROR: sitemap XML does not parse; the live sitemap was left unchanged" >&2
    return 1
  fi
  mapfile -t locs <"$locs_file"
  if [[ "${#locs[@]}" -eq 0 ]]; then
    rm -rf "$work_dir"
    echo "ERROR: ${SOURCE_DIR}/sitemap.xml has no <loc> entries; the live sitemap was left unchanged" >&2
    return 1
  fi

  echo "==> Checking ${#locs[@]} URLs for HTTP 200, a self-referencing canonical and no noindex"
  for loc in "${locs[@]}"; do
    if ! reason="$(check_url "$loc" "$body")"; then
      echo "FAIL ${loc} (${reason})" >&2
      failed=$((failed + 1))
    fi
  done
  rm -rf "$work_dir"

  if [[ "$failed" -gt 0 ]]; then
    echo "ERROR: ${failed} of ${#locs[@]} sitemap URLs are not ready; the live sitemap was left unchanged" >&2
    return 1
  fi

  for name in "${SITEMAP_FILES[@]}"; do
    cp -f "${SOURCE_DIR}/${name}" "${STATIC_DIR}/${name}"
  done
  echo "==> Published sitemap.xml with ${#locs[@]} URLs"
}

case "${1:-publish}" in
  hold) hold_live "${2:?hold needs a directory}" ;;
  restore) restore_live "${2:?restore needs a directory}" ;;
  publish) publish ;;
  -h|--help) echo "Usage: bash deploy/publish-sitemap.sh [hold <dir> | restore <dir> | publish]" ;;
  *)
    echo "Unknown command: $1" >&2
    exit 1
    ;;
esac
