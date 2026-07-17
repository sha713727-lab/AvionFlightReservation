# SEO Meta Reference — Avion Flight Reservation

Readable snapshot of all site meta titles, descriptions, sitemap, and robots.
**Edit the source files listed under each section** — this file is a reference only.

**Site URL:** `https://aviosupportdesk.com`  
**Live checks:**
- Sitemap → https://aviosupportdesk.com/sitemap.xml  
- Robots → https://aviosupportdesk.com/robots.txt  

---

## Where to edit in code

| What | File |
|------|------|
| Site URL + default description | `Frontend/src/constants/contact.js` |
| Homepage / default layout meta | `Frontend/src/app/layout.jsx` |
| Page meta titles + wiring | `Frontend/src/modules/<page>/page-data.js` |
| Meta description copy | `Frontend/src/constants/copy.js` and `Frontend/src/constants/legalCopy.js` |
| SEO helper (OG, Twitter, canonical) | `Frontend/src/utils/seo.js` |
| Sitemap | `Frontend/src/app/sitemap.js` |
| Sitemap paths / priorities | `Frontend/src/constants/routes.js` |
| Robots.txt | `Frontend/src/app/robots.js` |

---

## Global / Homepage (root layout)

**Source:** `Frontend/src/app/layout.jsx` + `Frontend/src/constants/contact.js`

| Field | Value |
|-------|--------|
| **Title** | Avion Flight Reservation — Book Flights by Phone \| Canada & USA |
| **Meta description** | Book flights and hotels with Avion Flight Reservation. Independent travel assistance for USA and Canada. Call +1 877 702 9887 for 24/7 flight reservation support. |
| **Canonical** | https://aviosupportdesk.com |
| **OG title** | Avion Flight Reservation — Book Flights by Phone |
| **OG / Twitter description** | Same as meta description |
| **OG image** | `/avion-hero-background.png` (via `AVION_HERO_BACKGROUND_SRC`) |
| **Twitter card** | summary_large_image |
| **Keywords** | flight reservation, book flights by phone, travel specialist, hotel booking, points redemption help, Canada flights, USA flights, international flights |

---

## Page meta tags

### Home `/`
Uses root layout metadata above.

### Services `/services`

**Source:** `modules/services/page-data.js` · `COPY.services.metaDescription`

| Field | Value |
|-------|--------|
| **Title** | Flight & Travel Services \| Avion Flight Reservation |
| **Meta description** | Flight booking, hotel booking, and points redemption assistance with Avion Flight Reservation. Independent travel specialists for Canada, USA, Europe, and Mexico. Call +1 877 702 9887. |
| **Canonical** | https://aviosupportdesk.com/services |
| **Keywords** | flight booking, hotel booking, points redemption assistance, flight changes, cancellation support, vacation packages, trip planning, 24/7 travel support |

### Destinations `/destinations`

**Source:** `modules/destinations/page-data.js` · `COPY.destinations.metaDescription`

| Field | Value |
|-------|--------|
| **Title** | Flight Destinations \| Canada, USA & Europe \| Avion Flight Reservation |
| **Meta description** | Browse Canada domestic flights, USA routes, Europe flights, and Mexico vacation travel with Avion Flight Reservation. Call +1 877 702 9887 to book by phone. |
| **Canonical** | https://aviosupportdesk.com/destinations |
| **Keywords** | Canada domestic flights, USA flights, Europe flights, Mexico flights, Cancun flights, international flights, flight destinations |

### About `/about`

**Source:** `modules/about/page-data.js` · `COPY.about.metaDescription`

| Field | Value |
|-------|--------|
| **Title** | About Us \| Independent Travel Assistance \| Avion Flight Reservation |
| **Meta description** | Learn about Avion Flight Reservation — independent travel assistance for flight and hotel reservations by phone. Not affiliated with RBC or Avion Rewards. Call +1 877 702 9887. |
| **Canonical** | https://aviosupportdesk.com/about |
| **Keywords** | independent travel assistance, Avion Flight Reservation, flight reservation, book flights by phone, travel specialist |

### Contact `/contact`

**Source:** `modules/contact/page-data.js` · `COPY.contactPage.metaDescription`

| Field | Value |
|-------|--------|
| **Title** | Contact Us \| Book Flights by Phone \| Avion Flight Reservation |
| **Meta description** | Contact Avion Flight Reservation to book flights by phone. Independent travel specialists for Canada, USA, Europe, and Mexico. Call +1 877 702 9887 — 24/7 support. |
| **Canonical** | https://aviosupportdesk.com/contact |
| **Keywords** | book flights by phone, call to book flights, travel specialist, 24/7 travel support, Avion Flight Reservation |

