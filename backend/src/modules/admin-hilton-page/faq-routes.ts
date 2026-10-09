import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import { createRequireAdminAuth } from '../../middleware/require-admin-auth.js'
import { validateRequest } from '../../middleware/validate.js'
import type { AdminAuthService } from '../admin-auth/service.js'
import type { AdminHiltonFaqController } from './faq-controller.js'
import {
  adminHiltonFaqBodySchema,
  adminHiltonItemIdParamsSchema,
  adminHiltonMoveBodySchema,
  type AdminHiltonFaqBody,
  type AdminHiltonItemIdParams,
  type AdminHiltonMoveBody,
} from './validator.js'

const pageResponse = { type: 'object', additionalProperties: true }
const err = {
  200: pageResponse,
  201: pageResponse,
  401: apiErrorResponseSchema,
  404: apiErrorResponseSchema,
  422: apiErrorResponseSchema,
  429: apiErrorResponseSchema,
}

export async function registerAdminHiltonFaqRoutes(
  app: FastifyInstance,
  controller: AdminHiltonFaqController,
  adminAuthService: AdminAuthService,
): Promise<void> {
  const auth = createRequireAdminAuth(adminAuthService)
  const rate = { rateLimit: { max: 60, timeWindow: '1 minute' as const } }
  const base = {
    config: rate,
    schema: { tags: ['Admin Hilton Page'], security: [{ bearerAuth: [] }], response: err },
    preHandler: [auth],
  }

  app.post<{ Body: AdminHiltonFaqBody }>(
    '/admin/hilton-page/faqs',
    {
      ...base,
      preHandler: [auth, validateRequest(adminHiltonFaqBodySchema, 'body')],
    },
    (req, reply) => controller.create(req, reply),
  )

  app.put<{ Params: AdminHiltonItemIdParams; Body: AdminHiltonFaqBody }>(
    '/admin/hilton-page/faqs/:id',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminHiltonItemIdParamsSchema, 'params'),
        validateRequest(adminHiltonFaqBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.update(req, reply),
  )

  app.delete<{ Params: AdminHiltonItemIdParams }>(
    '/admin/hilton-page/faqs/:id',
    {
      ...base,
      preHandler: [auth, validateRequest(adminHiltonItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.delete(req, reply),
  )

  app.post<{ Params: AdminHiltonItemIdParams; Body: AdminHiltonMoveBody }>(
    '/admin/hilton-page/faqs/:id/move',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminHiltonItemIdParamsSchema, 'params'),
        validateRequest(adminHiltonMoveBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.move(req, reply),
  )
}
