import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import { notFoundError } from '../../lib/errors.js'
import { buildPaginationMeta } from '../../utils/pagination.js'
import type { DestinationRepository } from './repository.js'
import type { DestinationListResult, DestinationTierDto } from './types.js'

export class DestinationService {
  constructor(private readonly repository: DestinationRepository) {}

  async listDestinations(page: number, pageSize: number): Promise<DestinationListResult> {
    const { items, total } = await this.repository.findManyActive(page, pageSize)

    return {
      items,
      pagination: buildPaginationMeta(total, page, pageSize),
    }
  }

  async getDestinationBySlug(slug: string): Promise<DestinationTierDto> {
    const tier = await this.repository.findActiveBySlug(slug)

    if (!tier) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.DESTINATION_NOT_FOUND)
    }

    return tier
  }
}
