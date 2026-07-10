import type { Faq, Prisma } from '@prisma/client'
import type { DatabaseClient } from '../../database/prisma.js'
import { toSkipTake } from '../../utils/pagination.js'
import type { FaqDto } from './types.js'

const faqSelect = {
  id: true,
  slug: true,
  question: true,
  answer: true,
  sortOrder: true,
} satisfies Prisma.FaqSelect

function toDto(row: Pick<Faq, keyof typeof faqSelect>): FaqDto {
  return {
    id: row.id,
    slug: row.slug,
    question: row.question,
    answer: row.answer,
    sortOrder: row.sortOrder,
  }
}

export class FaqRepository {
  constructor(private readonly db: DatabaseClient) {}

  async findManyActive(
    page: number,
    pageSize: number,
  ): Promise<{ items: FaqDto[]; total: number }> {
    const where = { isActive: true }
    const { skip, take } = toSkipTake(page, pageSize)

    const [rows, total] = await this.db.$transaction([
      this.db.faq.findMany({
        where,
        select: faqSelect,
        orderBy: { sortOrder: 'asc' },
        skip,
        take,
      }),
      this.db.faq.count({ where }),
    ])

    return {
      items: rows.map(toDto),
      total,
    }
  }

  async findActiveBySlug(slug: string): Promise<FaqDto | null> {
    const row = await this.db.faq.findFirst({
      where: { slug, isActive: true },
      select: faqSelect,
    })

    return row ? toDto(row) : null
  }
}
