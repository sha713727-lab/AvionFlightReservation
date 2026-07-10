export interface HealthStatus {
  status: 'ok' | 'degraded'
  uptimeSeconds: number
  database: 'up' | 'down'
  timestamp: string
}
