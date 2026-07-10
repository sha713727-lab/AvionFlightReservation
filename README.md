# Avion Flight Reservation

Independent travel booking website for **Avion Flight Reservation** — phone-first flight and hotel assistance across Canada, the USA, Europe, and Mexico.

**Repository:** [sha713727-lab/AvionFlightReservation](https://github.com/sha713727-lab/AvionFlightReservation)

---

## Overview

This project is a production Next.js frontend for an independent travel agency. Visitors can explore services and destinations, review legal policies, and contact specialists by phone. The brand is explicitly **not** affiliated with RBC or Avion Rewards.

### Highlights

- Marketing pages: Home, Services, Destinations, About, Contact
- Legal pages: Privacy, Terms, Refund, Cancellation, Cookie Policy
- Call-expert modal and `tel:` dial CTAs
- SEO metadata, canonical URLs, Open Graph, Twitter cards, JSON-LD
- Sitemap and robots.txt
- Responsive layout with accessible focus states

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4, Framer Motion |
| Validation | Zod |
| Icons / fonts | React Icons, Outfit |
| Hosting | Vercel |

---

## Project structure

```
Avion/
├── Frontend/                 # Next.js application
│   ├── public/               # Static assets, sitemap, robots
│   ├── src/
│   │   ├── app/              # App Router pages & metadata
│   │   ├── components/       # Shared UI, layout, sections
│   │   ├── constants/        # Copy, routes, contact, brand
│   │   ├── modules/          # Feature modules (pages by domain)
│   │   ├── hooks/            # Shared hooks
│   │   └── utils/            # Helpers (cn, SEO, dial)
│   ├── next.config.js
│   └── package.json
├── frontendProductionRules.docx
├── SEO-Audit-Avion-Sites.md
├── SEO-Keyword-Implementation-Guide.md
└── README.md
```

---

## Production rules

All frontend work must follow the Avion production contract (`frontendProductionRules.docx` and `.cursor/rules/frontend-production-rules.mdc`):

- Production-ready code only — no placeholders, TODOs, demo logic, or dead code
- Max **300 lines** per file; split when approaching the limit
- **One responsibility** per component; extract subcomponents and hooks for logic
- Feature flow: **Component → Hook → Service → API → Backend** (never `fetch` in components)
- Validate client input with **Zod**
- **Constants** for strings, URLs, regex, and messages — no hardcoded UI copy
- **Design tokens** only for colors, spacing, and typography
- Use **`@/`** absolute imports (maps to `src/`)
- No `console.log` in production code; no empty catch blocks
- Avoid unnecessary fallbacks (`??`, `||`) unless the API contract requires them
- Forms: validate, trim, disable while loading, prevent duplicate submit, inline errors, success state
- Reuse shared UI (`Button`, `Modal`, etc.) — no duplicate patterns
- Keep changes minimal; analyze existing code before adding abstractions
- Before finish: ESLint clean; loading / error / empty / success states; keyboard accessible, labeled, semantic HTML, visible focus

---

## Local development

**Requirements:** Node.js 20+ (repo pins Node 22 via `.node-version`)

```bash
cd Frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

From the repository root:

```bash
npm run dev      # Next.js dev server
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

### Environment

Copy `Frontend/.env.example` when adding environment variables. Do not commit secrets (`.env` is gitignored).

---

## Deploy on Vercel

1. Go to [Vercel](https://vercel.com) → **Add New** → **Project**
2. Import [sha713727-lab/AvionFlightReservation](https://github.com/sha713727-lab/AvionFlightReservation)
3. Configure (**important**):

| Setting | Value |
|---------|--------|
| Framework Preset | Next.js |
| **Root Directory** | **`Frontend`** |
| Build Command | `npm run build` (default) |
| Output Directory | leave default |
| Install Command | `npm install` (default) |
| Node.js Version | 22.x |

4. Click **Deploy**

Set **Root Directory** to `Frontend` so Vercel installs dependencies where `next` lives. Do not use a Static Site / Publish Directory.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Create optimized production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

---

## Contact

- **Phone:** +1 877 702 9887
- **Email:** sales@avionflightreservation.com

---

## License

Private project for Avion Flight Reservation. All rights reserved.
