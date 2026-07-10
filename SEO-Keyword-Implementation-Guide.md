# Avion Frontend — Keyword Implementation Guide

**Based on:** SEO Audit (July 10, 2026) + live codebase review  
**Project:** `Frontend/` (Avion Flight Reservation)  
**Purpose:** Tell you **exactly where** to place keywords, **which ones** to use, and **which to avoid** — with file-level mapping.

---

## Critical rules (read first)

### 1. Brand identity — use ONE consistent name

Your codebase uses **three different names**. Pick one everywhere:

| Current usage | File | Status |
|---------------|------|--------|
| **Avion Flight Reservation** | `src/constants/brand.js`, footer disclaimer | ✅ **Recommended primary brand** |
| Avion | `index.html`, `src/constants/contact.js` (`SITE_NAME`) | ⚠️ Too generic — collides with RBC Avion Rewards |
| aviontravel.com | `index.html` canonical, `contact.js` `SITE_URL` | ⚠️ Must match your **real production domain** |

**Rule:** Public SEO copy should use **`Avion Flight Reservation`** (or shortened **`Avion Flight Reservation`** in title tags). Never present the site as **“Avion Rewards”** or an RBC program.

### 2. Legal / trust keywords (mandatory)

Your footer disclaimer in `src/constants/copy.js` is **correct and must stay**. It protects you from trademark and misleading-search issues.

**Always include on every page (footer):**
- independent travel agency
- not affiliated with RBC / Avion Rewards / airlines

### 3. Keywords you must NOT use for ranking

These appear on competitor sites and create **legal + SEO quality risk** for you:

| ❌ Avoid | Why |
|----------|-----|
| Avion Rewards | RBC registered program — impersonation risk |
| book flights with Avion Rewards | Misleading branded query hijacking |
| RBC rewards / RBC Avion | No affiliation |
| earn Avion points | Implies you are the loyalty program |
| Keyword stuffing (repeat same phrase 10+ times) | Google spam / helpful content penalty |
| “Unpublished fares” without disclaimer | OK once or twice; not as stuffed copy |

### 4. Keywords you SHOULD use (your safe competitive set)

Aligned with audit winners (`avionflightbooking.com`) but **without** RBC confusion:

**Tier A — Primary (brand + core service)**
- Avion Flight Reservation
- flight reservation / flight booking
- book flights by phone
- travel agent / travel specialist
- independent travel agency

**Tier B — Service (high intent)**
- hotel booking
- reward points redemption **assistance** (not “Avion Rewards”)
- flight changes / cancellation support
- vacation packages / trip planning
- 24/7 travel support

**Tier C — Geographic (route pages & destinations)**
- Canada domestic flights
- USA flights / cross-border flights
- Europe flights
- Mexico / Cancun flights
- North America travel

**Tier D — Intent / conversion (PPC + organic CTAs)**
- call to book flights
- talk with a travel expert
- request a callback
- exclusive fares / best available fares

---

## Where to place keywords — the master map

Google weights placement in this order. **One primary keyword per zone** — do not repeat the exact same phrase in every block.

| Zone | SEO weight | Max length | Primary keyword goes here | Secondary allowed |
|------|------------|------------|---------------------------|-------------------|
| `<title>` | ★★★★★ | 50–60 chars | Brand + main service + geo | One modifier only |
| `<meta name="description">` | ★★★★★ | 150–160 chars | Service + CTA + phone/geo | Natural sentence |
| `<meta name="keywords">` | ★ (low) | 5–8 terms comma-separated | Optional legacy | Don’t rely on this |
| `<link rel="canonical">` | ★★★★ | Exact URL | Production homepage URL | Per-page when you add routes |
| `<h1>` (one per page) | ★★★★★ | Short headline | Core service intent | Brand in subline if needed |
| `<h2>` section headings | ★★★★ | Per section | One keyword theme per section | Variations OK |
| `<h3>` cards / steps | ★★★ | Short | Service or destination name | Feature labels |
| Hero subtext (`<p>`) | ★★★ | 1–2 sentences | Trust + service summary | Avoid keyword list |
| Service descriptions | ★★★ | 2–4 sentences | Service-specific terms | Features as bullets |
| FAQ questions | ★★★★ | Natural question | Long-tail queries users search | Answer with brand once |
| Image `alt` | ★★★ | Descriptive | Destination or service + context | No stuffing |
| JSON-LD schema | ★★★★ | Structured | Legal business name, phone, type | `TravelAgency` |
| Footer / disclaimer | ★★ | Legal copy | “independent travel agency” | Trademark disclaimer |
| Nav / footer links | ★★ | Link label text | Service names | `#anchor` labels |
| CTA buttons | ★ | Action text | “Talk with an expert” | Not keyword-heavy |

