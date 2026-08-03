#!/usr/bin/env bash
# Deprecated: country blocking removed. Use open-worldwide.sh instead.
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
exec bash "$ROOT_DIR/deploy/open-worldwide.sh"
