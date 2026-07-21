import type { CatalogCache } from '../../lib/catalog-cache.js'
import type { SettingsRepository } from './repository.js'
import type { ContactSettingsDto, ContactSettingsWriteInput } from './types.js'

const CONTACT_CACHE_KEY = 'settings:contact'

export class SettingsService {
  constructor(
    private readonly repository: SettingsRepository,
    private readonly cache: CatalogCache,
  ) {}

  async getContact(): Promise<ContactSettingsDto> {
    const cached = await this.cache.get<ContactSettingsDto>(CONTACT_CACHE_KEY)
    if (cached) return cached
    const data = await this.repository.getContact()
    await this.cache.set(CONTACT_CACHE_KEY, data)
    return data
  }

  async updateContact(input: ContactSettingsWriteInput): Promise<ContactSettingsDto> {
    const data = await this.repository.updateContact(input)
    await this.cache.invalidatePrefix('settings:')
    return data
  }
}
