import type { FastifyInstance } from 'fastify'
import {
  apiErrorResponseSchema,
  faqItemSchema,
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
import type { FaqController } from './controller.js'
import { faqSlugParamsSchema, type FaqSlugParams } from './validator.js'

export async function registerFaqRoutes(
  app: FastifyInstance,
  controller: FaqController,
  options: CatalogRouteOptions,
): Promise<void> {
  const paginationSchema = createPaginationQuerySchema(
    options.maxPageSize,
    options.defaultPageSize,
  )

  app.get<{ Querystring: PaginationQuery }>(
    '/faqs',
    {
      schema: {
        tags: ['FAQs'],
        summary: 'List active FAQs',
        querystring: paginationQuerystringSchema,
        response: {
          200: successEnvelopeSchema(paginatedDataSchema(faqItemSchema)),
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [validateRequest(paginationSchema, 'query')],
    },
    (request, reply) => controller.list(request, reply),
  )

  app.get<{ Params: FaqSlugParams }>(
    '/faqs/:slug',
    {
      config: heavyRateLimitConfig(options.heavyRateLimit),
      schema: {
        tags: ['FAQs'],
        summary: 'Get an FAQ by slug',
        params: slugParamsSchema,
        response: {
          200: successEnvelopeSchema(faqItemSchema),
          404: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [validateRequest(faqSlugParamsSchema, 'params')],
    },
    (request, reply) => controller.getBySlug(request, reply),
  )
}
