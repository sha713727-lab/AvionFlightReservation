import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import type { CatalogCache } from '../../lib/catalog-cache.js'
import { notFoundError } from '../../lib/errors.js'
import { buildPaginationMeta } from '../../utils/pagination.js'
import type { ServiceRepository } from './repository.js'
import type { ServiceDto, ServiceListResult } from './types.js'

export class ServiceService {
  constructor(
    private readonly repository: ServiceRepository,
    private readonly cache: CatalogCache,
  ) {}

  async listServices(page: number, pageSize: number): Promise<ServiceListResult> {
    const cacheKey = `services:list:${page}:${pageSize}`
    const cached = await this.cache.get<ServiceListResult>(cacheKey)
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

  async getServiceBySlug(slug: string): Promise<ServiceDto> {
    const cacheKey = `services:slug:${slug}`
    const cached = await this.cache.get<ServiceDto>(cacheKey)
    if (cached) {
      return cached
    }

    const service = await this.repository.findActiveBySlug(slug)

    if (!service) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.SERVICE_NOT_FOUND)
    }

    await this.cache.set(cacheKey, service)
    return service
  }
}