---

## Page-by-page keyword placement (your current site)

### HOME PAGE (`src/pages/HomePage.jsx` + sections)

---

#### A. Document `<head>` — `Frontend/index.html`

| Element | Current value | Proper? | Recommended value |
|---------|---------------|---------|-------------------|
| **title** | `Avion — Book Flights Smarter, Travel Better` | ⚠️ Partial | `Avion Flight Reservation — Book Flights by Phone \| Canada & USA` |
| **meta description** | Expert travel agents, 24/7 support, reward point redemption… | ⚠️ Risky | `Book flights and hotels with Avion Flight Reservation. Independent travel agents for Canada, USA, and international routes. Call +1 (800) 555-0199 — 24/7 support.` |
| **meta keywords** | flight booking, travel agent, reward points, cheap flights, travel specialist | ⚠️ Partial | `flight reservation, book flights by phone, travel agent, hotel booking, points redemption assistance, Canada flights, USA flights` |
| **canonical** | `https://aviontravel.com` | ⚠️ Verify domain | Use **your real live domain** (e.g. `https://avionflightbooking.com` if that is yours) |
| **og:title** | Same as title | Update with title | Match `<title>` |
| **og:description** | Expert travel agents, 24/7 support… | Update | Match meta description (can be slightly shorter) |
| **og:image** | Unsplash generic | ⚠️ | Use branded hero image `/avion-hero-background.png` on your domain |
| **JSON-LD name** | `"Avion"` | ❌ | `"Avion Flight Reservation"` |
| **JSON-LD description** | Premium travel booking and reward redemption specialists | ✅ OK | `Independent travel agency for flight and hotel reservations.` |
| **JSON-LD telephone** | Must match `contact.js` | ✅ | Keep in sync with `PHONE_NUMBER` |

**Keywords for `<title>` (pick this formula):**
```
[Brand] — [Primary service] | [Geo]
Avion Flight Reservation — Book Flights by Phone | Canada & USA
```

**Keywords for meta description (include exactly once each):**
1. Avion Flight Reservation (brand)
2. book flights OR flight reservation (service)
3. independent travel agent/agency (trust)
4. Canada / USA or international (geo)
5. phone number (conversion)

---

#### B. Hero — `src/components/sections/HeroSection.jsx`

| Element | Current | Proper? | Recommended |
|---------|---------|---------|-------------|
| **H1 line 1** | Book Flights Smarter. | ⚠️ Weak for geo/phone intent | `Book Flights by Phone.` |
| **H1 line 2** | Travel Better. | ✅ Brand tone | `Travel With Expert Agents.` |
| **Subtext** | Expert travel agents, exclusive fares, seamless reward redemptions | ⚠️ “reward redemptions” vague | `Independent travel specialists for flight and hotel reservations across Canada, the USA, and worldwide — with 24/7 support.` |

**Keyword placement rule for H1:**
- Put **one Tier A keyword** in H1: `book flights`, `flight reservation`, or `call to book flights`
- Do **not** put phone number in H1 (use CTA button + meta instead)
- Brand name optional in H1 if already in `<title>` and logo

---

#### C. Services — `src/data/services.js` + `ServicesSection.jsx`

Each service block = **one H2/H3 + description**. Map keywords like this:

