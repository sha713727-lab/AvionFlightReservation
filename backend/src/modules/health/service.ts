import type { CatalogCache } from '../../lib/catalog-cache.js'
import type { HealthRepository } from './repository.js'
import type { HealthStatus } from './types.js'

export class HealthService {
  private readonly startedAt = Date.now()

  constructor(
    private readonly repository: HealthRepository,
    private readonly catalogCache: CatalogCache,
    private readonly rateLimitStore: 'redis' | 'memory',
  ) {}

  async getStatus(): Promise<HealthStatus> {
    const databaseUp = await this.repository.pingDatabase()
    const cacheStats = this.catalogCache.getStats()

    return {
      status: databaseUp ? 'ok' : 'degraded',
      uptimeSeconds: Math.floor((Date.now() - this.startedAt) / 1000),
      database: databaseUp ? 'up' : 'down',
      rateLimitStore: this.rateLimitStore,
      catalogCacheStore: cacheStats.store,
      catalogCacheHits: cacheStats.hits,
      catalogCacheMisses: cacheStats.misses,
      timestamp: new Date().toISOString(),
    }
  }
}
