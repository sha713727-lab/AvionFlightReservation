import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import { createRequireAdminAuth } from '../../middleware/require-admin-auth.js'
import { validateRequest } from '../../middleware/validate.js'
import type { AdminAuthService } from '../admin-auth/service.js'
import type { AdminServicesController } from './controller.js'
import {
  adminServiceBodySchema,
  adminServiceIdParamsSchema,
  adminServiceMoveBodySchema,
  type AdminServiceBody,
  type AdminServiceIdParams,
  type AdminServiceMoveBody,
} from './validator.js'

export async function registerAdminServicesRoutes(
  app: FastifyInstance,
  controller: AdminServicesController,
  adminAuthService: AdminAuthService,
): Promise<void> {
  const requireAdminAuth = createRequireAdminAuth(adminAuthService)

  app.get(
    '/admin/services/options',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Services'],
        summary: 'List service icon and image options',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth],
    },
    (request, reply) => controller.options(request, reply),
  )

  app.get(
    '/admin/services',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Services'],
        summary: 'List all services for admin',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth],
    },
    (request, reply) => controller.list(request, reply),
  )

  app.get<{ Params: AdminServiceIdParams }>(
    '/admin/services/:id',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Services'],
        summary: 'Get one service for admin',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          404: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(adminServiceIdParamsSchema, 'params')],
    },
    (request, reply) => controller.getById(request, reply),
  )

  app.post<{ Body: AdminServiceBody }>(
    '/admin/services',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Services'],
        summary: 'Create a service',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          409: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(adminServiceBodySchema, 'body')],
    },
    (request, reply) => controller.create(request, reply),
  )

  app.put<{ Params: AdminServiceIdParams; Body: AdminServiceBody }>(
    '/admin/services/:id',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Services'],
        summary: 'Update a service',
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
        validateRequest(adminServiceIdParamsSchema, 'params'),
        validateRequest(adminServiceBodySchema, 'body'),
      ],
    },
    (request, reply) => controller.update(request, reply),
  )

  app.delete<{ Params: AdminServiceIdParams }>(
    '/admin/services/:id',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Services'],
        summary: 'Delete a service and renumber the catalog',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          404: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(adminServiceIdParamsSchema, 'params')],
    },
    (request, reply) => controller.remove(request, reply),
  )

  app.post<{ Params: AdminServiceIdParams; Body: AdminServiceMoveBody }>(
    '/admin/services/:id/move',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Services'],
        summary: 'Move a service up or down in display order',
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
        validateRequest(adminServiceIdParamsSchema, 'params'),
        validateRequest(adminServiceMoveBodySchema, 'body'),
      ],
    },
    (request, reply) => controller.move(request, reply),
  )

  app.post<{ Params: AdminServiceIdParams }>(
    '/admin/services/:id/media',
    {
      config: { rateLimit: { max: 20, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Services'],
        summary: 'Upload image or video media for a service',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          404: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(adminServiceIdParamsSchema, 'params')],
    },
    (request, reply) => controller.uploadMedia(request, reply),
  )

  app.delete<{ Params: AdminServiceIdParams }>(
    '/admin/services/:id/media',
    {
      config: { rateLimit: { max: 30, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Services'],
        summary: 'Remove uploaded media from a service',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          404: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(adminServiceIdParamsSchema, 'params')],
    },
    (request, reply) => controller.removeMedia(request, reply),
  )
}
