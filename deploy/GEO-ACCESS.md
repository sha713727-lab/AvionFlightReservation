# Site access policy

aviosupportdesk.com is **open worldwide**. No country blocking is applied in nginx.

## Open / keep worldwide on Hostinger VPS

```bash
cd /var/www/aviosupportdesk && git pull origin main && chmod +x deploy/open-worldwide.sh && bash deploy/open-worldwide.sh
```

## Firewall (keep this)

Hostinger VPS Firewall / UFW should Accept TCP **22**, **80**, **443** from **Anywhere**.
