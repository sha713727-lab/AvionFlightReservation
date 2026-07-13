import { Redis } from 'ioredis'
import type { Env } from '../config/env.js'
import type { AppLogger } from './logger.js'

export function createRateLimitRedis(
  env: Env,
  logger: AppLogger,
): Redis | undefined {
  if (!env.REDIS_URL) {
    return undefined
  }

  const redis = new Redis(env.REDIS_URL, {
    connectTimeout: 1_000,
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    lazyConnect: true,
  })

  redis.on('error', (error: Error) => {
    logger.warn({ err: error }, 'Redis rate-limit client error')
  })

  return redis
}

export async function connectRateLimitRedis(
  redis: Redis | undefined,
  logger: AppLogger,
): Promise<Redis | undefined> {
  if (!redis) {
    return undefined
  }

  try {
    await redis.connect()
    logger.info('Redis rate-limit store connected')
    return redis
  } catch (error) {
    logger.warn(
      { err: error },
      'Redis unavailable; using in-memory rate limits',
    )
    redis.disconnect()
    return undefined
  }
}

export async function disconnectRateLimitRedis(
  redis: Redis | undefined,
): Promise<void> {
  if (!redis) {
    return
  }

  redis.disconnect()
}
