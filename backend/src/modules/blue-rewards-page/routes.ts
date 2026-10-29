import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import type { BlueRewardsPageController } from './controller.js'

export async function registerBlueRewardsPageRoutes(
  app: FastifyInstance,
  controller: BlueRewardsPageController,
): Promise<void> {
  app.get(
    '/blue-rewards-page',
    {
      config: { rateLimit: { max: 120, timeWindow: '1 minute' } },
      schema: {
        tags: ['Blue Rewards Page'],
        summary: 'Get published Blue Rewards landing page',
        response: {
          404: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
    },
    (request, reply) => controller.getPublished(request, reply),
  )
}
