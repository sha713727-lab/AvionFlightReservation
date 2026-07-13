export type HeavyRateLimitConfig = {
  max: number
  timeWindow: number
}

export type CatalogRouteOptions = {
  maxPageSize: number
  defaultPageSize: number
  heavyRateLimit: HeavyRateLimitConfig
}

export function heavyRateLimitConfig(options: HeavyRateLimitConfig) {
  return {
    rateLimit: {
      max: options.max,
      timeWindow: options.timeWindow,
    },
  }
}
