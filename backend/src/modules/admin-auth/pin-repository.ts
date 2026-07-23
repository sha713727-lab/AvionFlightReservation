import type { DatabaseClient } from '../../database/prisma.js'

const SETTINGS_ID = 'default'
const DEFAULT_EMAIL = 'reservation@aviosupportdesk.com'
const DEFAULT_PHONES = ['+1 877 702 9887']

export class AdminPinRepository {
  constructor(private readonly db: DatabaseClient) {}

  async getPinHash(): Promise<string | null> {
    const row = await this.db.siteSettings.findUnique({
      where: { id: SETTINGS_ID },
      select: { adminPinHash: true },
    })
    return row?.adminPinHash ?? null
  }

  async setPinHash(adminPinHash: string): Promise<void> {
    await this.db.siteSettings.upsert({
      where: { id: SETTINGS_ID },
      create: {
        id: SETTINGS_ID,
        reservationEmail: DEFAULT_EMAIL,
        supportPhones: DEFAULT_PHONES,
        adminPinHash,
      },
      update: { adminPinHash },
    })
  }
}
