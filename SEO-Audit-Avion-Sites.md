# SEO Audit Report — Avion-Related Websites

**Audit date:** July 10, 2026  
**Auditor role:** Senior SEO Analysis  
**Sites reviewed:**
1. https://avionflightbooking.com/
2. https://aviontravelbooking.com/
3. https://www.avionrewards.com/index.html

---

## Executive Summary

These three properties serve **very different purposes** and compete for overlapping branded search terms around “Avion.”

| Site | Type | Primary goal | Paid ads |
|------|------|--------------|----------|
| **avionflightbooking.com** | Independent phone-based flight agency | Call conversions (877 number) | Google Ads (AW-18174803609) |
| **aviontravelbooking.com** | Independent travel booking (GoDaddy) | Call + form leads (877 number) | Google Ads (AW-17881309480) |
| **avionrewards.com** | Official RBC Royal Bank loyalty program | Membership, sign-up, partner linking | GTM + enterprise analytics (not Google Ads conversion tags on homepage) |

**Critical finding:** The two booking sites (`avionflightbooking.com` and `aviontravelbooking.com`) are **not affiliated** with RBC’s official **Avion Rewards** program. Both use “Avion” in domain and copy, which creates **brand confusion** and may capture branded search traffic intended for `avionrewards.com`. The travel booking site additionally references “rewards points” in body copy despite having no verified link to the RBC program.

---

## 1. avionflightbooking.com

### 1.1 Meta Tags & On-Page SEO

| Element | Value |
|---------|-------|
| **Title** | Avion Flight Booking — Call to Book Flights \| Canada & USA |
| **Meta description** | Book flights by phone with Avion Flight Booking. Canada domestic, Europe, Mexico, Cancun, and USA routes. Call +1 (877) 247-2701 — real agents, no bots. |
| **Meta keywords** | Not present |
| **Canonical** | Not set |
| **Robots** | `Allow: /` (robots.txt) |
| **Language** | `en` |
| **OG:title** | Avion Flight Booking — Call to Book Flights |
| **OG:description** | Real travel agents. One call. Your flight booked. +1 (877) 247-2701 |
| **OG:type** | website |
| **OG:image** | Not set |
| **Twitter cards** | Not set |
| **Schema.org / JSON-LD** | Not detected |

### 1.2 Target Keywords (inferred from title, meta, headings, body)

**Primary (brand + service):**
- Avion Flight Booking
- book flights
- call to book flights
- flight booking by phone

**Geographic / route keywords:**
- Canada domestic flights
- Europe flights / transatlantic
- Mexico & Cancun flights
- United States flights
- Canada & USA

**Intent keywords:**
- real travel agents
- independent travel agency
- book flight by phone
- no bots / real specialist

**Note:** No H1 in traditional sense — hero uses visual H1: *“Book Your Flight By Phone.”*

### 1.3 Heading Structure

| Level | Text |
|-------|------|
| H1 (hero) | Book Your Flight / By Phone. |
| H2 | Three steps. That's it. |
| H3 | Call Us / Share Your Trip / You're Booked |
| H2 | Ready to fly? |

### 1.4 Internal Links (navigation & footer)

| URL | Purpose |
|-----|---------|
| `/` | Home |
| `/about` | About Us |
| `/refund-policy` | Refund Policy |
| `/privacy-policy` | Privacy Policy |
| `/terms-of-use` | Terms of Use |
| `tel:+18772472701` | Primary CTA (multiple placements) |

**Sitemap** (`/sitemap.xml`): Home, refund-policy, privacy-policy, terms-of-use — **missing `/about`**.

### 1.5 External / Tracking Links

| Type | ID / URL |
|------|----------|
| **Google Ads conversion** | `AW-18174803609` |
| **Conversion action** | `AW-18174803609/lycQCNiFyLAcEJn9tdpD` |
| **gtag.js** | `https://www.googletagmanager.com/gtag/js?id=AW-18174803609` |
| **Custom analytics** | `/analytics.js` |
| **Platform** | Built on Airo App Builder (React SPA) |
| **CDN** | Cloudflare (email protection) |

### 1.6 Business entity (footer)

