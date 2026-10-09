import type { DatabaseClient } from '../../database/prisma.js'
import { toHiltonPageDto, hiltonPageInclude, type HiltonPageRow } from './mapper.js'
import type { HiltonPageDto } from './types.js'

export class HiltonPageRepository {
  constructor(private readonly db: DatabaseClient) {}

  async findDefault(): Promise<HiltonPageRow | null> {
    return this.db.hiltonPage.findUnique({
      where: { id: 'default' },
      include: hiltonPageInclude,
    })
  }

  async getPublished(): Promise<HiltonPageDto | null> {
    const row = await this.findDefault()
    if (!row || row.status !== 'published') return null
    return toHiltonPageDto(row, true)
  }

  async getAdmin(): Promise<HiltonPageDto | null> {
    const row = await this.findDefault()
    return row ? toHiltonPageDto(row, false) : null
  }
}
