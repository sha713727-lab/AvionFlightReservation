import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import type { CatalogCache } from '../../lib/catalog-cache.js'
import { notFoundError, validationError } from '../../lib/errors.js'
import {
  deletePlaceMediaFile,
  writePlaceMediaFile,
} from '../../lib/place-media-storage.js'
import type { AdminPlaceRepository } from './repository.js'
import type {
  AdminPlaceDto,
  AdminPlaceListResult,
  AdminPlaceOptionsResult,
  AdminPlaceWriteInput,
} from './types.js'

export class AdminPlacesService {
  constructor(
    private readonly repository: AdminPlaceRepository,
    private readonly cache: CatalogCache,
  ) {}

  async list(tierId?: string): Promise<AdminPlaceListResult> {
    return { items: await this.repository.findAllOrdered(tierId) }
  }

  async options(): Promise<AdminPlaceOptionsResult> {
    return this.repository.listTierOptions()
  }

  async getById(id: string): Promise<AdminPlaceDto> {
    const item = await this.repository.findById(id)
    if (!item) throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.PLACE_NOT_FOUND)
    return item
  }

  async create(input: AdminPlaceWriteInput): Promise<AdminPlaceDto> {
    const tierOk = await this.repository.tierExists(input.tierId)
    if (!tierOk) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.DESTINATION_NOT_FOUND)
    }
    const created = await this.repository.create(
      input,
      await this.repository.getNextSortOrder(input.tierId),
    )
    await this.cache.invalidatePrefix('destinations:')
    return created
  }

  async update(id: string, input: AdminPlaceWriteInput): Promise<AdminPlaceDto> {
    const current = await this.repository.findById(id)
    if (!current) throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.PLACE_NOT_FOUND)

    const tierOk = await this.repository.tierExists(input.tierId)
    if (!tierOk) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.DESTINATION_NOT_FOUND)
    }

    const tierChanged = current.tierId !== input.tierId
    await this.repository.update(
      id,
      tierChanged
        ? {
            ...input,
            sortOrder: await this.repository.getNextSortOrder(input.tierId),
          }
        : input,
    )

    if (tierChanged) {
      await this.repository.renumberWithinTier([current.tierId, input.tierId])
    }

    await this.cache.invalidatePrefix('destinations:')
    const refreshed = await this.repository.findById(id)
    if (!refreshed) throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.PLACE_NOT_FOUND)
    return refreshed
  }

  async remove(id: string, listTierId?: string): Promise<AdminPlaceListResult> {
    const current = await this.repository.findById(id)
    if (!current) throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.PLACE_NOT_FOUND)
    await this.repository.deleteById(id)
    await deletePlaceMediaFile(current.mediaUrl)
    await this.repository.renumberWithinTier([current.tierId])
    await this.cache.invalidatePrefix('destinations:')
    return { items: await this.repository.findAllOrdered(listTierId) }
  }

  async move(id: string, direction: 'up' | 'down'): Promise<AdminPlaceListResult> {
    const current = await this.repository.findById(id)
    if (!current) throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.PLACE_NOT_FOUND)

    const siblings = await this.repository.findAllOrdered(current.tierId)
    const index = siblings.findIndex((item) => item.id === id)
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (index < 0 || swapIndex < 0 || swapIndex >= siblings.length) {
      return { items: await this.repository.findAllOrdered() }
    }

    const neighbor = siblings[swapIndex]
    if (!neighbor) return { items: await this.repository.findAllOrdered() }

    await this.repository.swapSortOrder(current.id, neighbor.id)
    await this.repository.renumberWithinTier([current.tierId])
    await this.cache.invalidatePrefix('destinations:')
    return { items: await this.repository.findAllOrdered() }
  }

  async uploadMedia(id: string, mime: string, buffer: Buffer): Promise<AdminPlaceDto> {
    const current = await this.repository.findById(id)
    if (!current) throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.PLACE_NOT_FOUND)

    const saved = await writePlaceMediaFile(id, mime, buffer)
    const updated = await this.repository.updateMedia(id, saved)
    await deletePlaceMediaFile(current.mediaUrl)
    await this.cache.invalidatePrefix('destinations:')
    return updated
  }

  async removeMedia(id: string): Promise<AdminPlaceDto> {
    const current = await this.repository.findById(id)
    if (!current) throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.PLACE_NOT_FOUND)

    const updated = await this.repository.clearMedia(id)
    await deletePlaceMediaFile(current.mediaUrl)
    await this.cache.invalidatePrefix('destinations:')
    return updated
  }

  assertMediaFile(file: { mimetype: string; toBuffer: () => Promise<Buffer> } | undefined) {
    if (!file) {
      throw validationError(API_MESSAGES.ADMIN_PLACE_MEDIA_MISSING, [
        { field: 'file', message: API_MESSAGES.ADMIN_PLACE_MEDIA_MISSING, code: 'required' },
      ])
    }
    return file
  }
}
