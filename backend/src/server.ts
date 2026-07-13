import 'dotenv/config'
import { loadEnv } from './config/env.js'
import { createPrismaClient } from './database/prisma.js'
import { CatalogCache } from './lib/catalog-cache.js'
import { createLogger } from './lib/logger.js'
import {
  connectRateLimitRedis,
  createRateLimitRedis,
  disconnectRateLimitRedis,
} from './lib/redis.js'
import { buildApp } from './app.js'
import type { AppContext } from './types/context.js'

async function main(): Promise<void> {
  const env = loadEnv()
  const logger = createLogger(env)
  const db = createPrismaClient(logger, env)
  const redisClient = createRateLimitRedis(env, logger)
  const redis = await connectRateLimitRedis(redisClient, logger)

  const catalogCache = new CatalogCache(
    env.CATALOG_CACHE_MAX_AGE_SECONDS,
    logger,
    redis,
    env.ENABLE_CATALOG_CACHE,
  )

  const context: AppContext = { env, logger, db, catalogCache, redis }
  const app = await buildApp(context)

  const shutdown = async (signal: string): Promise<void> => {
    logger.info({ signal }, 'Shutting down API')
    await app.close()
    await disconnectRateLimitRedis(redis ?? redisClient)
    await db.$disconnect()
    process.exit(0)
  }

  process.on('SIGINT', () => {
    void shutdown('SIGINT')
  })
  process.on('SIGTERM', () => {
    void shutdown('SIGTERM')
  })

  try {
    const previousLevel = app.log.level
    app.log.level = 'error'
    await app.listen({ port: env.PORT, host: env.HOST })
    app.log.level = previousLevel

    const store = redis ? 'redis' : 'memory'
    logger.info(
      `Avion API ready · http://127.0.0.1:${env.PORT} · docs /docs · rate-limit ${store} · catalog-cache ${store}`,
    )
  } catch (error) {
    logger.error({ err: error }, 'Failed to start API')
    await disconnectRateLimitRedis(redis ?? redisClient)
    await db.$disconnect()
    process.exit(1)
  }
}

void main()
