import 'dotenv/config'
import { loadEnv } from './config/env.js'
import { createPrismaClient } from './database/prisma.js'
import { createLogger } from './lib/logger.js'
import { buildApp } from './app.js'
import type { AppContext } from './types/context.js'

async function main(): Promise<void> {
  const env = loadEnv()
  const logger = createLogger(env)
  const db = createPrismaClient(logger)

  const context: AppContext = { env, logger, db }
  const app = await buildApp(context)

  const shutdown = async (signal: string): Promise<void> => {
    logger.info({ signal }, 'Shutting down API')
    await app.close()
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
    await app.listen({ port: env.PORT, host: env.HOST })
    logger.info(
      { port: env.PORT, host: env.HOST, docs: '/docs' },
      'Avion API started',
    )
  } catch (error) {
    logger.error({ err: error }, 'Failed to start API')
    await db.$disconnect()
    process.exit(1)
  }
}

void main()
