import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import type { HiltonPageController } from './controller.js'

export async function registerHiltonPageRoutes(
  app: FastifyInstance,
  controller: HiltonPageController,
): Promise<void> {
  app.get(
    '/hilton-page',
    {
      config: { rateLimit: { max: 120, timeWindow: '1 minute' } },
      schema: {
        tags: ['Hilton Page'],
        summary: 'Get published Hilton hotels landing page',
        response: {
          404: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
    },
    (request, reply) => controller.getPublished(request, reply),
  )
}
