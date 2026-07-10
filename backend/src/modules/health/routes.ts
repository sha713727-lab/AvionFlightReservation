import type { FastifyInstance } from 'fastify'
import type { HealthController } from './controller.js'

export async function registerHealthRoutes(
  app: FastifyInstance,
  controller: HealthController,
): Promise<void> {
  app.get(
    '/health',
    {
      schema: {
        tags: ['Health'],
        summary: 'API health check',
        response: {
          200: {
            type: 'object',
            additionalProperties: true,
          },
          500: {
            type: 'object',
            additionalProperties: true,
          },
        },
      },
    },
    (request, reply) => controller.getHealth(request, reply),
  )
}
