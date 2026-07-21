import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import { createRequireAdminAuth } from '../../middleware/require-admin-auth.js'
import { validateRequest } from '../../middleware/validate.js'
import type { AdminAuthService } from '../admin-auth/service.js'
import type { AdminCallbacksController } from './controller.js'
import {
  adminCallbackIdParamsSchema,
  adminCallbackListQuerySchema,
  adminCallbackStatusBodySchema,
  type AdminCallbackIdParams,
  type AdminCallbackListQuery,
  type AdminCallbackStatusBody,
} from './validator.js'

export async function registerAdminCallbackRoutes(
  app: FastifyInstance,
  controller: AdminCallbacksController,
  adminAuthService: AdminAuthService,
): Promise<void> {
  const requireAdminAuth = createRequireAdminAuth(adminAuthService)

  app.get<{ Querystring: AdminCallbackListQuery }>(
    '/admin/callbacks',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Callbacks'],
        summary: 'List callback requests',
        security: [{ bearerAuth: [] }],
        response: { 401: apiErrorResponseSchema, 429: apiErrorResponseSchema },
      },
      preHandler: [requireAdminAuth, validateRequest(adminCallbackListQuerySchema, 'query')],
    },
    (request, reply) => controller.list(request, reply),
  )

  app.put<{ Params: AdminCallbackIdParams; Body: AdminCallbackStatusBody }>(
    '/admin/callbacks/:id/status',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Callbacks'],
        summary: 'Update callback request status',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          404: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [
        requireAdminAuth,
        validateRequest(adminCallbackIdParamsSchema, 'params'),
        validateRequest(adminCallbackStatusBodySchema, 'body'),
      ],
    },
    (request, reply) => controller.updateStatus(request, reply),
  )

  app.delete<{ Params: AdminCallbackIdParams }>(
    '/admin/callbacks/:id',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Callbacks'],
        summary: 'Delete a callback request',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          404: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(adminCallbackIdParamsSchema, 'params')],
    },
    (request, reply) => controller.remove(request, reply),
  )
}
