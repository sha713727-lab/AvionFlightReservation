import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import { createRequireAdminAuth } from '../../middleware/require-admin-auth.js'
import { validateRequest } from '../../middleware/validate.js'
import type { AdminAuthService } from '../admin-auth/service.js'
import type { AdminWyndhamFaqController } from './faq-controller.js'
import {
  adminWyndhamFaqBodySchema,
  adminWyndhamItemIdParamsSchema,
  adminWyndhamMoveBodySchema,
  type AdminWyndhamFaqBody,
  type AdminWyndhamItemIdParams,
  type AdminWyndhamMoveBody,
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

export async function registerAdminWyndhamFaqRoutes(
  app: FastifyInstance,
  controller: AdminWyndhamFaqController,
  adminAuthService: AdminAuthService,
): Promise<void> {
  const auth = createRequireAdminAuth(adminAuthService)
  const rate = { rateLimit: { max: 60, timeWindow: '1 minute' as const } }
  const base = {
    config: rate,
    schema: { tags: ['Admin Wyndham Page'], security: [{ bearerAuth: [] }], response: err },
    preHandler: [auth],
  }

  app.post<{ Body: AdminWyndhamFaqBody }>(
    '/admin/wyndham-page/faqs',
    {
      ...base,
      preHandler: [auth, validateRequest(adminWyndhamFaqBodySchema, 'body')],
    },
    (req, reply) => controller.create(req, reply),
  )

  app.put<{ Params: AdminWyndhamItemIdParams; Body: AdminWyndhamFaqBody }>(
    '/admin/wyndham-page/faqs/:id',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminWyndhamItemIdParamsSchema, 'params'),
        validateRequest(adminWyndhamFaqBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.update(req, reply),
  )

  app.delete<{ Params: AdminWyndhamItemIdParams }>(
    '/admin/wyndham-page/faqs/:id',
    {
      ...base,
      preHandler: [auth, validateRequest(adminWyndhamItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.delete(req, reply),
  )

  app.post<{ Params: AdminWyndhamItemIdParams; Body: AdminWyndhamMoveBody }>(
    '/admin/wyndham-page/faqs/:id/move',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminWyndhamItemIdParamsSchema, 'params'),
        validateRequest(adminWyndhamMoveBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.move(req, reply),
  )
}