| Service `title` | Primary keyword (H3) | Use in `description` (once) | Use in `tagline` |
|-----------------|----------------------|----------------------------|------------------|
| Flight Booking | flight booking | book flights, unpublished fares | exclusive fares |
| Hotel Booking | hotel booking | hotel reservations | boutique / luxury stays |
| Reward Travel | reward travel / points redemption | airline and credit card points (**not** Avion Rewards) | maximize points value |
| Flight Changes | flight change assistance | rebooking, itinerary changes | — |
| Cancellation | flight cancellation | refunds and credits | — |
| Seat Selection | airline seat selection | preferred seats | — |
| Baggage | baggage booking | excess baggage | — |
| Trip Planning | trip planning | custom itineraries | — |
| Vacation Packages | vacation packages | flight + hotel bundles | all-inclusive |

**Section heading** (`src/constants/copy.js` → `COPY.services`):

| Field | Current | Recommended |
|-------|---------|-------------|
| `title` | SERVICES | `Flight & Travel Services` (add keyword to H2) |
| `description` | From booking flights to redeeming rewards | `From flight reservations to hotel bookings and points redemption assistance — handled by licensed travel specialists.` |

---

#### D. Why Us — `src/data/services.js` (`WHY_US`) + `WhyUsSection.jsx`

| Card title | Keyword role | Keep as-is? |
|------------|--------------|-------------|
| 24/7 Support | Intent keyword | ✅ |
| Expert Agents | travel agent / specialist | ✅ |
| Fast Booking | flight booking speed | ✅ |
| Secure Payment | trust (not ranking) | ✅ |
| Best Deals | exclusive fares | ✅ Use once |
| Customer Satisfaction | social proof | ✅ |

**H2:** `WHY US` → recommended: `Why Book With Avion Flight Reservation`

---

#### E. Process — `STEPS` in `services.js` + `HowItWorksSection.jsx`

Keywords belong in **step descriptions**, not titles:

| Step | Title (short) | Description keyword |
|------|---------------|---------------------|
| 1 | Contact | call or request callback |
| 2 | Discuss | travel needs, budget |
| 3 | Options | flight options, fares |
| 4 | Confirm | secure booking |
| 5 | Travel | 24/7 support |

---

#### F. Rewards — `RewardsSection.jsx` + `RedeemCtaSection.jsx`

**Highest risk area** — competitors abuse “rewards” to steal RBC traffic.

| Element | Current | Proper? | Recommended |
|---------|---------|---------|-------------|
| H2 | Turn points into adventures | ✅ | Keep — generic |
| Eyebrow | Reward redemption | ✅ | `Points redemption assistance` |
| Description | miles or credit card points | ✅ | Add: `We help with airline and credit card loyalty programs — we are not affiliated with Avion Rewards or RBC.` |
| CTA | Redeem points | ⚠️ | `Get redemption help` |
| RedeemCta title | Ready to redeem points for a flight? | ⚠️ | `Need help using travel points for a flight?` |
| Modal title | Need help redeeming your travel points? | ✅ | Keep |

**Rule:** Say **“travel points”**, **“airline miles”**, **“credit card rewards”** — never **“Avion Rewards points”** unless explaining you are **not** that program.

---

#### G. Destinations — `src/data/destinations.js` + `DestinationsSection.jsx`

| Tier title | SEO keyword theme | Image alt pattern |
|------------|-------------------|-------------------|
| Quick getaways | short-haul flights | `Flights to Montreal — Avion Flight Reservation` |
| Explore North America | USA and Canada flights | `Miami flights from Canada` |
| Vacation destinations | Cancun vacation flights | `Cancun flight deals` |
| Visit Europe | Europe flights / transatlantic | `London flights — Europe travel` |
| See the world | international flights | `Tokyo international flights` |

**Section H2** (`COPY.destinations`):
- `accentTitle`: `Where will you go next` → add geo: `Popular Flight Destinations`
- `description`: include **once**: `Canada, USA, Europe, and beyond`

**Future:** Each destination tier should become its own URL (e.g. `/destinations/europe`) for long-tail SEO.

---

#### H. FAQ — `src/data/faq.js`

FAQ = **long-tail keyword gold**. Format: question = search query, answer = brand + service once.

