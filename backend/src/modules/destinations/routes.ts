import type { FastifyInstance } from 'fastify'
import { validateRequest } from '../../middleware/validate.js'
import { createPaginationQuerySchema } from '../../validators/pagination.js'
import type { DestinationController } from './controller.js'
import { destinationSlugParamsSchema } from './validator.js'

export async function registerDestinationRoutes(
  app: FastifyInstance,
  controller: DestinationController,
  maxPageSize: number,
): Promise<void> {
  const paginationSchema = createPaginationQuerySchema(maxPageSize)

  app.get(
    '/destinations',
    {
      schema: {
        tags: ['Destinations'],
        summary: 'List active destination tiers',
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
      controller.list(
        request as Parameters<DestinationController['list']>[0],
        reply,
      ),
  )

  app.get(
    '/destinations/:slug',
    {
      schema: {
        tags: ['Destinations'],
        summary: 'Get a destination tier by slug',
        params: {
          type: 'object',
          required: ['slug'],
          properties: {
            slug: { type: 'string' },
          },
        },
      },
      preHandler: [validateRequest(destinationSlugParamsSchema, 'params')],
    },
    (request, reply) =>
      controller.getBySlug(
        request as Parameters<DestinationController['getBySlug']>[0],
        reply,
      ),
  )
}