- **Operator:** Omega Media Group LLC  
- **Address:** 117 S Lexington St, Ste 100, Harrisonville, MO 64701  
- **Phone:** +1 (877) 247-2701  
- **Disclaimer:** Independent agency; not affiliated with any airline or government authority

### 1.7 SEO Strengths & Gaps

**Strengths**
- Clear, keyword-rich title and meta description
- Geographic route keywords in content and image alt text
- Sitemap and permissive robots.txt
- Strong call-to-action alignment with paid search (phone conversions)
- Legal/disclaimer pages for trust signals

**Gaps**
- No canonical, OG image, or Twitter cards
- No structured data (LocalBusiness, TravelAgency, Organization)
- SPA — ensure SSR/prerender for crawlers
- `/about` not in sitemap
- Thin page count (5 URLs total)
- No blog/destination landing pages for long-tail SEO

---

## 2. aviontravelbooking.com

### 2.1 Meta Tags & On-Page SEO

| Element | Value |
|---------|-------|
| **Title** | Travel Booking - Affordable Flights and Hotels |
| **Meta description** | Book your travel with Avion Travel Booking for the best flight reservations and hotel bookings. Explore the world with amazing deals! |
| **Meta keywords** | Not present |
| **Meta author** | Avion Travel Booking |
| **Generator** | Go Daddy Website Builder 8.0 |
| **Canonical** | Not set |
| **Robots** | `Disallow: /404` only |
| **Language** | `en-US` |
| **OG:url** | https://aviontravelbooking.com/ |
| **OG:site_name** | Avion Travel Booking |
| **OG:title** | Avion Travel Booking |
| **OG:description** | Get exclusive unpublished fares and last-minute deals when you book. Enjoy personalized booking support from real agents. |
| **OG:image** | https://img1.wsimg.com/isteam/stock/D1lyEZd |
| **OG:locale** | en_US |
| **Twitter:card** | summary |
| **Twitter:title** | Avion Travel Booking |
| **Twitter:description** | Travel Booking Made Easy: Explore the World with Us |
| **Twitter:image** | Same stock image as OG |
| **Schema.org** | Not detected |

### 2.2 Target Keywords (heavy on-page repetition)

**Primary (title + H1):**
- travel booking
- affordable flights and hotels
- explore the world
- Avion Travel Booking

**High-frequency body keywords (keyword-stuffed):**
- book flights with Avion Travel Booking
- book flights with Avion travel
- book flights with us
- flight reservations
- hotel bookings
- airline ticket booking
- cheap flights
- last-minute deals / emergency travel
- unpublished fares
- rewards points *(used repeatedly — no verified RBC affiliation)*

**Service keywords:**
- domestic flights U.S. & Canada
- international flights at discounted rates
- business and group travel
- one-way, round-trip, multi-city itineraries
- custom travel experiences
- safe & reliable booking

**Intent / CTA keywords:**
- call now
- live travel agent
- 24/7
- personalized booking support

### 2.3 Heading Structure

| Level | Text (representative) |
|-------|----------------------|
| H1 | Travel Booking Made Easy: Explore the World with Us |
| H2 | International flights at discounted rates |
| H2 | Discover Your Next Adventure with Avion |
| H4 | Custom Travel Experiences |
| H4 | Flights & Airline Ticket Booking *(repeated)* |
| H4 | Need Help Booking a Flight? |
| H4 | Our Flight Booking Services |
| H4 | How It Works |
| H4 | Cheap Flights Made Easy *(repeated)* |
| H4 | Safe & Reliable Booking |
| H2 | Contact Avion Travel |
| H4 | Connect with Us! / Avion Travel Booking |

**SEO issue:** Multiple duplicate H4 headings (“Flights & Airline Ticket Booking”, “Cheap Flights Made Easy”) — hurts semantic clarity and may trigger quality filters.

### 2.4 Internal Links

| URL | Purpose |
|-----|---------|
| `/` | Home |
| `/about` | About |
| `/hot-destinations` | Hot Destinations |
| `/privacy-policy` | Privacy Policy |
| `/terms-and-conditions` | Terms and Conditions |
| `/disclaimer` | Disclaimer |
| `/refund-policy-1` | Refund Policy |
| `tel:+18772289088` | Primary phone CTA |

**Sitemaps:** `sitemap.website.xml`, `sitemap.ols.xml` (GoDaddy index)

