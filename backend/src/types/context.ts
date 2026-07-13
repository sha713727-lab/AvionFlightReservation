import type { Redis } from 'ioredis'
import type { Env } from '../config/env.js'
import type { DatabaseClient } from '../database/prisma.js'
import type { CatalogCache } from '../lib/catalog-cache.js'
import type { AppLogger } from '../lib/logger.js'

export interface AppContext {
  env: Env & { corsOrigins: string[] }
  logger: AppLogger
  db: DatabaseClient
  catalogCache: CatalogCache
  redis?: Redis
}
