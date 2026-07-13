import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { FastifyInstance } from 'fastify'
import { buildApp } from '../src/app.js'
import { loadEnv } from '../src/config/env.js'
import { createPrismaClient } from '../src/database/prisma.js'
import { CatalogCache } from '../src/lib/catalog-cache.js'
import { createLogger } from '../src/lib/logger.js'
import { API_PREFIX } from '../src/constants/http.js'
import type { AppContext } from '../src/types/context.js'

describe('API smoke', () => {
  let app: FastifyInstance
  let context: AppContext
  let databaseReady = false

  beforeAll(async () => {
    process.env.NODE_ENV = 'test'
    process.env.ENABLE_SWAGGER = 'false'
    process.env.ENABLE_COMPRESSION = 'false'

    const env = loadEnv()
    const logger = createLogger(env)
    const db = createPrismaClient(logger, env)
    const catalogCache = new CatalogCache(
      env.CATALOG_CACHE_MAX_AGE_SECONDS,
      logger,
      undefined,
      env.ENABLE_CATALOG_CACHE,
    )
    context = { env, logger, db, catalogCache }
    app = await buildApp(context)
    await app.ready()

    try {
      await db.$queryRaw`SELECT 1`
      databaseReady = true
    } catch {
      databaseReady = false
    }
  })

  afterAll(async () => {
    await app.close()
    await context.db.$disconnect()
  })

  it('returns health payload with cache observability', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `${API_PREFIX}/health`,
    })

    expect(response.statusCode).toBeLessThan(600)
    const body = response.json() as {
      success: boolean
      data?: {
        status?: string
        rateLimitStore?: string
        catalogCacheStore?: string
      }
    }
    expect(body).toHaveProperty('success')
    expect(body).toHaveProperty('data')
    expect(body.data?.rateLimitStore).toBe('memory')
    expect(body.data?.catalogCacheStore).toBe('memory')
  })

  it('lists services with cache headers and ETag 304', async ({ skip }) => {
    if (!databaseReady) {
      skip()
    }

    const first = await app.inject({
      method: 'GET',
      url: `${API_PREFIX}/services`,
    })

    expect(first.statusCode).toBe(200)
    expect(first.headers['cache-control']).toContain('s-maxage=')
    expect(first.headers.etag).toBeTypeOf('string')

    const body = first.json() as {
      success: boolean
      data: unknown
    }
    expect(body.success).toBe(true)
    expect(body.data).toBeDefined()

    const second = await app.inject({
      method: 'GET',
      url: `${API_PREFIX}/services`,
      headers: {
        'if-none-match': String(first.headers.etag),
      },
    })

    expect(second.statusCode).toBe(304)
  })

  it('lists destinations when database is available', async ({ skip }) => {
    if (!databaseReady) {
      skip()
    }

    const response = await app.inject({
      method: 'GET',
      url: `${API_PREFIX}/destinations`,
    })

    expect(response.statusCode).toBe(200)
    const body = response.json() as { success: boolean }
    expect(body.success).toBe(true)
  })

  it('lists faqs when database is available', async ({ skip }) => {
    if (!databaseReady) {
      skip()
    }

    const response = await app.inject({
      method: 'GET',
      url: `${API_PREFIX}/faqs`,
    })

    expect(response.statusCode).toBe(200)
    const body = response.json() as { success: boolean }
    expect(body.success).toBe(true)
  })
})