### 2.5 External / Tracking Links

| Type | ID / URL |
|------|----------|
| **Google Ads conversion** | `AW-17881309480` |
| **Conversion action** | `AW-17881309480/buCJCNiDrecbEKjCvM5C` |
| **gtag_report_conversion()** | Embedded in multiple iframes for phone-click tracking |
| **GoDaddy Signals** | `scc-c2.min.js` (visitor tracking) |
| **reCAPTCHA** | On contact form |
| **Cookie tracking** | `gclid`, `fbclid`, `gdan_clid` stored in localStorage |
| **External** | Google Privacy Policy & Terms (reCAPTCHA footer) |

**Phone:** +1 (877) 228-9088 *(different from avionflightbooking.com)*

### 2.6 SEO Strategy Observed

This site uses an **aggressive long-tail + branded piggyback** approach:

1. Repeats “book flights with Avion Travel Booking” dozens of times in body copy  
2. References “rewards points” to overlap with **Avion Rewards** branded searches  
3. Runs **Google Ads** with phone conversion tracking  
4. Targets deal/intent terms: cheap flights, last-minute, unpublished fares  
5. Has a **Hot Destinations** page for geographic long-tail potential  

**Footer disclaimer:** *“Avion Travel Booking is an independent travel booking service and is not affiliated with any airline, hotel, cruise line, or rewards program.”*

### 2.7 SEO Strengths & Gaps

**Strengths**
- Fuller social meta (OG + Twitter) than flight booking site
- More indexed pages (about, hot destinations, policies)
- Contact form for lead capture beyond phone
- Cookie/consent banner for ad compliance
- Stock imagery with some aria-labels for accessibility

**Gaps**
- Obvious keyword stuffing — risk of Google helpful content / spam penalties  
- Misleading “rewards points” language vs. disclaimer  
- Duplicate headings weaken on-page structure  
- No canonical URLs  
- No structured data  
- Title does not include “Avion” (brand mismatch with domain and body)  
- Built on GoDaddy — limited technical SEO control  

---

## 3. avionrewards.com (Official RBC Program)

### 3.1 Meta Tags & On-Page SEO

| Element | Value |
|---------|-------|
| **Title** | Avion Rewards - Avion Rewards members can have it all |
| **Meta description** | Ready to get rewarded? Earn Avion Rewards points on debit and credit purchases. Redeem them for flights, hotels, tech, financial rewards, and much more. |
| **Meta keywords** | Empty (`content=""`) |
| **Canonical** | Not set on homepage |
| **Robots.txt** | Returns 404 page (no standard robots file at root) |
| **Language** | `en` |
| **OG:title** | Avion Rewards - Avion Rewards members can have it all |
| **OG:description** | Same as meta description |
| **Facebook domain verification** | `5fstdtir7coe2nk61cirm0dgthnj0m` |
| **Schema.org** | Not detected on homepage |

### 3.2 Target Keywords (inferred)

**Brand:**
- Avion Rewards
- Avion Rewards members
- Avion Rewards points

**Earn keywords:**
- earn cash back & points
- earn on debit and credit purchases
- earn and save with over 2,000 brands
- loyalty program

**Redeem keywords:**
- redeem for flights, hotels, tech
- book flights, hotels, cars, activities
- use points for almost anything
- merchandise and gift cards

**Membership:**
- Avion Select, Premium, Elite
- join now / sign in
- no RBC card needed (Avion Select tier messaging)

**Partner / co-brand keywords:**
- Canadian Tire Money
- Moi points (Metro, Food Basics, Super C, Jean Coutu)
- More Rewards (Save-on-Foods, etc.)
- Petro-Canada / fuel points
- Be Well (Rexall)
- DoorDash DashPass
- Apple, Best Buy

**Trust / award keywords:**
- International loyalty program of the year (4-time winner)
- award-winning loyalty program

### 3.3 Heading Structure

| Level | Text |
|-------|------|
| H2 | Avion Rewards members can have it all |
| H3 | Earn cash back & points |
| H3 | Take that dream vacation |
| H3 | Use points for almost anything |
| H3 | Anyone can join, no RBC card needed |
| H2 | Earn and save with over 2,000 brands |
| H2 | Your gateway to everyday savings |
| H2 | Get in on the action with exclusive events and experiences |
| H2 | Get the app and get it all on the go |
| H3 | 4-time winner |
| H2 | Join the award-winning loyalty program |

