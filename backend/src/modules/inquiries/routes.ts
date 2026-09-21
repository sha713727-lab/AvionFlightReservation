import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import { validateRequest } from '../../middleware/validate.js'
import type { InquiryRequestController } from './controller.js'
import { inquiryRequestBodySchema, type InquiryRequestBody } from './validator.js'

export async function registerInquiryRoutes(
  app: FastifyInstance,
  controller: InquiryRequestController,
): Promise<void> {
  app.post<{ Body: InquiryRequestBody }>(
    '/inquiries',
    {
      config: { rateLimit: { max: 10, timeWindow: '1 minute' } },
      schema: {
        tags: ['Inquiries'],
        summary: 'Submit a contact inquiry',
        response: {
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [validateRequest(inquiryRequestBodySchema, 'body')],
    },
    (request, reply) => controller.create(request, reply),
  )
}
