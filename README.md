# Avion Flight Reservation

Independent travel booking website for **Avion Flight Reservation** — phone-first flight and hotel assistance across Canada, the USA, Europe, and Mexico.

**Repository:** [sha713727-lab/AvionFlightReservation](https://github.com/sha713727-lab/AvionFlightReservation)

---

## Overview

Production Next.js frontend plus a Fastify public API. Visitors explore services and destinations, review legal policies, and contact specialists by phone. The brand is explicitly **not** affiliated with RBC or Avion Rewards.

**Not included (by design):** auth, login, admin panel, inquiry forms, online booking checkout.

### Highlights

- Marketing pages: Home, Services, Destinations, About, Contact
- Legal pages: Privacy, Terms, Refund, Cancellation, Cookie Policy
- Public catalog API: services, destinations, FAQs
- Call-expert modal and `tel:` dial CTAs
- SEO metadata, canonical URLs, Open Graph, Twitter cards, JSON-LD
- Sitemap and robots.txt

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, Zod |
| Backend | Node.js 22, Fastify, Prisma, PostgreSQL, Zod, Pino |
| Security | Helmet, strict CORS, rate limiting |
| Docs | Swagger UI (`/docs`) |
| Hosting | Vercel (frontend) |

---

## Project structure

```
AvionFlightReservation/
├── Frontend/                 # Next.js application
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── modules/
│   │   ├── services/api/     # API client → backend
│   │   ├── schemas/
│   │   └── utils/
│   └── package.json
├── backend/                  # Fastify API
│   ├── prisma/
│   ├── src/
│   │   ├── modules/          # health, services, destinations, faqs
│   │   ├── config/
│   │   ├── middleware/
│   │   └── ...
│   ├── docker-compose.yml
│   └── package.json
├── .cursor/rules/
└── README.md
```

---

## Production rules

- **Frontend:** `.cursor/rules/frontend-production-rules.mdc`
- **Backend:** `.cursor/rules/backend-production-rules.mdc` (40 strict rules)

---

## Local development

**Requirements:** Node.js 22, Docker (for PostgreSQL)

### 1. Database + backend

```bash
cp backend/.env.example backend/.env
npm run db:up
cd backend
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

- API: [http://localhost:4000](http://localhost:4000)
- Swagger: [http://localhost:4000/docs](http://localhost:4000/docs)

### 2. Frontend

```bash
cp Frontend/.env.example Frontend/.env
cd Frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`NEXT_PUBLIC_API_URL` must point at the backend (default `http://localhost:4000`).

### Root scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Frontend dev server |
| `npm run dev:backend` | Backend API |
| `npm run db:up` | Start Postgres via Docker |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed catalog data |
| `npm run lint` | Lint frontend + backend |

---

## Public API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/health` | Health check |
| GET | `/api/v1/services` | List services |
| GET | `/api/v1/services/:slug` | Service detail |
| GET | `/api/v1/destinations` | List destination tiers |
| GET | `/api/v1/destinations/:slug` | Tier detail |
| GET | `/api/v1/faqs` | List FAQs |
| GET | `/api/v1/faqs/:slug` | FAQ detail |

Standard response shape:

```json
{ "success": true, "message": "", "data": {}, "errors": null }
```

---

## Deploy on Vercel

1. Go to [Vercel](https://vercel.com) → **Add New** → **Project**
2. Import [sha713727-lab/AvionFlightReservation](https://github.com/sha713727-lab/AvionFlightReservation)
3. Configure:

| Setting | Value |
|---------|--------|
| Framework Preset | Next.js |
| **Root Directory** | **`Frontend`** |
| Node.js Version | 22.x |

4. Set `NEXT_PUBLIC_API_URL` to your deployed API origin
5. Click **Deploy**

Host the `backend` API separately (Railway, Render, Fly, etc.) with `DATABASE_URL` and `CORS_ORIGINS` set to your frontend domain(s).

---

## Contact

- **Phone:** +1 877 702 9887
- **Email:** sales@avionflightreservation.com

---

## License

Private project for Avion Flight Reservation. All rights reserved.
