import type { Service, Prisma } from '@prisma/client'
import type { DatabaseClient } from '../../database/prisma.js'
import type { ServiceIconKey, ServiceImageKey } from './constants.js'
import type { AdminServiceDto, AdminServiceMediaType, AdminServiceWriteInput } from './types.js'

const adminServiceSelect = {
  id: true,
  slug: true,
  title: true,
  tagline: true,
  description: true,
  features: true,
  iconKey: true,
  imageKey: true,
  imageAlt: true,
  mediaUrl: true,
  mediaType: true,
  sortOrder: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ServiceSelect

function toMediaType(value: string | null): AdminServiceMediaType | null {
  if (value === 'image' || value === 'video') return value
  return null
}

function toDto(row: Pick<Service, keyof typeof adminServiceSelect>): AdminServiceDto {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    description: row.description,
    features: row.features,
    iconKey: row.iconKey as ServiceIconKey,
    imageKey: row.imageKey as ServiceImageKey,
    imageAlt: row.imageAlt,
    mediaUrl: row.mediaUrl,
    mediaType: toMediaType(row.mediaType),
    sortOrder: row.sortOrder,
    isActive: row.isActive,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

export class AdminServiceRepository {
  constructor(private readonly db: DatabaseClient) {}

  async findAllOrdered(): Promise<AdminServiceDto[]> {
    const rows = await this.db.service.findMany({
      select: adminServiceSelect,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    })
    return rows.map(toDto)
  }

  async findById(id: string): Promise<AdminServiceDto | null> {
    const row = await this.db.service.findUnique({
      where: { id },
      select: adminServiceSelect,
    })
    return row ? toDto(row) : null
  }

  async findBySlug(slug: string): Promise<AdminServiceDto | null> {
    const row = await this.db.service.findUnique({
      where: { slug },
      select: adminServiceSelect,
    })
    return row ? toDto(row) : null
  }

  async getNextSortOrder(): Promise<number> {
    const aggregate = await this.db.service.aggregate({ _max: { sortOrder: true } })
    return (aggregate._max.sortOrder ?? 0) + 1
  }

  async create(input: AdminServiceWriteInput, sortOrder: number): Promise<AdminServiceDto> {
    const row = await this.db.service.create({
      data: { ...input, sortOrder },
      select: adminServiceSelect,
    })
    return toDto(row)
  }

  async update(id: string, input: AdminServiceWriteInput): Promise<AdminServiceDto> {
    const row = await this.db.service.update({
      where: { id },
      data: input,
      select: adminServiceSelect,
    })
    return toDto(row)
  }

  async updateMedia(
    id: string,
    media: { mediaUrl: string; mediaType: AdminServiceMediaType },
  ): Promise<AdminServiceDto> {
    const row = await this.db.service.update({
      where: { id },
      data: media,
      select: adminServiceSelect,
    })
    return toDto(row)
  }

  async clearMedia(id: string): Promise<AdminServiceDto> {
    const row = await this.db.service.update({
      where: { id },
      data: { mediaUrl: null, mediaType: null },
      select: adminServiceSelect,
    })
    return toDto(row)
  }

  async deleteById(id: string): Promise<void> {
    await this.db.service.delete({ where: { id } })
  }

  async renumberAll(): Promise<AdminServiceDto[]> {
    const rows = await this.db.service.findMany({
      select: { id: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    })

    await this.db.$transaction(
      rows.map((row, index) =>
        this.db.service.update({
          where: { id: row.id },
          data: { sortOrder: index + 1 },
        }),
      ),
    )

    return this.findAllOrdered()
  }

  async swapSortOrder(firstId: string, secondId: string): Promise<void> {
    const [first, second] = await this.db.$transaction([
      this.db.service.findUniqueOrThrow({ where: { id: firstId }, select: { sortOrder: true } }),
      this.db.service.findUniqueOrThrow({ where: { id: secondId }, select: { sortOrder: true } }),
    ])

    await this.db.$transaction([
      this.db.service.update({ where: { id: firstId }, data: { sortOrder: second.sortOrder } }),
      this.db.service.update({ where: { id: secondId }, data: { sortOrder: first.sortOrder } }),
    ])
  }
}
