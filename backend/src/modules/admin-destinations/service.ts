import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import type { CatalogCache } from '../../lib/catalog-cache.js'
import { conflictError, notFoundError } from '../../lib/errors.js'
import { deletePlaceMediaFile } from '../../lib/place-media-storage.js'
import type { AdminDestinationRepository } from './repository.js'
import type {
  AdminDestinationDto,
  AdminDestinationListResult,
  AdminDestinationWriteInput,
} from './types.js'

export class AdminDestinationsService {
  constructor(
    private readonly repository: AdminDestinationRepository,
    private readonly cache: CatalogCache,
  ) {}

  async list(): Promise<AdminDestinationListResult> {
    return { items: await this.repository.findAllOrdered() }
  }

  async getById(id: string): Promise<AdminDestinationDto> {
    const item = await this.repository.findById(id)
    if (!item) throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.DESTINATION_NOT_FOUND)
    return item
  }

  async create(input: AdminDestinationWriteInput): Promise<AdminDestinationDto> {
    const existing = await this.repository.findBySlug(input.slug)
    if (existing) {
      throw conflictError(
        API_MESSAGES.ADMIN_DESTINATION_SLUG_CONFLICT,
        ERROR_CODES.DESTINATION_SLUG_CONFLICT,
      )
    }
    const created = await this.repository.create(
      input,
      await this.repository.getNextSortOrder(),
    )
    await this.cache.invalidatePrefix('destinations:')
    return created
  }

  async update(id: string, input: AdminDestinationWriteInput): Promise<AdminDestinationDto> {
    const current = await this.repository.findById(id)
    if (!current) throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.DESTINATION_NOT_FOUND)

    if (input.slug !== current.slug) {
      const existing = await this.repository.findBySlug(input.slug)
      if (existing) {
        throw conflictError(
          API_MESSAGES.ADMIN_DESTINATION_SLUG_CONFLICT,
          ERROR_CODES.DESTINATION_SLUG_CONFLICT,
        )
      }
    }

    const updated = await this.repository.update(id, input)
    await this.cache.invalidatePrefix('destinations:')
    return updated
  }

  async remove(id: string): Promise<AdminDestinationListResult> {
    const current = await this.repository.findById(id)
    if (!current) throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.DESTINATION_NOT_FOUND)
    const mediaUrls = await this.repository.findPlaceMediaUrls(id)
    await this.repository.deleteById(id)
    await Promise.all(mediaUrls.map((url) => deletePlaceMediaFile(url)))
    const items = await this.repository.renumberAll()
    await this.cache.invalidatePrefix('destinations:')
    return { items }
  }

  async move(id: string, direction: 'up' | 'down'): Promise<AdminDestinationListResult> {
    const items = await this.repository.findAllOrdered()
    const index = items.findIndex((item) => item.id === id)
    if (index < 0) throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.DESTINATION_NOT_FOUND)

    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= items.length) return { items }

    const current = items[index]
    const neighbor = items[swapIndex]
    if (!current || !neighbor) return { items }

    await this.repository.swapSortOrder(current.id, neighbor.id)
    const renumbered = await this.repository.renumberAll()
    await this.cache.invalidatePrefix('destinations:')
    return { items: renumbered }
  }
}
