import type { DatabaseClient } from '../../database/prisma.js'

export class HealthRepository {
  constructor(private readonly db: DatabaseClient) {}

  async pingDatabase(): Promise<boolean> {
    try {
      await this.db.$queryRaw`SELECT 1`
      return true
    } catch {
      return false
    }
  }
}
