import type { FastifyInstance } from 'fastify'
import {
  apiErrorResponseSchema,
  destinationTierSchema,
  paginatedDataSchema,
  paginationQuerystringSchema,
  slugParamsSchema,
  successEnvelopeSchema,
} from '../../constants/openapi-schemas.js'
import { validateRequest } from '../../middleware/validate.js'
import {
  heavyRateLimitConfig,
  type CatalogRouteOptions,
} from '../../types/routes.js'
import {
  createPaginationQuerySchema,
  type PaginationQuery,
} from '../../validators/pagination.js'
import type { DestinationController } from './controller.js'
import {
  destinationSlugParamsSchema,
  type DestinationSlugParams,
} from './validator.js'

export async function registerDestinationRoutes(
  app: FastifyInstance,
  controller: DestinationController,
  options: CatalogRouteOptions,
): Promise<void> {
  const paginationSchema = createPaginationQuerySchema(
    options.maxPageSize,
    options.defaultPageSize,
  )

  app.get<{ Querystring: PaginationQuery }>(
    '/destinations',
    {
      schema: {
        tags: ['Destinations'],
        summary: 'List active destination tiers',
        querystring: paginationQuerystringSchema,
        response: {
          200: successEnvelopeSchema(paginatedDataSchema(destinationTierSchema)),
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [validateRequest(paginationSchema, 'query')],
    },
    (request, reply) => controller.list(request, reply),
  )

  app.get<{ Params: DestinationSlugParams }>(
    '/destinations/:slug',
    {
      config: heavyRateLimitConfig(options.heavyRateLimit),
      schema: {
        tags: ['Destinations'],
        summary: 'Get a destination tier by slug',
        params: slugParamsSchema,
        response: {
          200: successEnvelopeSchema(destinationTierSchema),
          404: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [validateRequest(destinationSlugParamsSchema, 'params')],
    },
    (request, reply) => controller.getBySlug(request, reply),
  )
}
