import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import type { DatabaseClient } from '../../database/prisma.js'
import type { CatalogCache } from '../../lib/catalog-cache.js'
import { notFoundError, unprocessableEntityError } from '../../lib/errors.js'
import type { WyndhamPageDto } from '../wyndham-page/types.js'
import type { AdminWyndhamPageRepository } from './repository.js'
import type { AdminWyndhamFaqBody } from './validator.js'

const CACHE_KEY_PREFIX = 'wyndham-page:'
const MAX_FAQS = 8

export class AdminWyndhamFaqOps {
  constructor(
    private readonly db: DatabaseClient,
    private readonly repository: AdminWyndhamPageRepository,
    private readonly cache: CatalogCache,
  ) {}

  private async invalidate(): Promise<void> {
    await this.cache.invalidatePrefix(CACHE_KEY_PREFIX)
  }

  private async requirePage(): Promise<WyndhamPageDto> {
    const page = await this.repository.getPage()
    if (!page) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_PAGE_NOT_FOUND)
    }
    return page
  }

  private async listFaqs() {
    return this.db.wyndhamFaq.findMany({
      where: { pageId: 'default' },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    })
  }

  async create(input: AdminWyndhamFaqBody): Promise<WyndhamPageDto> {
    const items = await this.listFaqs()
    if (items.length >= MAX_FAQS) {
      throw unprocessableEntityError(API_MESSAGES.HOTEL_FAQ_LIMIT, ERROR_CODES.HOTEL_FAQ_LIMIT)
    }
    await this.db.wyndhamFaq.create({
      data: { ...input, pageId: 'default', sortOrder: items.length + 1 },
    })
    await this.invalidate()
    return this.requirePage()
  }

  async update(id: string, input: AdminWyndhamFaqBody): Promise<WyndhamPageDto> {
    const items = await this.listFaqs()
    if (!items.some((item) => item.id === id)) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_ITEM_NOT_FOUND)
    }
    await this.db.wyndhamFaq.update({ where: { id }, data: input })
    await this.invalidate()
    return this.requirePage()
  }

  async delete(id: string): Promise<WyndhamPageDto> {
    const items = await this.listFaqs()
    if (!items.some((item) => item.id === id)) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_ITEM_NOT_FOUND)
    }
    await this.db.wyndhamFaq.delete({ where: { id } })
    await this.invalidate()
    return this.requirePage()
  }

  async move(id: string, direction: 'up' | 'down'): Promise<WyndhamPageDto> {
    const items = await this.listFaqs()
    const index = items.findIndex((item) => item.id === id)
    if (index < 0) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_ITEM_NOT_FOUND)
    }
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= items.length) {
      await this.invalidate()
      return this.requirePage()
    }
    const current = items[index]
    const neighbor = items[swapIndex]
    if (!current || !neighbor) {
      return this.requirePage()
    }
    await this.db.$transaction([
      this.db.wyndhamFaq.update({
        where: { id: current.id },
        data: { sortOrder: neighbor.sortOrder },
      }),
      this.db.wyndhamFaq.update({
        where: { id: neighbor.id },
        data: { sortOrder: current.sortOrder },
      }),
    ])
    await this.invalidate()
    return this.requirePage()
  }
}
