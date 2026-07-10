import type { FastifyInstance } from 'fastify'
import { validateRequest } from '../../middleware/validate.js'
import { createPaginationQuerySchema } from '../../validators/pagination.js'
import type { FaqController } from './controller.js'
import { faqSlugParamsSchema } from './validator.js'

export async function registerFaqRoutes(
  app: FastifyInstance,
  controller: FaqController,
  maxPageSize: number,
): Promise<void> {
  const paginationSchema = createPaginationQuerySchema(maxPageSize)

  app.get(
    '/faqs',
    {
      schema: {
        tags: ['FAQs'],
        summary: 'List active FAQs',
        querystring: {
          type: 'object',
          properties: {
            page: { type: 'integer', minimum: 1 },
            pageSize: { type: 'integer', minimum: 1 },
          },
        },
      },
      preHandler: [validateRequest(paginationSchema, 'query')],
    },
    (request, reply) =>
      controller.list(request as Parameters<FaqController['list']>[0], reply),
  )

  app.get(
    '/faqs/:slug',
    {
      schema: {
        tags: ['FAQs'],
        summary: 'Get an FAQ by slug',
        params: {
          type: 'object',
          required: ['slug'],
          properties: {
            slug: { type: 'string' },
          },
        },
      },
      preHandler: [validateRequest(faqSlugParamsSchema, 'params')],
    },
    (request, reply) =>
      controller.getBySlug(
        request as Parameters<FaqController['getBySlug']>[0],
        reply,
      ),
  )
}
