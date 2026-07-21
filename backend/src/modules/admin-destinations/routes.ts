import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import { createRequireAdminAuth } from '../../middleware/require-admin-auth.js'
import { validateRequest } from '../../middleware/validate.js'
import type { AdminAuthService } from '../admin-auth/service.js'
import type { AdminDestinationsController } from './controller.js'
import {
  adminDestinationBodySchema,
  adminDestinationIdParamsSchema,
  adminDestinationMoveBodySchema,
  type AdminDestinationBody,
  type AdminDestinationIdParams,
  type AdminDestinationMoveBody,
} from './validator.js'

export async function registerAdminDestinationRoutes(
  app: FastifyInstance,
  controller: AdminDestinationsController,
  adminAuthService: AdminAuthService,
): Promise<void> {
  const requireAdminAuth = createRequireAdminAuth(adminAuthService)

  app.get(
    '/admin/destinations',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Destinations'],
        summary: 'List destination tiers',
        security: [{ bearerAuth: [] }],
        response: { 401: apiErrorResponseSchema, 429: apiErrorResponseSchema },
      },
      preHandler: [requireAdminAuth],
    },
    (request, reply) => controller.list(request, reply),
  )

  app.get<{ Params: AdminDestinationIdParams }>(
    '/admin/destinations/:id',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Destinations'],
        summary: 'Get destination tier',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          404: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(adminDestinationIdParamsSchema, 'params')],
    },
    (request, reply) => controller.getById(request, reply),
  )

  app.post<{ Body: AdminDestinationBody }>(
    '/admin/destinations',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Destinations'],
        summary: 'Create destination tier',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          409: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(adminDestinationBodySchema, 'body')],
    },
    (request, reply) => controller.create(request, reply),
  )

  app.put<{ Params: AdminDestinationIdParams; Body: AdminDestinationBody }>(
    '/admin/destinations/:id',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Destinations'],
        summary: 'Update destination tier',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          404: apiErrorResponseSchema,
          409: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [
        requireAdminAuth,
        validateRequest(adminDestinationIdParamsSchema, 'params'),
        validateRequest(adminDestinationBodySchema, 'body'),
      ],
    },
    (request, reply) => controller.update(request, reply),
  )

  app.delete<{ Params: AdminDestinationIdParams }>(
    '/admin/destinations/:id',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Destinations'],
        summary: 'Delete destination tier and renumber',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          404: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(adminDestinationIdParamsSchema, 'params')],
    },
    (request, reply) => controller.remove(request, reply),
  )

  app.post<{ Params: AdminDestinationIdParams; Body: AdminDestinationMoveBody }>(
    '/admin/destinations/:id/move',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Destinations'],
        summary: 'Move destination tier',
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
        validateRequest(adminDestinationIdParamsSchema, 'params'),
        validateRequest(adminDestinationMoveBodySchema, 'body'),
      ],
    },
    (request, reply) => controller.move(request, reply),
  )
}
