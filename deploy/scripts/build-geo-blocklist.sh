#!/usr/bin/env bash
# Build nginx CIDR denylist from deploy/geo/blocked-countries.txt (ipdeny.com).
# Safe default: if download fails for a country, that country is skipped (site stays up).
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
COUNTRY_FILE="$ROOT_DIR/deploy/geo/blocked-countries.txt"
OUT_FILE="$ROOT_DIR/deploy/geo/blocked-cidrs.conf"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

if [[ ! -f "$COUNTRY_FILE" ]]; then
  echo "Missing $COUNTRY_FILE"
  exit 1
fi

mapfile -t CODES < <(
  grep -E '^[A-Za-z]{2}$' "$COUNTRY_FILE" | tr '[:upper:]' '[:lower:]' | sort -u
)

if [[ ${#CODES[@]} -eq 0 ]]; then
  echo "No country codes found in $COUNTRY_FILE"
  exit 1
fi

{
  echo "# Generated $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "# Source: ipdeny.com aggregated zones"
  echo "# Blocked ISO codes: ${CODES[*]}"
} >"$TMP_DIR/out.conf"

ok=0
fail=0

for cc in "${CODES[@]}"; do
  url4="https://www.ipdeny.com/ipblocks/data/aggregated/${cc}-aggregated.zone"
  url6="https://www.ipdeny.com/ipv6/ipaddresses/aggregated/${cc}-aggregated.zone"

  if curl -fsSL --max-time 45 "$url4" -o "$TMP_DIR/${cc}.v4"; then
    awk 'NF && $1 !~ /^#/ { print $1, "1;" }' "$TMP_DIR/${cc}.v4" >>"$TMP_DIR/out.conf"
    ok=$((ok + 1))
    echo "OK  IPv4 $cc"
  else
    fail=$((fail + 1))
    echo "WARN IPv4 $cc download failed — skipped"
  fi

  if curl -fsSL --max-time 45 "$url6" -o "$TMP_DIR/${cc}.v6"; then
    awk 'NF && $1 !~ /^#/ { print $1, "1;" }' "$TMP_DIR/${cc}.v6" >>"$TMP_DIR/out.conf"
    echo "OK  IPv6 $cc"
  else
    echo "WARN IPv6 $cc download failed — skipped"
  fi
done

line_count="$(grep -cE '^[0-9a-fA-F:.]+/' "$TMP_DIR/out.conf" || true)"
if [[ "$line_count" -lt 1 ]]; then
  echo "ERROR: no CIDRs generated — refusing to overwrite $OUT_FILE"
  exit 1
fi

mv "$TMP_DIR/out.conf" "$OUT_FILE"
echo "Wrote $OUT_FILE ($line_count CIDR rules, countries_ok=$ok countries_fail=$fail)"
