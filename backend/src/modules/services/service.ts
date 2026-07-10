import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import { notFoundError } from '../../lib/errors.js'
import { buildPaginationMeta } from '../../utils/pagination.js'
import type { ServiceRepository } from './repository.js'
import type { ServiceDto, ServiceListResult } from './types.js'

export class ServiceService {
  constructor(private readonly repository: ServiceRepository) {}

  async listServices(page: number, pageSize: number): Promise<ServiceListResult> {
    const { items, total } = await this.repository.findManyActive(page, pageSize)

    return {
      items,
      pagination: buildPaginationMeta(total, page, pageSize),
    }
  }

  async getServiceBySlug(slug: string): Promise<ServiceDto> {
    const service = await this.repository.findActiveBySlug(slug)

    if (!service) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.SERVICE_NOT_FOUND)
    }

    return service
  }
}
