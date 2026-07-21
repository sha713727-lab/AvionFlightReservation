import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import { validateRequest } from '../../middleware/validate.js'
import type { CallbackRequestController } from './controller.js'
import {
  callbackRequestBodySchema,
  type CallbackRequestBody,
} from './validator.js'

export async function registerCallbackRoutes(
  app: FastifyInstance,
  controller: CallbackRequestController,
): Promise<void> {
  app.post<{ Body: CallbackRequestBody }>(
    '/callbacks',
    {
      config: { rateLimit: { max: 10, timeWindow: '1 minute' } },
      schema: {
        tags: ['Callbacks'],
        summary: 'Submit a callback request',
        response: {
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [validateRequest(callbackRequestBodySchema, 'body')],
    },
    (request, reply) => controller.create(request, reply),
  )
}
