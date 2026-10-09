import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import type { WyndhamPageController } from './controller.js'

export async function registerWyndhamPageRoutes(
  app: FastifyInstance,
  controller: WyndhamPageController,
): Promise<void> {
  app.get(
    '/wyndham-page',
    {
      config: { rateLimit: { max: 120, timeWindow: '1 minute' } },
      schema: {
        tags: ['Wyndham Page'],
        summary: 'Get published Wyndham hotels landing page',
        response: {
          404: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
    },
    (request, reply) => controller.getPublished(request, reply),
  )
}
