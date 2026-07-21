import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import { createRequireAdminAuth } from '../../middleware/require-admin-auth.js'
import { validateRequest } from '../../middleware/validate.js'
import type { AdminAuthService } from '../admin-auth/service.js'
import type { SettingsController } from './controller.js'
import {
  contactSettingsBodySchema,
  type ContactSettingsBody,
} from './validator.js'

export async function registerSettingsRoutes(
  app: FastifyInstance,
  controller: SettingsController,
  adminAuthService: AdminAuthService,
): Promise<void> {
  const requireAdminAuth = createRequireAdminAuth(adminAuthService)

  app.get(
    '/settings/contact',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Settings'],
        summary: 'Get public contact settings',
        response: { 429: apiErrorResponseSchema },
      },
    },
    (request, reply) => controller.getContact(request, reply),
  )

  app.get(
    '/admin/settings/contact',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Settings'],
        summary: 'Get contact settings for admin',
        security: [{ bearerAuth: [] }],
        response: { 401: apiErrorResponseSchema, 429: apiErrorResponseSchema },
      },
      preHandler: [requireAdminAuth],
    },
    (request, reply) => controller.getContact(request, reply),
  )

  app.put<{ Body: ContactSettingsBody }>(
    '/admin/settings/contact',
    {
      config: { rateLimit: { max: 30, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Settings'],
        summary: 'Update contact email',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(contactSettingsBodySchema, 'body')],
    },
    (request, reply) => controller.updateContact(request, reply),
  )
}