### 3.4 Internal Links (site architecture)

| URL | Section |
|-----|---------|
| `/index.html` | Home |
| `/travel/index.html` | Travel booking portal |
| `/shop.html` | Shop |
| `/redeem.html` | Redeem |
| `/membership.html` | Membership tiers |
| `/faq.html` | FAQ |
| `/login/sign-in.html` | Sign in |
| `/login/join.html` | Join now |
| `/terms-and-conditions/index.html` | Terms |
| `/partnerships/moi-rewards/index.html` | Moi partnership |
| `/partnerships/more-rewards/index.html` | More Rewards |
| `/partnerships/triangle-rewards` | Triangle Rewards |

### 3.5 External Links (authority & partners)

| Destination | Purpose |
|-------------|---------|
| `secure.royalbank.com` | Online banking sign-in |
| `www1.royalbank.com` | Card enrollment / business sign-in |
| `www.rbcroyalbank.com` | Credit cards, DoorDash, Petro-Canada, Rexall |
| `apps.apple.com` / `play.google.com` | Avion Rewards mobile app |
| `www.instagram.com/avionrewards` | Social |
| `www.tiktok.com/@avion.rewards` | Social |
| `www.facebook.com` | Social |
| `www.morerewards.ca` | Partner |
| `www.petro-canada.ca` | Partner terms |
| `www.letsbewell.ca` | Partner terms |
| `help.doordash.com` | DashPass terms |
| `www.rbc.com` | Legal, accessibility, privacy |
| `maps.rbcroyalbank.com` | Branch locator |
| `offer.rbc.com` | Service base URL (offers API) |

### 3.6 Tracking & Marketing Tags

| Type | ID / Details |
|------|--------------|
| **Google Tag Manager** | `GTM-KPSBBC6` |
| **dataLayer** | `lob: rewards`, `page_type: landing page`, `channel: public`, `content_group: avion-web : home` |
| **Conductrics** | A/B testing script (category-3 / consent-gated) |
| **Facebook** | Domain verification meta tag |
| **OneTrust** | Cookie/consent (`ot-sdk-show-settings`) |
| **dig-id attributes** | Extensive click tracking on nav/CTAs |

**Note:** Homepage does **not** use Google Ads `AW-` conversion tags — this is an **organic + brand + partnership** property, not a call-only lead gen site.

### 3.7 SEO Strengths & Gaps

**Strengths**
- Strong domain authority (RBC / established brand)
- Rich partner ecosystem creates natural backlink profile
- Multi-page site with travel, shop, redeem, membership silos
- Mobile app store links
- Social presence (Instagram, TikTok, Facebook)
- Enterprise analytics and consent management

**Gaps**
- Empty meta keywords tag (harmless but useless)
- No robots.txt at standard path
- Title repeats “Avion Rewards” twice (redundant)
- Limited OG tags (no og:image on homepage head)
- Heavy JS / enterprise stack — crawl budget considerations
- `/index.html` in URL (prefer canonical root `/`)

---

## 4. Cross-Site Keyword Overlap Matrix

| Keyword / phrase | flightbooking.com | travelbooking.com | avionrewards.com |
|------------------|:-----------------:|:-----------------:|:----------------:|
| Avion (brand) | ✓ | ✓ | ✓ |
| book flights | ✓ | ✓✓✓ (stuffed) | ✓ |
| flight booking | ✓ | ✓✓✓ | — |
| hotel booking | — | ✓✓ | ✓ |
| rewards points | — | ✓ (unverified) | ✓✓✓ |
| cheap flights | — | ✓✓ | — |
| Canada / USA | ✓✓ | ✓ | ✓ (Canada-focused) |
| call to book / phone | ✓✓✓ | ✓✓ | — |
| travel agency | ✓ | ✓ | — |
| loyalty program | — | — | ✓✓✓ |
| last-minute deals | — | ✓✓ | — |

---

## 5. Paid Media (Meta Ads / Google Ads) Summary

