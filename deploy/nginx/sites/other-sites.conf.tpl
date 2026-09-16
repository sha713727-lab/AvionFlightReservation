# Shared edge routes for other sites on this VPS.
# Loaded by aviosupportdesk nginx (the only process bound to :80/:443).
# Upstreams use Docker DNS names on the external `web` network.

# ---------- jumpifzero.com ----------
server {
    listen 80;
    listen [::]:80;
    server_name jumpifzero.com www.jumpifzero.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://jumpifzero.com$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name www.jumpifzero.com;

    ssl_certificate /etc/letsencrypt/live/jumpifzero.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/jumpifzero.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    return 301 https://jumpifzero.com$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name jumpifzero.com;

    ssl_certificate /etc/letsencrypt/live/jumpifzero.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/jumpifzero.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://jumpifzero-frontend-1:3010;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

# ---------- flightbugs.com ----------
server {
    listen 80;
    listen [::]:80;
    server_name flightbugs.com www.flightbugs.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://flightbugs.com$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name www.flightbugs.com;

    ssl_certificate /etc/letsencrypt/live/flightbugs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/flightbugs.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    return 301 https://flightbugs.com$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name flightbugs.com;

    ssl_certificate /etc/letsencrypt/live/flightbugs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/flightbugs.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    # Prefer the site's own nginx proxy container when present.
    location / {
        proxy_pass http://flightbugs-proxy-1:80;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

# ---------- quantarafinancial.info ----------
server {
    listen 80;
    listen [::]:80;
    server_name quantarafinancial.info www.quantarafinancial.info;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://quantarafinancial.info$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name www.quantarafinancial.info;

    ssl_certificate /etc/letsencrypt/live/quantarafinancial.info/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/quantarafinancial.info/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    return 301 https://quantarafinancial.info$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name quantarafinancial.info;

    ssl_certificate /etc/letsencrypt/live/quantarafinancial.info/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/quantarafinancial.info/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://quantara-frontend-1:3012;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
