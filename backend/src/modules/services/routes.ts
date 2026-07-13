import type { FastifyInstance } from 'fastify'
import {
  apiErrorResponseSchema,
  paginatedDataSchema,
  paginationQuerystringSchema,
  serviceItemSchema,
  slugParamsSchema,
  successEnvelopeSchema,
} from '../../constants/openapi-schemas.js'
import { validateRequest } from '../../middleware/validate.js'
import {
  heavyRateLimitConfig,
  type CatalogRouteOptions,
} from '../../types/routes.js'
import { createPaginationQuerySchema } from '../../validators/pagination.js'
import type { PaginationQuery } from '../../validators/pagination.js'
import type { ServiceController } from './controller.js'
import { serviceSlugParamsSchema, type ServiceSlugParams } from './validator.js'

export async function registerServiceRoutes(
  app: FastifyInstance,
  controller: ServiceController,
  options: CatalogRouteOptions,
): Promise<void> {
  const paginationSchema = createPaginationQuerySchema(
    options.maxPageSize,
    options.defaultPageSize,
  )

  app.get<{ Querystring: PaginationQuery }>(
    '/services',
    {
      schema: {
        tags: ['Services'],
        summary: 'List active travel services',
        querystring: paginationQuerystringSchema,
        response: {
          200: successEnvelopeSchema(paginatedDataSchema(serviceItemSchema)),
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [validateRequest(paginationSchema, 'query')],
    },
    (request, reply) => controller.list(request, reply),
  )

  app.get<{ Params: ServiceSlugParams }>(
    '/services/:slug',
    {
      config: heavyRateLimitConfig(options.heavyRateLimit),
      schema: {
        tags: ['Services'],
        summary: 'Get a service by slug',
        params: slugParamsSchema,
        response: {
          200: successEnvelopeSchema(serviceItemSchema),
          404: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [validateRequest(serviceSlugParamsSchema, 'params')],
    },
    (request, reply) => controller.getBySlug(request, reply),
  )
}
