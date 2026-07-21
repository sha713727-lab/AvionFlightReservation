import type { DatabaseClient } from '../../database/prisma.js'
import type { ContactSettingsDto, ContactSettingsWriteInput } from './types.js'

const SETTINGS_ID = 'default'
const DEFAULT_EMAIL = 'reservation@aviosupportdesk.com'
const DEFAULT_PHONES = ['+1 877 702 9887']

function parsePhones(value: unknown): string[] {
  if (!Array.isArray(value)) return [...DEFAULT_PHONES]
  const phones = value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean)
  return phones.length > 0 ? phones : [...DEFAULT_PHONES]
}

export class SettingsRepository {
  constructor(private readonly db: DatabaseClient) {}

  async getContact(): Promise<ContactSettingsDto> {
    const row = await this.db.siteSettings.upsert({
      where: { id: SETTINGS_ID },
      create: {
        id: SETTINGS_ID,
        reservationEmail: DEFAULT_EMAIL,
        supportPhones: DEFAULT_PHONES,
      },
      update: {},
    })
    return {
      reservationEmail: row.reservationEmail,
      supportPhones: parsePhones(row.supportPhones),
      updatedAt: row.updatedAt.toISOString(),
    }
  }

  async updateContact(input: ContactSettingsWriteInput): Promise<ContactSettingsDto> {
    const row = await this.db.siteSettings.upsert({
      where: { id: SETTINGS_ID },
      create: {
        id: SETTINGS_ID,
        reservationEmail: input.reservationEmail,
        supportPhones: input.supportPhones,
      },
      update: {
        reservationEmail: input.reservationEmail,
        supportPhones: input.supportPhones,
      },
    })
    return {
      reservationEmail: row.reservationEmail,
      supportPhones: parsePhones(row.supportPhones),
      updatedAt: row.updatedAt.toISOString(),
    }
  }
}
