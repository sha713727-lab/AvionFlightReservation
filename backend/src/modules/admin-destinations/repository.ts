import type { DestinationTier, Prisma } from '@prisma/client'
import type { DatabaseClient } from '../../database/prisma.js'
import type { AdminDestinationDto, AdminDestinationWriteInput } from './types.js'

const select = {
  id: true,
  slug: true,
  title: true,
  points: true,
  sortOrder: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  _count: { select: { places: true } },
} satisfies Prisma.DestinationTierSelect

type Row = Prisma.DestinationTierGetPayload<{ select: typeof select }>

function toDto(row: Row): AdminDestinationDto {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    points: row.points,
    sortOrder: row.sortOrder,
    isActive: row.isActive,
    placesCount: row._count.places,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

export class AdminDestinationRepository {
  constructor(private readonly db: DatabaseClient) {}

  async findAllOrdered(): Promise<AdminDestinationDto[]> {
    const rows = await this.db.destinationTier.findMany({
      select,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    })
    return rows.map(toDto)
  }

  async findById(id: string): Promise<AdminDestinationDto | null> {
    const row = await this.db.destinationTier.findUnique({ where: { id }, select })
    return row ? toDto(row) : null
  }

  async findBySlug(slug: string): Promise<Pick<DestinationTier, 'id'> | null> {
    return this.db.destinationTier.findUnique({ where: { slug }, select: { id: true } })
  }

  async getNextSortOrder(): Promise<number> {
    const aggregate = await this.db.destinationTier.aggregate({ _max: { sortOrder: true } })
    return (aggregate._max.sortOrder ?? 0) + 1
  }

  async create(input: AdminDestinationWriteInput, sortOrder: number): Promise<AdminDestinationDto> {
    const row = await this.db.destinationTier.create({
      data: { ...input, sortOrder },
      select,
    })
    return toDto(row)
  }

  async update(id: string, input: AdminDestinationWriteInput): Promise<AdminDestinationDto> {
    const row = await this.db.destinationTier.update({
      where: { id },
      data: input,
      select,
    })
    return toDto(row)
  }

  async deleteById(id: string): Promise<void> {
    await this.db.destinationTier.delete({ where: { id } })
  }

  async findPlaceMediaUrls(tierId: string): Promise<string[]> {
    const rows = await this.db.destinationPlace.findMany({
      where: { tierId, mediaUrl: { not: null } },
      select: { mediaUrl: true },
    })
    return rows
      .map((row) => row.mediaUrl)
      .filter((url): url is string => Boolean(url))
  }

  async renumberAll(): Promise<AdminDestinationDto[]> {
    const rows = await this.db.destinationTier.findMany({
      select: { id: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    })
    await this.db.$transaction(
      rows.map((row, index) =>
        this.db.destinationTier.update({
          where: { id: row.id },
          data: { sortOrder: index + 1 },
        }),
      ),
    )
    return this.findAllOrdered()
  }

  async swapSortOrder(firstId: string, secondId: string): Promise<void> {
    const [first, second] = await this.db.$transaction([
      this.db.destinationTier.findUniqueOrThrow({
        where: { id: firstId },
        select: { sortOrder: true },
      }),
      this.db.destinationTier.findUniqueOrThrow({
        where: { id: secondId },
        select: { sortOrder: true },
      }),
    ])
    await this.db.$transaction([
      this.db.destinationTier.update({
        where: { id: firstId },
        data: { sortOrder: second.sortOrder },
      }),
      this.db.destinationTier.update({
        where: { id: secondId },
        data: { sortOrder: first.sortOrder },
      }),
    ])
  }
}
