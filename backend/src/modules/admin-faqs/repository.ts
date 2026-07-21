import type { Faq, Prisma } from '@prisma/client'
import type { DatabaseClient } from '../../database/prisma.js'
import type { AdminFaqDto, AdminFaqWriteInput } from './types.js'

const select = {
  id: true,
  slug: true,
  question: true,
  answer: true,
  sortOrder: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.FaqSelect

type Row = Prisma.FaqGetPayload<{ select: typeof select }>

function toDto(row: Row): AdminFaqDto {
  return {
    id: row.id,
    slug: row.slug,
    question: row.question,
    answer: row.answer,
    sortOrder: row.sortOrder,
    isActive: row.isActive,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

export class AdminFaqRepository {
  constructor(private readonly db: DatabaseClient) {}

  async findAllOrdered(): Promise<AdminFaqDto[]> {
    const rows = await this.db.faq.findMany({
      select,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    })
    return rows.map(toDto)
  }

  async findById(id: string): Promise<AdminFaqDto | null> {
    const row = await this.db.faq.findUnique({ where: { id }, select })
    return row ? toDto(row) : null
  }

  async findBySlug(slug: string): Promise<Pick<Faq, 'id'> | null> {
    return this.db.faq.findUnique({ where: { slug }, select: { id: true } })
  }

  async getNextSortOrder(): Promise<number> {
    const aggregate = await this.db.faq.aggregate({ _max: { sortOrder: true } })
    return (aggregate._max.sortOrder ?? 0) + 1
  }

  async create(input: AdminFaqWriteInput, sortOrder: number): Promise<AdminFaqDto> {
    const row = await this.db.faq.create({
      data: { ...input, sortOrder },
      select,
    })
    return toDto(row)
  }

  async update(id: string, input: AdminFaqWriteInput): Promise<AdminFaqDto> {
    const row = await this.db.faq.update({
      where: { id },
      data: input,
      select,
    })
    return toDto(row)
  }

  async deleteById(id: string): Promise<void> {
    await this.db.faq.delete({ where: { id } })
  }

  async renumberAll(): Promise<AdminFaqDto[]> {
    const rows = await this.db.faq.findMany({
      select: { id: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    })
    await this.db.$transaction(
      rows.map((row, index) =>
        this.db.faq.update({
          where: { id: row.id },
          data: { sortOrder: index + 1 },
        }),
      ),
    )
    return this.findAllOrdered()
  }

  async swapSortOrder(firstId: string, secondId: string): Promise<void> {
    const [first, second] = await this.db.$transaction([
      this.db.faq.findUniqueOrThrow({
        where: { id: firstId },
        select: { sortOrder: true },
      }),
      this.db.faq.findUniqueOrThrow({
        where: { id: secondId },
        select: { sortOrder: true },
      }),
    ])
    await this.db.$transaction([
      this.db.faq.update({
        where: { id: firstId },
        data: { sortOrder: second.sortOrder },
      }),
      this.db.faq.update({
        where: { id: secondId },
        data: { sortOrder: first.sortOrder },
      }),
    ])
  }
}
