import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import type { CatalogCache } from '../../lib/catalog-cache.js'
import { notFoundError, validationError } from '../../lib/errors.js'
import {
  deleteWyndhamMediaFile,
  writeWyndhamMediaFile,
} from '../../lib/wyndham-media-storage.js'
import type { WyndhamPageDto } from '../wyndham-page/types.js'
import {
  uploadLogoMediaOp,
  uploadPropertyMediaOp,
  uploadRailCardMedia,
} from './media-ops.js'
import type { AdminWyndhamPageRepository } from './repository.js'
import type {
  AdminWyndhamLogoBody,
  AdminWyndhamPageBody,
  AdminWyndhamPrincipleBody,
  AdminWyndhamPropertyBody,
  AdminWyndhamRailCardBody,
} from './validator.js'

const CACHE_KEY_PREFIX = 'wyndham-page:'

export class AdminWyndhamPageService {
  constructor(
    private readonly repository: AdminWyndhamPageRepository,
    private readonly cache: CatalogCache,
  ) {}

  private async invalidate(): Promise<void> {
    await this.cache.invalidatePrefix(CACHE_KEY_PREFIX)
  }

  private async requirePage(): Promise<WyndhamPageDto> {
    const page = await this.repository.getPage()
    if (!page) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_PAGE_NOT_FOUND)
    }
    return page
  }

  async getPage(): Promise<WyndhamPageDto> {
    return this.requirePage()
  }

  async updatePage(input: AdminWyndhamPageBody): Promise<WyndhamPageDto> {
    await this.requirePage()
    const updated = await this.repository.updatePage(input)
    await this.invalidate()
    return updated
  }

  assertMediaFile(
    file: { mimetype: string; filename?: string; toBuffer: () => Promise<Buffer> } | undefined,
  ) {
    if (!file) {
      throw validationError(API_MESSAGES.ADMIN_WYNDHAM_MEDIA_MISSING, [
        { field: 'file', message: API_MESSAGES.ADMIN_WYNDHAM_MEDIA_MISSING, code: 'required' },
      ])
    }
    return file
  }

  async uploadSlotMedia(
    slotKey: string,
    mime: string,
    buffer: Buffer,
    filename: string,
  ): Promise<WyndhamPageDto> {
    const slot = await this.repository.findSlot(slotKey)
    if (!slot) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_SLOT_NOT_FOUND)
    }
    const written = await writeWyndhamMediaFile(slotKey, mime, buffer, filename)
    await deleteWyndhamMediaFile(slot.mediaUrl)
    await this.repository.updateSlot(slotKey, { mediaUrl: written.mediaUrl })
    await this.invalidate()
    return this.requirePage()
  }

  async removeSlotMedia(slotKey: string): Promise<WyndhamPageDto> {
    const slot = await this.repository.findSlot(slotKey)
    if (!slot) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_SLOT_NOT_FOUND)
    }
    await deleteWyndhamMediaFile(slot.mediaUrl)
    await this.repository.updateSlot(slotKey, { mediaUrl: '' })
    await this.invalidate()
    return this.requirePage()
  }

  async createPrinciple(input: AdminWyndhamPrincipleBody): Promise<WyndhamPageDto> {
    const items = await this.repository.listPrinciples()
    await this.repository.createPrinciple({ ...input, sortOrder: items.length + 1 })
    await this.invalidate()
    return this.requirePage()
  }

  async updatePrinciple(id: string, input: AdminWyndhamPrincipleBody): Promise<WyndhamPageDto> {
    const items = await this.repository.listPrinciples()
    if (!items.some((item) => item.id === id)) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_ITEM_NOT_FOUND)
    }
    await this.repository.updatePrinciple(id, input)
    await this.invalidate()
    return this.requirePage()
  }

  async deletePrinciple(id: string): Promise<WyndhamPageDto> {
    const items = await this.repository.listPrinciples()
    if (!items.some((item) => item.id === id)) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_ITEM_NOT_FOUND)
    }
    await this.repository.deletePrinciple(id)
    await this.invalidate()
    return this.requirePage()
  }

  async movePrinciple(id: string, direction: 'up' | 'down'): Promise<WyndhamPageDto> {
    await this.moveItem('principle', await this.repository.listPrinciples(), id, direction)
    return this.requirePage()
  }

  async createRailCard(input: AdminWyndhamRailCardBody): Promise<WyndhamPageDto> {
    const items = await this.repository.listRailCards()
    await this.repository.createRailCard({ ...input, sortOrder: items.length + 1 })
    await this.invalidate()
    return this.requirePage()
  }

  async updateRailCard(id: string, input: AdminWyndhamRailCardBody): Promise<WyndhamPageDto> {
    if (!(await this.repository.findRailCard(id))) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_ITEM_NOT_FOUND)
    }
    await this.repository.updateRailCard(id, input)
    await this.invalidate()
    return this.requirePage()
  }

  async deleteRailCard(id: string): Promise<WyndhamPageDto> {
    const current = await this.repository.findRailCard(id)
    if (!current) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_ITEM_NOT_FOUND)
    }
    await deleteWyndhamMediaFile(current.mediaUrl)
    await this.repository.deleteRailCard(id)
    await this.invalidate()
    return this.requirePage()
  }

  async moveRailCard(id: string, direction: 'up' | 'down'): Promise<WyndhamPageDto> {
    await this.moveItem('rail', await this.repository.listRailCards(), id, direction)
    return this.requirePage()
  }

  async uploadRailMedia(
    id: string,
    mime: string,
    buffer: Buffer,
    filename: string,
  ): Promise<WyndhamPageDto> {
    await uploadRailCardMedia(this.repository, id, mime, buffer, filename)
    await this.invalidate()
    return this.requirePage()
  }

  async createProperty(input: AdminWyndhamPropertyBody): Promise<WyndhamPageDto> {
    const items = await this.repository.listProperties()
    await this.repository.createProperty({ ...input, sortOrder: items.length + 1 })
    await this.invalidate()
    return this.requirePage()
  }

  async updateProperty(id: string, input: AdminWyndhamPropertyBody): Promise<WyndhamPageDto> {
    if (!(await this.repository.findProperty(id))) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_ITEM_NOT_FOUND)
    }
    await this.repository.updateProperty(id, input)
    await this.invalidate()
    return this.requirePage()
  }

  async deleteProperty(id: string): Promise<WyndhamPageDto> {
    const current = await this.repository.findProperty(id)
    if (!current) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_ITEM_NOT_FOUND)
    }
    await deleteWyndhamMediaFile(current.mediaUrl)
    await this.repository.deleteProperty(id)
    await this.invalidate()
    return this.requirePage()
  }

  async moveProperty(id: string, direction: 'up' | 'down'): Promise<WyndhamPageDto> {
    await this.moveItem('property', await this.repository.listProperties(), id, direction)
    return this.requirePage()
  }

  async uploadPropertyMedia(
    id: string,
    mime: string,
    buffer: Buffer,
    filename: string,
  ): Promise<WyndhamPageDto> {
    await uploadPropertyMediaOp(this.repository, id, mime, buffer, filename)
    await this.invalidate()
    return this.requirePage()
  }

  async createLogo(input: AdminWyndhamLogoBody): Promise<WyndhamPageDto> {
    const items = await this.repository.listLogos()
    await this.repository.createLogo({
      name: input.name,
      href: input.href ?? null,
      mediaUrl: '',
      isEnabled: input.isEnabled,
      sortOrder: items.length + 1,
    })
    await this.invalidate()
    return this.requirePage()
  }

  async updateLogo(id: string, input: AdminWyndhamLogoBody): Promise<WyndhamPageDto> {
    if (!(await this.repository.findLogo(id))) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_ITEM_NOT_FOUND)
    }
    await this.repository.updateLogo(id, {
      name: input.name,
      href: input.href ?? null,
      isEnabled: input.isEnabled,
    })
    await this.invalidate()
    return this.requirePage()
  }

  async uploadLogoMedia(
    id: string,
    mime: string,
    buffer: Buffer,
    filename: string,
  ): Promise<WyndhamPageDto> {
    await uploadLogoMediaOp(this.repository, id, mime, buffer, filename)
    await this.invalidate()
    return this.requirePage()
  }

  async deleteLogo(id: string): Promise<WyndhamPageDto> {
    const current = await this.repository.findLogo(id)
    if (!current) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_ITEM_NOT_FOUND)
    }
    await deleteWyndhamMediaFile(current.mediaUrl)
    await this.repository.deleteLogo(id)
    await this.invalidate()
    return this.requirePage()
  }

  async moveLogo(id: string, direction: 'up' | 'down'): Promise<WyndhamPageDto> {
    await this.moveItem('logo', await this.repository.listLogos(), id, direction)
    return this.requirePage()
  }

  private async moveItem(
    model: 'principle' | 'rail' | 'property' | 'logo',
    items: Array<{ id: string }>,
    id: string,
    direction: 'up' | 'down',
  ): Promise<void> {
    const index = items.findIndex((item) => item.id === id)
    if (index < 0) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_ITEM_NOT_FOUND)
    }
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= items.length) {
      await this.invalidate()
      return
    }
    const current = items[index]
    const neighbor = items[swapIndex]
    if (!current || !neighbor) return
    await this.repository.swapSortOrder(model, current.id, neighbor.id)
    await this.invalidate()
  }
}
