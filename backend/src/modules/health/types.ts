export interface HealthStatus {
  status: 'ok' | 'degraded'
  uptimeSeconds: number
  database: 'up' | 'down'
  rateLimitStore: 'redis' | 'memory'
  catalogCacheStore: 'redis' | 'memory'
  catalogCacheHits: number
  catalogCacheMisses: number
  timestamp: string
}
