import type { DatabaseClient } from '../../database/prisma.js'
import type { ContactSettingsDto, ContactSettingsWriteInput } from './types.js'

const SETTINGS_ID = 'default'
const DEFAULT_EMAIL = 'reservation@aviosupportdesk.com'
const CANONICAL_PHONE = '+1 877 702 9887'
const CANONICAL_DIGITS = '18777029887'
const DEFAULT_PHONES = [CANONICAL_PHONE]

function digits(value: string): string {
  return value.replace(/\D/g, '')
}

function canonicalizePhones(value: unknown): string[] {
  const extras: string[] = []
  const seen = new Set<string>([CANONICAL_DIGITS])
  if (Array.isArray(value)) {
    for (const item of value) {
      if (typeof item !== 'string') continue
      const trimmed = item.trim()
      if (!trimmed) continue
      const key = digits(trimmed)
      if (!key || seen.has(key)) continue
      seen.add(key)
      extras.push(trimmed)
    }
  }
  return [CANONICAL_PHONE, ...extras]
}

function phonesNeedPersist(stored: unknown, canonical: string[]): boolean {
  if (!Array.isArray(stored)) return true
  if (stored.length !== canonical.length) return true
  return stored.some((item, index) => item !== canonical[index])
}

function toDto(row: {
  reservationEmail: string
  supportPhones: unknown
  callbacksEnabled: boolean
  updatedAt: Date
}): ContactSettingsDto {
  return {
    reservationEmail: row.reservationEmail,
    supportPhones: canonicalizePhones(row.supportPhones),
    callbacksEnabled: row.callbacksEnabled,
    updatedAt: row.updatedAt.toISOString(),
  }
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
        callbacksEnabled: false,
      },
      update: {},
    })
    const phones = canonicalizePhones(row.supportPhones)
    if (phonesNeedPersist(row.supportPhones, phones)) {
      const updated = await this.db.siteSettings.update({
        where: { id: SETTINGS_ID },
        data: { supportPhones: phones },
      })
      return toDto(updated)
    }
    return toDto(row)
  }

  async updateContact(input: ContactSettingsWriteInput): Promise<ContactSettingsDto> {
    const phones = canonicalizePhones(input.supportPhones)
    const row = await this.db.siteSettings.upsert({
      where: { id: SETTINGS_ID },
      create: {
        id: SETTINGS_ID,
        reservationEmail: input.reservationEmail,
        supportPhones: phones,
        callbacksEnabled: input.callbacksEnabled ?? false,
      },
      update: {
        reservationEmail: input.reservationEmail,
        supportPhones: phones,
        ...(input.callbacksEnabled !== undefined
          ? { callbacksEnabled: input.callbacksEnabled }
          : {}),
      },
    })
    return toDto(row)
  }
}
