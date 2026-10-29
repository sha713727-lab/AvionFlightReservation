import type { DatabaseClient } from '../../database/prisma.js'
import { toBlueRewardsPageDto, blueRewardsPageInclude, type BlueRewardsPageRow } from './mapper.js'
import type { BlueRewardsPageDto } from './types.js'

export class BlueRewardsPageRepository {
  constructor(private readonly db: DatabaseClient) {}

  async findDefault(): Promise<BlueRewardsPageRow | null> {
    return this.db.blueRewardsPage.findUnique({
      where: { id: 'default' },
      include: blueRewardsPageInclude,
    })
  }

  async getPublished(): Promise<BlueRewardsPageDto | null> {
    const row = await this.findDefault()
    if (!row || row.status !== 'published') return null
    return toBlueRewardsPageDto(row, true)
  }

  async getAdmin(): Promise<BlueRewardsPageDto | null> {
    const row = await this.findDefault()
    return row ? toBlueRewardsPageDto(row, false) : null
  }
}
