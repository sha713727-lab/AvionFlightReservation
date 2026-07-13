import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import type { CatalogCache } from '../../lib/catalog-cache.js'
import { notFoundError } from '../../lib/errors.js'
import { buildPaginationMeta } from '../../utils/pagination.js'
import type { DestinationRepository } from './repository.js'
import type { DestinationListResult, DestinationTierDto } from './types.js'

export class DestinationService {
  constructor(
    private readonly repository: DestinationRepository,
    private readonly cache: CatalogCache,
  ) {}

  async listDestinations(page: number, pageSize: number): Promise<DestinationListResult> {
    const cacheKey = `destinations:list:${page}:${pageSize}`
    const cached = await this.cache.get<DestinationListResult>(cacheKey)
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

  async getDestinationBySlug(slug: string): Promise<DestinationTierDto> {
    const cacheKey = `destinations:slug:${slug}`
    const cached = await this.cache.get<DestinationTierDto>(cacheKey)
    if (cached) {
      return cached
    }

    const tier = await this.repository.findActiveBySlug(slug)

    if (!tier) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.DESTINATION_NOT_FOUND)
    }

    await this.cache.set(cacheKey, tier)
    return tier
  }
}
