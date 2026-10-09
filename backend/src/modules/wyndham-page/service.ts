import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import type { CatalogCache } from '../../lib/catalog-cache.js'
import { notFoundError } from '../../lib/errors.js'
import type { WyndhamPageRepository } from './repository.js'
import type { WyndhamPageDto } from './types.js'

const CACHE_KEY = 'wyndham-page:published'

export class WyndhamPageService {
  constructor(
    private readonly repository: WyndhamPageRepository,
    private readonly cache: CatalogCache,
  ) {}

  async getPublished(): Promise<WyndhamPageDto> {
    const cached = await this.cache.get<WyndhamPageDto>(CACHE_KEY)
    if (cached) return cached

    const page = await this.repository.getPublished()
    if (!page) {
      throw notFoundError(API_MESSAGES.WYNDHAM_PAGE_NOT_PUBLISHED, ERROR_CODES.WYNDHAM_PAGE_NOT_PUBLISHED)
    }

    await this.cache.set(CACHE_KEY, page)
    return page
  }
}
