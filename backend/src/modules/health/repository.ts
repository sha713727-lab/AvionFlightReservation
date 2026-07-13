import type { DatabaseClient } from '../../database/prisma.js'
import type { AppLogger } from '../../lib/logger.js'

export class HealthRepository {
  constructor(
    private readonly db: DatabaseClient,
    private readonly logger: AppLogger,
  ) {}

  async pingDatabase(): Promise<boolean> {
    try {
      await this.db.$queryRaw`SELECT 1`
      return true
    } catch (error: unknown) {
      this.logger.warn({ err: error }, 'Health database ping failed')
      return false
    }
  }
}
