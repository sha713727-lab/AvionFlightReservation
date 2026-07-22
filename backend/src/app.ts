import Fastify, { type FastifyBaseLogger, type FastifyInstance } from 'fastify'
import compress from '@fastify/compress'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import multipart from '@fastify/multipart'
import rateLimit from '@fastify/rate-limit'
import fastifyStatic from '@fastify/static'
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
import { ensurePlaceUploadsDir } from './lib/place-media-storage.js'
import { ensureServiceUploadsDir, UPLOADS_ROOT } from './lib/service-media-storage.js'

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
    crossOriginResourcePolicy: { policy: 'cross-origin' },
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
    methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  })

  await app.register(multipart, {
    limits: {
      files: 1,
      fileSize: 50 * 1024 * 1024,
    },
  })

  await ensureServiceUploadsDir()
  await ensurePlaceUploadsDir()
  await app.register(fastifyStatic, {
    root: UPLOADS_ROOT,
    prefix: '/uploads/',
    decorateReply: false,
    // Avoid gzip on binaries — @fastify/compress + static can 502 through nginx.
    setHeaders: (res, _pathName) => {
      const raw = res as unknown as {
        setHeader: (name: string, value: string) => void
      }
      raw.setHeader('x-no-compression', 'true')
      raw.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400')
    },
  })

  if (context.env.ENABLE_COMPRESSION) {
    await app.register(compress, {
      global: true,
      // Keep small JSON payloads uncompressed — brotli/gzip on short admin
      // responses caused premature-close / undecodable bodies in browsers.
      threshold: 10_240,
      encodings: ['gzip', 'deflate'],
    })
  }

  const isDevelopment = context.env.NODE_ENV === 'development'
  const rateLimitMax = isDevelopment
    ? Math.max(context.env.RATE_LIMIT_MAX, 5_000)
    : context.env.RATE_LIMIT_MAX
  const rateLimitWindowMs = isDevelopment
    ? Math.min(context.env.RATE_LIMIT_WINDOW_MS, 60_000)
    : context.env.RATE_LIMIT_WINDOW_MS

  const rateLimitOptions: {
    max: number
    timeWindow: number
    redis?: NonNullable<AppContext['redis']>
    nameSpace: string
    skipOnError: boolean
    allowList: (request: { url: string }) => boolean
  } = {
    max: rateLimitMax,
    timeWindow: rateLimitWindowMs,
    nameSpace: 'avion-rate-limit-',
    skipOnError: true,
    allowList: (request) => request.url.startsWith('/uploads/'),
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
            'Public catalog API plus protected admin operations endpoints.',
          version: '1.0.0',
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'HMAC',
            },
          },
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
          { name: 'Admin Auth' },
          { name: 'Admin Dashboard' },
          { name: 'Admin Services' },
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
      !request.url.includes('/health') &&
      !request.url.includes('/admin')

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