| Question | Target keyword | Answer must include |
|----------|----------------|---------------------|
| How do I book a flight with Avion? | book a flight with [brand] | call 24/7 or callback form |
| Can you help me redeem my reward points? | redeem reward points flight | airline + credit card programs, **not Avion Rewards** |
| What if I need to change or cancel my flight? | flight change / cancel | specialist handles airline policies |
| Is my payment information secure? | secure flight booking | SSL, trust |
| Are there any booking fees? | flight booking fees | transparent pricing |
| Do you offer support during my trip? | 24/7 travel support | yes |

**Add these FAQ questions for audit-aligned keywords:**
1. `Is Avion Flight Reservation affiliated with Avion Rewards or RBC?` → No — independent agency.
2. `Do you book flights by phone?` → Yes — primary booking method.
3. `Which countries and routes do you serve?` → Canada, USA, Europe, Mexico, international.

---

#### I. Testimonials — `TestimonialsSection.jsx`

| Element | Current | Keyword note |
|---------|---------|--------------|
| H2 | Happy travelers worldwide | OK — social proof |
| Description | friendlier way to book | Add once: `flight booking` |

---

#### J. Contact — `COPY.contact` in `copy.js`

**Note:** `HomePage.jsx` has **no ContactSection** but nav links to `#contact`. Add section or fix nav.

| Field | Recommended keyword |
|-------|---------------------|
| `sectionTitle` | `Ready to book your flight?` |
| `sectionDescription` | `Request a callback or call our travel specialists 24/7.` |

---

#### K. Footer — `src/constants/copy.js` + `Footer.jsx`

| Field | Keywords |
|-------|----------|
| `tagline` | trusted travel partner, flight reservations |
| `disclaimer` | **Keep full legal text** — includes independent agency, not RBC/Avion Rewards |

---

#### L. Navigation — `src/constants/navigation.js`

| Link label | Keyword value | Anchor |
|------------|---------------|--------|
| Services | flight services | `#services` |
| Why Us | why choose us | `#why-us` |
| Destinations | flight destinations | `#destinations` |
| Contact Us | contact travel agent | `#contact` |

**Footer service links** already use good keywords: Flight Booking, Hotel Booking, Reward Travel, Trip Planning.

---

## Keyword density rules (avoid competitor mistakes)

`aviontravelbooking.com` repeats **“book flights with Avion Travel Booking”** dozens of times. **Do not copy this.**

| Rule | Limit |
|------|-------|
| Exact match primary phrase per page | **2–4 times** max in body |
| Brand name per page | **3–6 times** including footer |
| Same H2/H4 repeated | **Never** duplicate headings |
| “Reward points” without qualifier | **0 times** unless FAQ explains independence |
| Phone number | Meta + CTA + contact + schema = **4 placements** |

---

## File-to-keyword quick reference

| File | What to put there |
|------|-------------------|
| `Frontend/index.html` | title, meta description, keywords, canonical, OG, Twitter, JSON-LD |
| `src/constants/contact.js` | `SITE_NAME`, `SITE_DESCRIPTION`, `SITE_URL` — sync with index.html |
| `src/constants/brand.js` | `BRAND_FULL_NAME` for consistent brand keyword |
| `src/constants/copy.js` | Section H2 text, CTAs, footer disclaimer |
| `src/components/sections/HeroSection.jsx` | H1 + hero paragraph (primary keyword) |
| `src/data/services.js` | Service titles (H3 keywords), descriptions |
| `src/data/destinations.js` | Geo keywords in titles; city names for long-tail |
| `src/data/faq.js` | Long-tail question keywords |
| `src/components/sections/RewardsSection.jsx` | Generic points language only |
| `src/components/sections/RedeemCtaSection.jsx` | Soft CTA — avoid “Avion Rewards” |
| `ServiceTimelineItem.jsx` | `alt={`${title} service`}` — good pattern, keep |

---

## Recommended keyword sets (copy-paste ready)

### Set 1 — Homepage `<title>` + meta (recommended)

