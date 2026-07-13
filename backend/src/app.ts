import Fastify, { type FastifyBaseLogger, type FastifyInstance } from 'fastify'
import compress from '@fastify/compress'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import type { AppContext } from './types/context.js'
import { errorHandler } from './middleware/error-handler.js'
import { registerRoutes } from './routes/index.js'
import { API_PREFIX, HTTP_STATUS } from './constants/http.js'
import {
  CACHE_CONTROL_STALE_WHILE_REVALIDATE_SECONDS,
  SLOW_REQUEST_MS,
} from './constants/performance.js'
import { createEtag, payloadToString } from './lib/catalog-cache.js'

export async function buildApp(context: AppContext): Promise<FastifyInstance> {
  const enableSwagger =
    context.env.ENABLE_SWAGGER && context.env.NODE_ENV !== 'production'

  const app = Fastify({
    loggerInstance: context.logger as FastifyBaseLogger,
    trustProxy: context.env.TRUST_PROXY,
    genReqId: () => crypto.randomUUID(),
  })

  await app.register(helmet, {
    global: true,
    contentSecurityPolicy: enableSwagger
      ? false
      : {
          directives: {
            defaultSrc: ["'none'"],
            frameAncestors: ["'none'"],
          },
        },
  })

  await app.register(cors, {
    origin: context.env.corsOrigins,
    credentials: true,
    methods: ['GET', 'HEAD', 'OPTIONS'],
  })

  if (context.env.ENABLE_COMPRESSION) {
    await app.register(compress, {
      global: true,
      threshold: 1024,
      encodings: ['br', 'gzip', 'deflate'],
    })
  }

  const rateLimitOptions: {
    max: number
    timeWindow: number
    redis?: NonNullable<AppContext['redis']>
    nameSpace: string
    skipOnError: boolean
  } = {
    max: context.env.RATE_LIMIT_MAX,
    timeWindow: context.env.RATE_LIMIT_WINDOW_MS,
    nameSpace: 'avion-rate-limit-',
    skipOnError: true,
  }

  if (context.redis) {
    rateLimitOptions.redis = context.redis
  }

  await app.register(rateLimit, rateLimitOptions)

  if (enableSwagger) {
    await app.register(swagger, {
      openapi: {
        info: {
          title: 'Avion Flight Reservation API',
          description:
            'Public read-only API for marketing content. No auth, admin, or inquiry endpoints.',
          version: '1.0.0',
        },
        servers: [
          {
            url: `http://127.0.0.1:${context.env.PORT}`,
            description: 'Local API host (paths include /api/v1)',
          },
        ],
        tags: [
          { name: 'Health' },
          { name: 'Services' },
          { name: 'Destinations' },
          { name: 'FAQs' },
        ],
      },
    })

    await app.register(swaggerUi, {
      routePrefix: '/docs',
    })
  }

  app.addHook('onSend', async (request, reply, payload) => {
    const isCatalogGet =
      request.method === 'GET' &&
      request.url.startsWith(API_PREFIX) &&
      !request.url.includes('/health')

    if (
      !isCatalogGet ||
      reply.statusCode < 200 ||
      reply.statusCode >= 300
    ) {
      return payload
    }

    const maxAge = context.env.CATALOG_CACHE_MAX_AGE_SECONDS
    reply.header(
      'Cache-Control',
      `public, max-age=${maxAge}, s-maxage=${maxAge}, stale-while-revalidate=${CACHE_CONTROL_STALE_WHILE_REVALIDATE_SECONDS}`,
    )
    reply.header('Vary', 'Accept-Encoding')

    const body = payloadToString(payload)
    if (!body) {
      return payload
    }

    const etag = createEtag(body)
    reply.header('ETag', etag)

    const ifNoneMatch = request.headers['if-none-match']
    if (ifNoneMatch === etag) {
      reply.code(HTTP_STATUS.NOT_MODIFIED)
      return null
    }

    return payload
  })

  app.addHook('onResponse', async (request, reply) => {
    const elapsedMs = reply.elapsedTime
    if (elapsedMs >= SLOW_REQUEST_MS) {
      request.log.warn(
        {
          elapsedMs: Math.round(elapsedMs),
          method: request.method,
          url: request.url,
          statusCode: reply.statusCode,
        },
        'Slow request detected',
      )
    }
  })

  app.setErrorHandler(errorHandler)

  await registerRoutes(app, context)

  return app
}
