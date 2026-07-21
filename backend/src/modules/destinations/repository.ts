import type { Prisma } from '@prisma/client'
import type { DatabaseClient } from '../../database/prisma.js'
import { toSkipTake } from '../../utils/pagination.js'
import type { DestinationTierDto } from './types.js'

const destinationSelect = {
  id: true,
  slug: true,
  title: true,
  points: true,
  sortOrder: true,
  places: {
    where: { isActive: true },
    select: {
      id: true,
      name: true,
      alt: true,
      imageUrl: true,
      mediaUrl: true,
      mediaType: true,
      sortOrder: true,
    },
    orderBy: { sortOrder: 'asc' as const },
  },
} satisfies Prisma.DestinationTierSelect

type DestinationRow = Prisma.DestinationTierGetPayload<{ select: typeof destinationSelect }>

function toMediaType(value: string | null): 'image' | 'video' | null {
  if (value === 'image' || value === 'video') return value
  return null
}

function toDto(row: DestinationRow): DestinationTierDto {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    points: row.points,
    sortOrder: row.sortOrder,
    places: row.places.map((place) => ({
      id: place.id,
      name: place.name,
      alt: place.alt,
      imageUrl: place.imageUrl,
      mediaUrl: place.mediaUrl,
      mediaType: toMediaType(place.mediaType),
      sortOrder: place.sortOrder,
    })),
  }
}

export class DestinationRepository {
  constructor(private readonly db: DatabaseClient) {}

  async findManyActive(
    page: number,
    pageSize: number,
  ): Promise<{ items: DestinationTierDto[]; total: number }> {
    const where = { isActive: true }
    const { skip, take } = toSkipTake(page, pageSize)

    const [rows, total] = await this.db.$transaction([
      this.db.destinationTier.findMany({
        where,
        select: destinationSelect,
        orderBy: { sortOrder: 'asc' },
        skip,
        take,
      }),
      this.db.destinationTier.count({ where }),
    ])

    return {
      items: rows.map(toDto),
      total,
    }
  }

  async findActiveBySlug(slug: string): Promise<DestinationTierDto | null> {
    const row = await this.db.destinationTier.findFirst({
      where: { slug, isActive: true },
      select: destinationSelect,
    })

    return row ? toDto(row) : null
  }
}
