import type { Service, Prisma } from '@prisma/client'
import type { DatabaseClient } from '../../database/prisma.js'
import { toSkipTake } from '../../utils/pagination.js'
import type { ServiceDto } from './types.js'

const serviceSelect = {
  id: true,
  slug: true,
  title: true,
  tagline: true,
  description: true,
  features: true,
  iconKey: true,
  imageKey: true,
  imageAlt: true,
  sortOrder: true,
} satisfies Prisma.ServiceSelect

function toDto(row: Pick<Service, keyof typeof serviceSelect>): ServiceDto {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    description: row.description,
    features: row.features,
    iconKey: row.iconKey,
    imageKey: row.imageKey,
    imageAlt: row.imageAlt,
    sortOrder: row.sortOrder,
  }
}

export class ServiceRepository {
  constructor(private readonly db: DatabaseClient) {}

  async findManyActive(
    page: number,
    pageSize: number,
  ): Promise<{ items: ServiceDto[]; total: number }> {
    const where = { isActive: true }
    const { skip, take } = toSkipTake(page, pageSize)

    const [rows, total] = await this.db.$transaction([
      this.db.service.findMany({
        where,
        select: serviceSelect,
        orderBy: { sortOrder: 'asc' },
        skip,
        take,
      }),
      this.db.service.count({ where }),
    ])

    return {
      items: rows.map(toDto),
      total,
    }
  }

  async findActiveBySlug(slug: string): Promise<ServiceDto | null> {
    const row = await this.db.service.findFirst({
      where: { slug, isActive: true },
      select: serviceSelect,
    })

    return row ? toDto(row) : null
  }
}
