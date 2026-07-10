import Fastify, { type FastifyInstance } from 'fastify'
import compress from '@fastify/compress'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import type { AppContext } from './types/context.js'
import { errorHandler } from './middleware/error-handler.js'
import { registerRoutes } from './routes/index.js'
import { API_PREFIX } from './constants/http.js'

export async function buildApp(context: AppContext): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      level: context.env.LOG_LEVEL,
      transport:
        context.env.NODE_ENV === 'development'
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
    },
    trustProxy: true,
    genReqId: () => crypto.randomUUID(),
  })

  await app.register(helmet, {
    global: true,
    contentSecurityPolicy: false,
  })

  await app.register(cors, {
    origin: context.env.corsOrigins,
    credentials: true,
    methods: ['GET', 'HEAD', 'OPTIONS'],
  })

  await app.register(compress, {
    global: true,
    threshold: 1024,
    encodings: ['br', 'gzip', 'deflate'],
  })

  await app.register(rateLimit, {
    max: context.env.RATE_LIMIT_MAX,
    timeWindow: context.env.RATE_LIMIT_WINDOW_MS,
  })

  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Avion Flight Reservation API',
        description:
          'Public read-only API for marketing content. No auth, admin, or inquiry endpoints.',
        version: '1.0.0',
      },
      servers: [{ url: API_PREFIX }],
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

  app.setErrorHandler(errorHandler)

  await registerRoutes(app, context)

  return app
}
