import pino from 'pino'
import type { Env } from '../config/env.js'

export function createLogger(env: Env) {
  const isDev = env.NODE_ENV === 'development'

  return pino({
    level: env.LOG_LEVEL,
    transport: isDev
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
          },
        }
      : undefined,
    redact: {
      paths: ['req.headers.authorization', 'DATABASE_URL'],
      remove: true,
    },
  })
}

export type AppLogger = ReturnType<typeof createLogger>
