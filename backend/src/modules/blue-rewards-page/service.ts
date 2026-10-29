import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import type { CatalogCache } from '../../lib/catalog-cache.js'
import { notFoundError } from '../../lib/errors.js'
import type { BlueRewardsPageRepository } from './repository.js'
import type { BlueRewardsPageDto } from './types.js'

const CACHE_KEY = 'blue-rewards-page:published'

export class BlueRewardsPageService {
  constructor(
    private readonly repository: BlueRewardsPageRepository,
    private readonly cache: CatalogCache,
  ) {}

  async getPublished(): Promise<BlueRewardsPageDto> {
    const cached = await this.cache.get<BlueRewardsPageDto>(CACHE_KEY)
    if (cached) return cached

    const page = await this.repository.getPublished()
    if (!page) {
      throw notFoundError(API_MESSAGES.BLUE_REWARDS_PAGE_NOT_PUBLISHED, ERROR_CODES.BLUE_REWARDS_PAGE_NOT_PUBLISHED)
    }

    await this.cache.set(CACHE_KEY, page)
    return page
  }
}