```
Title:
Avion Flight Reservation — Book Flights by Phone | Canada & USA

Meta description:
Book flights and hotels with Avion Flight Reservation. Independent travel agents for Canada, USA, Europe, and Mexico. Call +1 (800) 555-0199 for 24/7 flight reservation support.

Meta keywords:
flight reservation, book flights by phone, travel agent, hotel booking, points redemption help, Canada flights, USA flights, international flights
```

### Set 2 — Hero H1 + subtext

```
H1:
Book Flights by Phone.
Travel With Expert Agents.

Subtext:
Avion Flight Reservation is an independent travel agency helping you book flights and hotels across Canada, the USA, and worldwide — with 24/7 specialist support.
```

### Set 3 — JSON-LD (`index.html`)

```json
{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Avion Flight Reservation",
  "description": "Independent travel agency for flight and hotel reservations by phone.",
  "url": "https://YOUR-PRODUCTION-DOMAIN.com",
  "telephone": "+1-800-555-0199",
  "areaServed": ["Canada", "United States", "Europe", "Mexico"],
  "priceRange": "$$"
}
```

---

## Current vs proper — scorecard

| Area | Current state | Verdict | Action |
|------|---------------|---------|--------|
| Brand consistency | Mixed “Avion” / “Avion Flight Reservation” | ❌ | Unify to `BRAND_FULL_NAME` everywhere |
| Title tag | Generic, no geo/phone | ⚠️ | Use Set 1 |
| Meta description | “reward point redemption” without disclaimer | ⚠️ | Clarify independent agency |
| H1 | “Book Flights Smarter” — weak phone/geo intent | ⚠️ | Use Set 2 |
| Footer disclaimer | Full RBC/Avion Rewards exclusion | ✅ | Keep |
| Rewards section copy | Generic points — acceptable | ✅ | Add one-line non-affiliation |
| FAQ | Good start | ⚠️ | Add affiliation + phone + geo FAQs |
| Keyword stuffing | None | ✅ | Do not add competitor-style repetition |
| Canonical URL | aviontravel.com | ⚠️ | Match production domain |
| Schema name | “Avion” only | ❌ | Full legal brand name |
| Image alts | Some generic | ⚠️ | Add destination + service keywords |
| Legal pages | Placeholder `#` links | ❌ | Create real pages for SEO trust |
| Contact section | Missing on homepage | ❌ | Add `ContactSection` or fix nav |
| Meta keywords tag | Present | ✅ optional | Low priority; keep 5–8 terms max |

---

## Priority implementation order

1. **Today (critical):** Fix `index.html` title, meta, schema, canonical + sync `contact.js` / `brand.js`
2. **Today (critical):** Update Hero H1/subtext — primary keyword placement
3. **This week:** FAQ expansion (affiliation + phone + geo questions)
4. **This week:** Rewards/Redeem CTA wording — remove Avion Rewards ambiguity
5. **Next:** Destination image alts + future `/destinations/[region]` pages
6. **Next:** Legal pages (privacy, terms, refund) with light keyword footer copy
7. **Before ads launch:** Phone number consistent in meta, schema, CTA, Google Ads landing page

---

## Competitor keyword lessons (what to adopt vs avoid)

| Competitor tactic | Adopt? | Your approach |
|-------------------|--------|---------------|
| Phone-first CTA in meta + hero | ✅ Yes | Already aligned — strengthen H1 |
| Geo routes (Canada, USA, Europe, Cancun) | ✅ Yes | Use in destinations + meta |
| Google Ads AW- conversion tags | ✅ When ready | Add gtag only on production |
| “Call to book flights” phrasing | ✅ Yes | Use in title + H1 |
| Repeat “book flights with Avion…” 20× | ❌ No | 2–4 natural mentions max |
| “Rewards points” without disclaimer | ❌ No | Your footer disclaimer is the model |
| Pretending to be Avion Rewards | ❌ Never | FAQ should explicitly deny affiliation |

---

*Document version: 1.0 — aligned with `SEO-Audit-Avion-Sites.md` and `Frontend/src` codebase as of July 10, 2026.*
