# Avion Backend API

Public read-only Fastify API for Avion Flight Reservation marketing content.

**Out of scope (by design):** auth, login, admin, inquiries, bookings.

## Stack

- Node.js 22 + TypeScript (strict)
- Fastify + Zod + Prisma + PostgreSQL
- Pino, Helmet, CORS, rate limiting, compression
- Swagger UI at `/docs`

## Setup

```bash
# From repo root
cp backend/.env.example backend/.env
npm run db:up
cd backend
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

API: `http://localhost:4000`  
Docs: `http://localhost:4000/docs`  
Health: `http://localhost:4000/api/v1/health`

## Public endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/health` | Health + DB ping |
| GET | `/api/v1/services` | Paginated services |
| GET | `/api/v1/services/:slug` | Service by slug |
| GET | `/api/v1/destinations` | Paginated destination tiers |
| GET | `/api/v1/destinations/:slug` | Tier by slug |
| GET | `/api/v1/faqs` | Paginated FAQs |
| GET | `/api/v1/faqs/:slug` | FAQ by slug |

## Architecture

Feature modules under `src/modules/<feature>/` follow Controller → Service → Repository.

See `.cursor/rules/backend-production-rules.mdc` for the full 40-rule contract.
