import type { Prisma } from '@prisma/client'
import type { DatabaseClient } from '../../database/prisma.js'
import type {
  AdminPlaceDto,
  AdminPlaceOptionsResult,
  AdminPlaceWriteInput,
} from './types.js'

const select = {
  id: true,
  name: true,
  alt: true,
  imageUrl: true,
  mediaUrl: true,
  mediaType: true,
  sortOrder: true,
  isActive: true,
  tierId: true,
  createdAt: true,
  updatedAt: true,
  tier: { select: { title: true, slug: true } },
} satisfies Prisma.DestinationPlaceSelect

type Row = Prisma.DestinationPlaceGetPayload<{ select: typeof select }>
type PlaceMediaType = 'image' | 'video'

function toMediaType(value: string | null): PlaceMediaType | null {
  if (value === 'image' || value === 'video') return value
  return null
}

function toDto(row: Row): AdminPlaceDto {
  return {
    id: row.id,
    name: row.name,
    alt: row.alt,
    imageUrl: row.imageUrl,
    mediaUrl: row.mediaUrl,
    mediaType: toMediaType(row.mediaType),
    sortOrder: row.sortOrder,
    isActive: row.isActive,
    tierId: row.tierId,
    tierTitle: row.tier.title,
    tierSlug: row.tier.slug,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

export class AdminPlaceRepository {
  constructor(private readonly db: DatabaseClient) {}

  async findAllOrdered(tierId?: string): Promise<AdminPlaceDto[]> {
    const rows = await this.db.destinationPlace.findMany({
      where: tierId ? { tierId } : undefined,
      select,
      orderBy: [{ tier: { sortOrder: 'asc' } }, { sortOrder: 'asc' }, { createdAt: 'asc' }],
    })
    return rows.map(toDto)
  }

  async findById(id: string): Promise<AdminPlaceDto | null> {
    const row = await this.db.destinationPlace.findUnique({ where: { id }, select })
    return row ? toDto(row) : null
  }

  async findMediaUrlsByTierId(tierId: string): Promise<string[]> {
    const rows = await this.db.destinationPlace.findMany({
      where: { tierId, mediaUrl: { not: null } },
      select: { mediaUrl: true },
    })
    return rows
      .map((row) => row.mediaUrl)
      .filter((url): url is string => Boolean(url))
  }

  async tierExists(tierId: string): Promise<boolean> {
    const tier = await this.db.destinationTier.findUnique({
      where: { id: tierId },
      select: { id: true },
    })
    return Boolean(tier)
  }

  async getNextSortOrder(tierId: string): Promise<number> {
    const aggregate = await this.db.destinationPlace.aggregate({
      where: { tierId },
      _max: { sortOrder: true },
    })
    return (aggregate._max.sortOrder ?? 0) + 1
  }

  async create(input: AdminPlaceWriteInput, sortOrder: number): Promise<AdminPlaceDto> {
    const row = await this.db.destinationPlace.create({
      data: { ...input, sortOrder },
      select,
    })
    return toDto(row)
  }

  async update(
    id: string,
    input: AdminPlaceWriteInput & { sortOrder?: number },
  ): Promise<AdminPlaceDto> {
    const row = await this.db.destinationPlace.update({
      where: { id },
      data: input,
      select,
    })
    return toDto(row)
  }

  async updateMedia(
    id: string,
    media: { mediaUrl: string; mediaType: PlaceMediaType },
  ): Promise<AdminPlaceDto> {
    const row = await this.db.destinationPlace.update({
      where: { id },
      data: media,
      select,
    })
    return toDto(row)
  }

  async clearMedia(id: string): Promise<AdminPlaceDto> {
    const row = await this.db.destinationPlace.update({
      where: { id },
      data: { mediaUrl: null, mediaType: null },
      select,
    })
    return toDto(row)
  }

  async deleteById(id: string): Promise<void> {
    await this.db.destinationPlace.delete({ where: { id } })
  }

  async renumberWithinTier(tierIds: string[]): Promise<void> {
    for (const tierId of tierIds) {
      const rows = await this.db.destinationPlace.findMany({
        where: { tierId },
        select: { id: true },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      })
      await this.db.$transaction(
        rows.map((row, index) =>
          this.db.destinationPlace.update({
            where: { id: row.id },
            data: { sortOrder: index + 1 },
          }),
        ),
      )
    }
  }

  async swapSortOrder(firstId: string, secondId: string): Promise<void> {
    const [first, second] = await this.db.$transaction([
      this.db.destinationPlace.findUniqueOrThrow({
        where: { id: firstId },
        select: { sortOrder: true },
      }),
      this.db.destinationPlace.findUniqueOrThrow({
        where: { id: secondId },
        select: { sortOrder: true },
      }),
    ])
    await this.db.$transaction([
      this.db.destinationPlace.update({
        where: { id: firstId },
        data: { sortOrder: second.sortOrder },
      }),
      this.db.destinationPlace.update({
        where: { id: secondId },
        data: { sortOrder: first.sortOrder },
      }),
    ])
  }

  async listTierOptions(): Promise<AdminPlaceOptionsResult> {
    const tiers = await this.db.destinationTier.findMany({
      select: { id: true, title: true, slug: true, isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    })
    return { tiers }
  }
}
