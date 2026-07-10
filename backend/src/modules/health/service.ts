import type { HealthRepository } from './repository.js'
import type { HealthStatus } from './types.js'

export class HealthService {
  private readonly startedAt = Date.now()

  constructor(private readonly repository: HealthRepository) {}

  async getStatus(): Promise<HealthStatus> {
    const databaseUp = await this.repository.pingDatabase()

    return {
      status: databaseUp ? 'ok' : 'degraded',
      uptimeSeconds: Math.floor((Date.now() - this.startedAt) / 1000),
      database: databaseUp ? 'up' : 'down',
      timestamp: new Date().toISOString(),
    }
  }
}
