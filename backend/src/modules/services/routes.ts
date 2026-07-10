import type { FastifyInstance } from 'fastify'
import { createPaginationQuerySchema } from '../../validators/pagination.js'
import { validateRequest } from '../../middleware/validate.js'
import type { ServiceController } from './controller.js'
import { serviceSlugParamsSchema } from './validator.js'

export async function registerServiceRoutes(
  app: FastifyInstance,
  controller: ServiceController,
  maxPageSize: number,
): Promise<void> {
  const paginationSchema = createPaginationQuerySchema(maxPageSize)

  app.get(
    '/services',
    {
      schema: {
        tags: ['Services'],
        summary: 'List active travel services',
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
        request as Parameters<ServiceController['list']>[0],
        reply,
      ),
  )

  app.get(
    '/services/:slug',
    {
      schema: {
        tags: ['Services'],
        summary: 'Get a service by slug',
        params: {
          type: 'object',
          required: ['slug'],
          properties: {
            slug: { type: 'string' },
          },
        },
      },
      preHandler: [validateRequest(serviceSlugParamsSchema, 'params')],
    },
    (request, reply) =>
      controller.getBySlug(
        request as Parameters<ServiceController['getBySlug']>[0],
        reply,
      ),
  )
}
