import type { FastifyInstance } from 'fastify'
import {
  apiErrorResponseSchema,
  healthDataSchema,
  successEnvelopeSchema,
} from '../../constants/openapi-schemas.js'
import { validateRequest } from '../../middleware/validate.js'
import type { HealthController } from './controller.js'
import { healthQuerySchema } from './validator.js'

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
          200: successEnvelopeSchema(healthDataSchema),
          503: apiErrorResponseSchema,
        },
      },
      preHandler: [validateRequest(healthQuerySchema, 'query')],
    },
    (request, reply) => controller.getHealth(request, reply),
  )
}
