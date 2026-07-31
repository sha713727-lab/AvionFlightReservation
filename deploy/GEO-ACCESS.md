# Geo access for aviosupportdesk.com (Hostinger VPS)

## Why UK / Europe could not open the site

There is **no country block in the app code** that targets Europe.
The usual cause on Hostinger is one of these panel settings:

1. **CDN → Traffic blocking → “Allow only specific countries”**
   - This mode blocks **everyone else**, including **UK and all of Europe**.
   - Fix: turn that mode **OFF**.
   - If you want blocks, use **“Block country”** (deny list) instead — never allow-only.

2. **VPS Firewall** with 80/443 not open to **Anywhere**
   - Fix: Accept TCP **22**, **80**, **443** from **0.0.0.0/0**.

## Intended policy (this repo)

- **ALLOW by default:** UK, Europe, USA, Canada, and the rest of the world
- **BLOCK only:** countries in `deploy/geo/blocked-countries.txt`
  - South Asia: IN, AF, BD, PK, LK, NP, BT, MV
  - Middle East: AE, SA, KW, QA, BH, OM, IQ, IR, YE, SY, JO, LB, IL, PS, EG

Implemented in **nginx** via IP zone lists (ipdeny), so the site works even if CDN is off.

## Apply on Hostinger VPS

```bash
cd /var/www/aviosupportdesk && bash deploy/apply-geo-access.sh
```

## Edit the block list later

1. Edit `deploy/geo/blocked-countries.txt` (2-letter ISO codes)
2. Commit / push
3. Re-run `bash deploy/apply-geo-access.sh` on the VPS
