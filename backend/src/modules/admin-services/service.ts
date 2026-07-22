import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import type { CatalogCache } from '../../lib/catalog-cache.js'
import { conflictError, notFoundError, validationError } from '../../lib/errors.js'
import {
  deleteServiceMediaFile,
  writeServiceMediaFile,
} from '../../lib/service-media-storage.js'
import { SERVICE_ICON_KEYS, SERVICE_IMAGE_KEYS } from './constants.js'
import type { AdminServiceRepository } from './repository.js'
import type {
  AdminServiceDto,
  AdminServiceListResult,
  AdminServiceOptionsDto,
  AdminServiceWriteInput,
} from './types.js'

export class AdminServicesService {
  constructor(
    private readonly repository: AdminServiceRepository,
    private readonly cache: CatalogCache,
  ) {}

  getOptions(): AdminServiceOptionsDto {
    return {
      iconKeys: SERVICE_ICON_KEYS,
      imageKeys: SERVICE_IMAGE_KEYS,
    }
  }

  async listServices(): Promise<AdminServiceListResult> {
    const items = await this.repository.findAllOrdered()
    return { items }
  }

  async getService(id: string): Promise<AdminServiceDto> {
    const service = await this.repository.findById(id)
    if (!service) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.SERVICE_NOT_FOUND)
    }
    return service
  }

  async createService(input: AdminServiceWriteInput): Promise<AdminServiceDto> {
    const existing = await this.repository.findBySlug(input.slug)
    if (existing) {
      throw conflictError(
        API_MESSAGES.ADMIN_SERVICE_SLUG_CONFLICT,
        ERROR_CODES.SERVICE_SLUG_CONFLICT,
      )
    }

    const sortOrder = await this.repository.getNextSortOrder()
    const created = await this.repository.create(input, sortOrder)
    await this.cache.invalidatePrefix('services:')
    return created
  }

  async updateService(id: string, input: AdminServiceWriteInput): Promise<AdminServiceDto> {
    const current = await this.repository.findById(id)
    if (!current) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.SERVICE_NOT_FOUND)
    }

    if (input.slug !== current.slug) {
      const existing = await this.repository.findBySlug(input.slug)
      if (existing) {
        throw conflictError(
          API_MESSAGES.ADMIN_SERVICE_SLUG_CONFLICT,
          ERROR_CODES.SERVICE_SLUG_CONFLICT,
        )
      }
    }

    const updated = await this.repository.update(id, input)
    await this.cache.invalidatePrefix('services:')
    return updated
  }

  async deleteService(id: string): Promise<AdminServiceListResult> {
    const current = await this.repository.findById(id)
    if (!current) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.SERVICE_NOT_FOUND)
    }

    await this.repository.deleteById(id)
    await deleteServiceMediaFile(current.mediaUrl)
    const items = await this.repository.renumberAll()
    await this.cache.invalidatePrefix('services:')
    return { items }
  }

  async moveService(id: string, direction: 'up' | 'down'): Promise<AdminServiceListResult> {
    const items = await this.repository.findAllOrdered()
    const index = items.findIndex((item) => item.id === id)
    if (index < 0) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.SERVICE_NOT_FOUND)
    }

    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= items.length) {
      return { items }
    }

    const current = items[index]
    const neighbor = items[swapIndex]
    if (!current || !neighbor) {
      return { items }
    }

    await this.repository.swapSortOrder(current.id, neighbor.id)
    const renumbered = await this.repository.renumberAll()
    await this.cache.invalidatePrefix('services:')
    return { items: renumbered }
  }

  async uploadMedia(
    id: string,
    mime: string,
    buffer: Buffer,
    filename = '',
  ): Promise<AdminServiceDto> {
    const current = await this.repository.findById(id)
    if (!current) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.SERVICE_NOT_FOUND)
    }

    const saved = await writeServiceMediaFile(id, mime, buffer, filename)
    const updated = await this.repository.updateMedia(id, saved)
    await deleteServiceMediaFile(current.mediaUrl)
    await this.cache.invalidatePrefix('services:')
    return updated
  }

  async removeMedia(id: string): Promise<AdminServiceDto> {
    const current = await this.repository.findById(id)
    if (!current) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.SERVICE_NOT_FOUND)
    }

    const updated = await this.repository.clearMedia(id)
    await deleteServiceMediaFile(current.mediaUrl)
    await this.cache.invalidatePrefix('services:')
    return updated
  }

  assertMediaFile(
    file: { mimetype: string; filename?: string; toBuffer: () => Promise<Buffer> } | undefined,
  ) {
    if (!file) {
      throw validationError(API_MESSAGES.ADMIN_SERVICE_MEDIA_MISSING, [
        { field: 'file', message: API_MESSAGES.ADMIN_SERVICE_MEDIA_MISSING, code: 'required' },
      ])
    }
    return file
  }
}