### Privacy Policy `/privacy-policy`

**Source:** `modules/privacy/page-data.js` · `COPY.privacy.metaDescription`

| Field | Value |
|-------|--------|
| **Title** | Privacy Policy \| Avion Flight Reservation |
| **Meta description** | Privacy Policy for Avion Flight Reservation. Learn what information we may collect for travel support, how it is used, when it may be shared, and how to contact us about your details. |
| **Canonical** | https://aviosupportdesk.com/privacy-policy |

### Terms & Conditions `/terms-and-conditions`

**Source:** `modules/terms/page-data.js` · `COPY.terms.metaDescription`

| Field | Value |
|-------|--------|
| **Title** | Terms & Conditions \| Avion Flight Reservation |
| **Meta description** | Terms & Conditions for Avion Flight Reservation. Review independent service disclosure, booking information, customer responsibility, fees, cancellations, and website use rules. |
| **Canonical** | https://aviosupportdesk.com/terms-and-conditions |

### Refund Policy `/refund-policy`

**Source:** `modules/refund/page-data.js` · `COPY.refund.metaDescription`

| Field | Value |
|-------|--------|
| **Title** | Refund Policy \| Avion Flight Reservation |
| **Meta description** | Refund Policy for Avion Flight Reservation. Learn refund eligibility, supplier refund timelines, service fee rules, and the refund request process for travel bookings. |
| **Canonical** | https://aviosupportdesk.com/refund-policy |

### Cancellation Policy `/cancellation-policy`

**Source:** `modules/cancellation/page-data.js` · `COPY.cancellation.metaDescription`

| Field | Value |
|-------|--------|
| **Title** | Cancellation Policy \| Avion Flight Reservation |
| **Meta description** | Cancellation Policy for Avion Flight Reservation. Learn how cancellation rules work, what to review before cancelling, what happens after cancellation, and important supplier limitations. |
| **Canonical** | https://aviosupportdesk.com/cancellation-policy |

### Cookie Policy `/cookie-policy`

**Source:** `modules/cookies/page-data.js` · `COPY.cookies.metaDescription`

| Field | Value |
|-------|--------|
| **Title** | Cookie Policy \| Avion Flight Reservation |
| **Meta description** | Cookie Policy for Avion Flight Reservation. Learn how cookies may be used on our website to support browsing, performance, and basic site functionality. |
| **Canonical** | https://aviosupportdesk.com/cookie-policy |

---

## Open Graph & Twitter (all index pages)

Built by `buildPageMetadata()` in `Frontend/src/utils/seo.js`:

- `og:type` = website  
- `og:title` / `twitter:title` = page title  
- `og:description` / `twitter:description` = page meta description  
- `og:url` = canonical URL  
- `og:site_name` = Avion Flight Reservation  
- `og:image` / `twitter:image` = hero background (default)  
- `twitter:card` = summary_large_image  
- `robots` = index, follow  

---

## Sitemap (`/sitemap.xml`)

**Source:** `Frontend/src/app/sitemap.js` · paths in `Frontend/src/constants/routes.js`

| URL | Change frequency | Priority |
|-----|------------------|----------|
| https://aviosupportdesk.com/ | weekly | 1.0 |
| https://aviosupportdesk.com/services | weekly | 0.9 |
| https://aviosupportdesk.com/destinations | weekly | 0.9 |
| https://aviosupportdesk.com/about | monthly | 0.8 |
| https://aviosupportdesk.com/contact | monthly | 0.8 |
| https://aviosupportdesk.com/privacy-policy | yearly | 0.5 |
| https://aviosupportdesk.com/cancellation-policy | yearly | 0.5 |
| https://aviosupportdesk.com/terms-and-conditions | yearly | 0.5 |
| https://aviosupportdesk.com/refund-policy | yearly | 0.5 |
| https://aviosupportdesk.com/cookie-policy | yearly | 0.5 |

---

## Robots (`/robots.txt`)

**Source:** `Frontend/src/app/robots.js`

```
User-Agent: *
Allow: /

Host: https://aviosupportdesk.com
Sitemap: https://aviosupportdesk.com/sitemap.xml
```

---

## Quick edit checklist

1. Change default site description → `Frontend/src/constants/contact.js` → `SITE_DESCRIPTION`  
2. Change homepage title → `Frontend/src/app/layout.jsx` → `metadata.title`  
3. Change a page title → that page’s `page-data.js`  
4. Change a page description → `copy.js` or `legalCopy.js` → `metaDescription`  
5. Add/remove sitemap URL → `Frontend/src/constants/routes.js` → `SITE_PATHS`  
