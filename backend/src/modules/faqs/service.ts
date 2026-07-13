import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import type { CatalogCache } from '../../lib/catalog-cache.js'
import { notFoundError } from '../../lib/errors.js'
import { buildPaginationMeta } from '../../utils/pagination.js'
import type { FaqRepository } from './repository.js'
import type { FaqDto, FaqListResult } from './types.js'

export class FaqService {
  constructor(
    private readonly repository: FaqRepository,
    private readonly cache: CatalogCache,
  ) {}

  async listFaqs(page: number, pageSize: number): Promise<FaqListResult> {
    const cacheKey = `faqs:list:${page}:${pageSize}`
    const cached = await this.cache.get<FaqListResult>(cacheKey)
    if (cached) {
      return cached
    }

    const { items, total } = await this.repository.findManyActive(page, pageSize)
    const result = {
      items,
      pagination: buildPaginationMeta(total, page, pageSize),
    }
    await this.cache.set(cacheKey, result)
    return result
  }

  async getFaqBySlug(slug: string): Promise<FaqDto> {
    const cacheKey = `faqs:slug:${slug}`
    const cached = await this.cache.get<FaqDto>(cacheKey)
    if (cached) {
      return cached
    }

    const faq = await this.repository.findActiveBySlug(slug)

    if (!faq) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.FAQ_NOT_FOUND)
    }

    await this.cache.set(cacheKey, faq)
    return faq
  }
}
