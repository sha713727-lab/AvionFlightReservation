import type { PrismaClient } from '@prisma/client'
import type { AdminCatalogItem, AdminDashboardSummary } from './types.js'

const RECENT_LIMIT = 5

function mapCatalogItem(row: {
  id: string
  slug: string
  title: string
  updatedAt: Date
}): AdminCatalogItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    updatedAt: row.updatedAt.toISOString(),
  }
}

function mapFaqItem(row: {
  id: string
  slug: string
  question: string
  updatedAt: Date
}): AdminCatalogItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.question,
    updatedAt: row.updatedAt.toISOString(),
  }
}

export class AdminDashboardRepository {
  constructor(private readonly db: PrismaClient) {}

  async getSummary(): Promise<AdminDashboardSummary> {
    const [
      servicesActive,
      servicesTotal,
      destinationTiersActive,
      destinationPlacesActive,
      faqsActive,
      recentServices,
      recentFaqs,
      databaseUp,
    ] = await Promise.all([
      this.db.service.count({ where: { isActive: true } }),
      this.db.service.count(),
      this.db.destinationTier.count({ where: { isActive: true } }),
      this.db.destinationPlace.count({ where: { isActive: true } }),
      this.db.faq.count({ where: { isActive: true } }),
      this.db.service.findMany({
        where: { isActive: true },
        orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
        take: RECENT_LIMIT,
        select: { id: true, slug: true, title: true, updatedAt: true },
      }),
      this.db.faq.findMany({
        where: { isActive: true },
        orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
        take: RECENT_LIMIT,
        select: { id: true, slug: true, question: true, updatedAt: true },
      }),
      this.db.$queryRaw`SELECT 1`.then(() => true).catch(() => false),
    ])

    return {
      counts: {
        servicesActive,
        servicesTotal,
        destinationTiersActive,
        destinationPlacesActive,
        faqsActive,
      },
      system: {
        database: databaseUp ? 'up' : 'down',
        generatedAt: new Date().toISOString(),
      },
      recentServices: recentServices.map(mapCatalogItem),
      recentFaqs: recentFaqs.map(mapFaqItem),
    }
  }
}
