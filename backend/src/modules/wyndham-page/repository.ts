import type { DatabaseClient } from '../../database/prisma.js'
import { toWyndhamPageDto, wyndhamPageInclude, type WyndhamPageRow } from './mapper.js'
import type { WyndhamPageDto } from './types.js'

export class WyndhamPageRepository {
  constructor(private readonly db: DatabaseClient) {}

  async findDefault(): Promise<WyndhamPageRow | null> {
    return this.db.wyndhamPage.findUnique({
      where: { id: 'default' },
      include: wyndhamPageInclude,
    })
  }

  async getPublished(): Promise<WyndhamPageDto | null> {
    const row = await this.findDefault()
    if (!row || row.status !== 'published') return null
    return toWyndhamPageDto(row, true)
  }

  async getAdmin(): Promise<WyndhamPageDto | null> {
    const row = await this.findDefault()
    return row ? toWyndhamPageDto(row, false) : null
  }
}
