import { PrismaClient } from '@prisma/client'
import type { Env } from '../config/env.js'
import type { AppLogger } from '../lib/logger.js'

const SLOW_QUERY_MS = 500

export function createPrismaClient(logger: AppLogger, env: Env): PrismaClient {
  const enableQueryEvents = env.NODE_ENV === 'development'

  const prisma = new PrismaClient({
    log: enableQueryEvents
      ? [
          { emit: 'event', level: 'query' },
          { emit: 'event', level: 'error' },
          { emit: 'event', level: 'warn' },
        ]
      : [
          { emit: 'event', level: 'error' },
          { emit: 'event', level: 'warn' },
        ],
  })

  if (enableQueryEvents) {
    prisma.$on('query', (event) => {
      if (event.duration >= SLOW_QUERY_MS) {
        logger.warn(
          {
            durationMs: event.duration,
            query: event.query,
          },
          'Slow database query detected',
        )
      }
    })
  }

  prisma.$on('error', (event) => {
    logger.error({ message: event.message }, 'Prisma error')
  })

  prisma.$on('warn', (event) => {
    logger.warn({ message: event.message }, 'Prisma warning')
  })

  return prisma
}

export type DatabaseClient = PrismaClient
