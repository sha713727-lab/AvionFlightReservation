import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import type { DatabaseClient } from '../../database/prisma.js'
import type { CatalogCache } from '../../lib/catalog-cache.js'
import { notFoundError, unprocessableEntityError } from '../../lib/errors.js'
import type { HiltonPageDto } from '../hilton-page/types.js'
import type { AdminHiltonPageRepository } from './repository.js'
import type { AdminHiltonFaqBody } from './validator.js'

const CACHE_KEY_PREFIX = 'hilton-page:'
const MAX_FAQS = 8

export class AdminHiltonFaqOps {
  constructor(
    private readonly db: DatabaseClient,
    private readonly repository: AdminHiltonPageRepository,
    private readonly cache: CatalogCache,
  ) {}

  private async invalidate(): Promise<void> {
    await this.cache.invalidatePrefix(CACHE_KEY_PREFIX)
  }

  private async requirePage(): Promise<HiltonPageDto> {
    const page = await this.repository.getPage()
    if (!page) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_PAGE_NOT_FOUND)
    }
    return page
  }

  private async listFaqs() {
    return this.db.hiltonFaq.findMany({
      where: { pageId: 'default' },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    })
  }

  async create(input: AdminHiltonFaqBody): Promise<HiltonPageDto> {
    const items = await this.listFaqs()
    if (items.length >= MAX_FAQS) {
      throw unprocessableEntityError(API_MESSAGES.HOTEL_FAQ_LIMIT, ERROR_CODES.HOTEL_FAQ_LIMIT)
    }
    await this.db.hiltonFaq.create({
      data: { ...input, pageId: 'default', sortOrder: items.length + 1 },
    })
    await this.invalidate()
    return this.requirePage()
  }

  async update(id: string, input: AdminHiltonFaqBody): Promise<HiltonPageDto> {
    const items = await this.listFaqs()
    if (!items.some((item) => item.id === id)) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_ITEM_NOT_FOUND)
    }
    await this.db.hiltonFaq.update({ where: { id }, data: input })
    await this.invalidate()
    return this.requirePage()
  }

  async delete(id: string): Promise<HiltonPageDto> {
    const items = await this.listFaqs()
    if (!items.some((item) => item.id === id)) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_ITEM_NOT_FOUND)
    }
    await this.db.hiltonFaq.delete({ where: { id } })
    await this.invalidate()
    return this.requirePage()
  }

  async move(id: string, direction: 'up' | 'down'): Promise<HiltonPageDto> {
    const items = await this.listFaqs()
    const index = items.findIndex((item) => item.id === id)
    if (index < 0) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_ITEM_NOT_FOUND)
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
      this.db.hiltonFaq.update({
        where: { id: current.id },
        data: { sortOrder: neighbor.sortOrder },
      }),
      this.db.hiltonFaq.update({
        where: { id: neighbor.id },
        data: { sortOrder: current.sortOrder },
      }),
    ])
    await this.invalidate()
    return this.requirePage()
  }
}
