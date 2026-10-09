import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import type { CatalogCache } from '../../lib/catalog-cache.js'
import { notFoundError, validationError } from '../../lib/errors.js'
import {
  deleteHiltonMediaFile,
  writeHiltonMediaFile,
} from '../../lib/hilton-media-storage.js'
import type { HiltonPageDto } from '../hilton-page/types.js'
import {
  uploadLogoMediaOp,
  uploadPropertyMediaOp,
  uploadRailCardMedia,
} from './media-ops.js'
import type { AdminHiltonPageRepository } from './repository.js'
import type {
  AdminHiltonLogoBody,
  AdminHiltonPageBody,
  AdminHiltonPrincipleBody,
  AdminHiltonPropertyBody,
  AdminHiltonRailCardBody,
} from './validator.js'

const CACHE_KEY_PREFIX = 'hilton-page:'

export class AdminHiltonPageService {
  constructor(
    private readonly repository: AdminHiltonPageRepository,
    private readonly cache: CatalogCache,
  ) {}

  private async invalidate(): Promise<void> {
    await this.cache.invalidatePrefix(CACHE_KEY_PREFIX)
  }

  private async requirePage(): Promise<HiltonPageDto> {
    const page = await this.repository.getPage()
    if (!page) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_PAGE_NOT_FOUND)
    }
    return page
  }

  async getPage(): Promise<HiltonPageDto> {
    return this.requirePage()
  }

  async updatePage(input: AdminHiltonPageBody): Promise<HiltonPageDto> {
    await this.requirePage()
    const updated = await this.repository.updatePage(input)
    await this.invalidate()
    return updated
  }

  assertMediaFile(
    file: { mimetype: string; filename?: string; toBuffer: () => Promise<Buffer> } | undefined,
  ) {
    if (!file) {
      throw validationError(API_MESSAGES.ADMIN_HILTON_MEDIA_MISSING, [
        { field: 'file', message: API_MESSAGES.ADMIN_HILTON_MEDIA_MISSING, code: 'required' },
      ])
    }
    return file
  }

  async uploadSlotMedia(
    slotKey: string,
    mime: string,
    buffer: Buffer,
    filename: string,
  ): Promise<HiltonPageDto> {
    const slot = await this.repository.findSlot(slotKey)
    if (!slot) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_SLOT_NOT_FOUND)
    }
    const written = await writeHiltonMediaFile(slotKey, mime, buffer, filename)
    await deleteHiltonMediaFile(slot.mediaUrl)
    await this.repository.updateSlot(slotKey, { mediaUrl: written.mediaUrl })
    await this.invalidate()
    return this.requirePage()
  }

  async removeSlotMedia(slotKey: string): Promise<HiltonPageDto> {
    const slot = await this.repository.findSlot(slotKey)
    if (!slot) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_SLOT_NOT_FOUND)
    }
    await deleteHiltonMediaFile(slot.mediaUrl)
    await this.repository.updateSlot(slotKey, { mediaUrl: '' })
    await this.invalidate()
    return this.requirePage()
  }

  async createPrinciple(input: AdminHiltonPrincipleBody): Promise<HiltonPageDto> {
    const items = await this.repository.listPrinciples()
    await this.repository.createPrinciple({ ...input, sortOrder: items.length + 1 })
    await this.invalidate()
    return this.requirePage()
  }

  async updatePrinciple(id: string, input: AdminHiltonPrincipleBody): Promise<HiltonPageDto> {
    const items = await this.repository.listPrinciples()
    if (!items.some((item) => item.id === id)) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_ITEM_NOT_FOUND)
    }
    await this.repository.updatePrinciple(id, input)
    await this.invalidate()
    return this.requirePage()
  }

  async deletePrinciple(id: string): Promise<HiltonPageDto> {
    const items = await this.repository.listPrinciples()
    if (!items.some((item) => item.id === id)) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_ITEM_NOT_FOUND)
    }
    await this.repository.deletePrinciple(id)
    await this.invalidate()
    return this.requirePage()
  }

  async movePrinciple(id: string, direction: 'up' | 'down'): Promise<HiltonPageDto> {
    await this.moveItem('principle', await this.repository.listPrinciples(), id, direction)
    return this.requirePage()
  }

  async createRailCard(input: AdminHiltonRailCardBody): Promise<HiltonPageDto> {
    const items = await this.repository.listRailCards()
    await this.repository.createRailCard({ ...input, sortOrder: items.length + 1 })
    await this.invalidate()
    return this.requirePage()
  }

  async updateRailCard(id: string, input: AdminHiltonRailCardBody): Promise<HiltonPageDto> {
    if (!(await this.repository.findRailCard(id))) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_ITEM_NOT_FOUND)
    }
    await this.repository.updateRailCard(id, input)
    await this.invalidate()
    return this.requirePage()
  }

  async deleteRailCard(id: string): Promise<HiltonPageDto> {
    const current = await this.repository.findRailCard(id)
    if (!current) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_ITEM_NOT_FOUND)
    }
    await deleteHiltonMediaFile(current.mediaUrl)
    await this.repository.deleteRailCard(id)
    await this.invalidate()
    return this.requirePage()
  }

  async moveRailCard(id: string, direction: 'up' | 'down'): Promise<HiltonPageDto> {
    await this.moveItem('rail', await this.repository.listRailCards(), id, direction)
    return this.requirePage()
  }

  async uploadRailMedia(
    id: string,
    mime: string,
    buffer: Buffer,
    filename: string,
  ): Promise<HiltonPageDto> {
    await uploadRailCardMedia(this.repository, id, mime, buffer, filename)
    await this.invalidate()
    return this.requirePage()
  }

  async createProperty(input: AdminHiltonPropertyBody): Promise<HiltonPageDto> {
    const items = await this.repository.listProperties()
    await this.repository.createProperty({ ...input, sortOrder: items.length + 1 })
    await this.invalidate()
    return this.requirePage()
  }

  async updateProperty(id: string, input: AdminHiltonPropertyBody): Promise<HiltonPageDto> {
    if (!(await this.repository.findProperty(id))) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_ITEM_NOT_FOUND)
    }
    await this.repository.updateProperty(id, input)
    await this.invalidate()
    return this.requirePage()
  }

  async deleteProperty(id: string): Promise<HiltonPageDto> {
    const current = await this.repository.findProperty(id)
    if (!current) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_ITEM_NOT_FOUND)
    }
    await deleteHiltonMediaFile(current.mediaUrl)
    await this.repository.deleteProperty(id)
    await this.invalidate()
    return this.requirePage()
  }

  async moveProperty(id: string, direction: 'up' | 'down'): Promise<HiltonPageDto> {
    await this.moveItem('property', await this.repository.listProperties(), id, direction)
    return this.requirePage()
  }

  async uploadPropertyMedia(
    id: string,
    mime: string,
    buffer: Buffer,
    filename: string,
  ): Promise<HiltonPageDto> {
    await uploadPropertyMediaOp(this.repository, id, mime, buffer, filename)
    await this.invalidate()
    return this.requirePage()
  }

  async createLogo(input: AdminHiltonLogoBody): Promise<HiltonPageDto> {
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

  async updateLogo(id: string, input: AdminHiltonLogoBody): Promise<HiltonPageDto> {
    if (!(await this.repository.findLogo(id))) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_ITEM_NOT_FOUND)
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
  ): Promise<HiltonPageDto> {
    await uploadLogoMediaOp(this.repository, id, mime, buffer, filename)
    await this.invalidate()
    return this.requirePage()
  }

  async deleteLogo(id: string): Promise<HiltonPageDto> {
    const current = await this.repository.findLogo(id)
    if (!current) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_ITEM_NOT_FOUND)
    }
    await deleteHiltonMediaFile(current.mediaUrl)
    await this.repository.deleteLogo(id)
    await this.invalidate()
    return this.requirePage()
  }

  async moveLogo(id: string, direction: 'up' | 'down'): Promise<HiltonPageDto> {
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
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_ITEM_NOT_FOUND)
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