| Site | Platform | Account / tag | Conversion goal |
|------|----------|---------------|-----------------|
| avionflightbooking.com | **Google Ads** | `AW-18174803609` | Phone call (`gtag_report_conversion`) |
| aviontravelbooking.com | **Google Ads** | `AW-17881309480` | Phone call + inquiry (`buCJCNiDrecbEKjCvM5C`) |
| avionrewards.com | **GTM** (not Ads AW tag on homepage) | `GTM-KPSBBC6` | Membership, sign-up, partner engagement |

**Facebook / Meta signals:**
- `avionrewards.com` — Facebook domain verification present; active Facebook & Instagram links  
- `aviontravelbooking.com` — Tracks `fbclid` in localStorage (prepared for Meta Ads attribution)  
- `avionflightbooking.com` — No Meta pixel detected on homepage  

---

## 6. Competitive & Brand Risk Assessment

### Brand confusion
Both independent booking sites use “Avion” naming that mirrors RBC’s registered **Avion Rewards** brand. Searchers looking for official rewards, points redemption, or RBC travel may land on third-party call centers instead.

### Different phone numbers
| Site | Phone |
|------|-------|
| avionflightbooking.com | +1 (877) 247-2701 |
| aviontravelbooking.com | +1 (877) 228-9088 |
| avionrewards.com | No central booking phone (RBC banking channels) |

### Different operators
- **Flight booking:** Omega Media Group LLC (Missouri)  
- **Travel booking:** Independent (GoDaddy); disclaimer only  
- **Avion Rewards:** Royal Bank of Canada  

---

## 7. Recommendations (if building or competing in this space)

### For avionflightbooking.com (your property)
1. Add **Organization** + **TravelAgency** JSON-LD with phone, address, service area  
2. Add `og:image`, Twitter cards, and canonical tags  
3. Include `/about` in sitemap; build **destination landing pages** (Europe, Cancun, etc.)  
4. Create content targeting: *“phone flight booking Canada”*, *“call to book international flights”*  
5. Clarify distinction from **Avion Rewards** in meta description to reduce bounce from wrong-intent traffic  
6. Ensure SSR/prerender for React app for Googlebot  

### For aviontravelbooking.com (competitor benchmark)
- Study their **keyword stuffing** and **rewards-points adjacency** — this is how they intercept branded queries  
- Their Google Ads ID (`AW-17881309480`) confirms active PPC on overlapping terms  
- Do **not** copy keyword stuffing — counter with E-E-A-T, clear branding, and unique value  

### For avionrewards.com (official program — reference only)
- Use as **authority benchmark** for legitimate “Avion” SERP presence  
- Partner names (Canadian Tire, DoorDash, Petro-Canada) dominate long-tail reward searches  
- Travel silo at `/travel/index.html` is the official flight/hotel redemption path  

---

## 8. Appendix — Raw Meta Tag Extracts

### avionflightbooking.com
```html
<title>Avion Flight Booking — Call to Book Flights | Canada & USA</title>
<meta name="description" content="Book flights by phone with Avion Flight Booking. Canada domestic, Europe, Mexico, Cancun, and USA routes. Call +1 (877) 247-2701 — real agents, no bots."/>
<meta property="og:title" content="Avion Flight Booking — Call to Book Flights"/>
<meta property="og:description" content="Real travel agents. One call. Your flight booked. +1 (877) 247-2701"/>
```

### aviontravelbooking.com
```html
<title>Travel Booking - Affordable Flights and Hotels</title>
<meta name="description" content="Book your travel with Avion Travel Booking for the best flight reservations and hotel bookings. Explore the world with amazing deals!"/>
<meta property="og:site_name" content="Avion Travel Booking"/>
<meta property="og:description" content="Get exclusive unpublished fares and last-minute deals when you book. Enjoy personalized booking support from real agents."/>
```

### avionrewards.com
```html
<title>Avion Rewards - Avion Rewards members can have it all</title>
<meta name="description" content="Ready to get rewarded? Earn Avion Rewards points on debit and credit purchases. Redeem them for flights, hotels, tech, financial rewards, and much more."/>
<meta name="facebook-domain-verification" content="5fstdtir7coe2nk61cirm0dgthnj0m" />
```

---

*End of report. Data collected via live HTTP fetch of homepage HTML, robots.txt, and sitemap.xml on July 10, 2026.*
