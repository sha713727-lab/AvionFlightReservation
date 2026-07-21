import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import { createRequireAdminAuth } from '../../middleware/require-admin-auth.js'
import type { AdminAuthService } from '../admin-auth/service.js'
import type { AdminDashboardController } from './controller.js'

export async function registerAdminDashboardRoutes(
  app: FastifyInstance,
  controller: AdminDashboardController,
  adminAuthService: AdminAuthService,
): Promise<void> {
  const requireAdminAuth = createRequireAdminAuth(adminAuthService)

  app.get(
    '/admin/dashboard/summary',
    {
      config: {
        rateLimit: {
          max: 30,
          timeWindow: '1 minute',
        },
      },
      schema: {
        tags: ['Admin Dashboard'],
        summary: 'Get admin dashboard summary',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
          503: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth],
    },
    (request, reply) => controller.getSummary(request, reply),
  )
}
