#!/usr/bin/env bash
# Run on Hostinger VPS as root (browser Terminal or SSH):
#   bash <(curl -fsSL https://raw.githubusercontent.com/sha713727-lab/AvionFlightReservation/main/deploy/vps-first-boot.sh)
# Or after clone:
#   cd /var/www/aviosupportdesk && bash deploy/vps-first-boot.sh
set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/sha713727-lab/AvionFlightReservation.git}"
APP_DIR="${APP_DIR:-/var/www/aviosupportdesk}"
DOMAIN="${DOMAIN:-aviosupportdesk.com}"

export DEBIAN_FRONTEND=noninteractive

if ! command -v docker >/dev/null 2>&1; then
  bash "$(dirname "$0")/install-docker.sh" 2>/dev/null || true
fi

if ! command -v docker >/dev/null 2>&1; then
  apt-get update -y
  apt-get install -y ca-certificates curl gnupg ufw git
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  chmod a+r /etc/apt/keyrings/docker.asc
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" > /etc/apt/sources.list.d/docker.list
  apt-get update -y
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  ufw allow OpenSSH
  ufw allow 80/tcp
  ufw allow 443/tcp
  ufw --force enable
fi

mkdir -p /var/www
if [[ ! -d "$APP_DIR/.git" ]]; then
  git clone "$REPO_URL" "$APP_DIR"
else
  git -C "$APP_DIR" fetch --all
  git -C "$APP_DIR" reset --hard origin/main
fi

cd "$APP_DIR"
chmod +x deploy/bootstrap.sh deploy/install-docker.sh || true

ENV_FILE="$APP_DIR/deploy/.env.production"
if [[ ! -f "$ENV_FILE" ]]; then
  cp deploy/env.production.example "$ENV_FILE"
  DB_PASS="$(openssl rand -hex 24)"
  sed -i "s/CHANGE_ME_STRONG_PASSWORD/${DB_PASS}/" "$ENV_FILE"
fi

bash deploy/bootstrap.sh
