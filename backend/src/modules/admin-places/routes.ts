import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import { createRequireAdminAuth } from '../../middleware/require-admin-auth.js'
import { validateRequest } from '../../middleware/validate.js'
import type { AdminAuthService } from '../admin-auth/service.js'
import type { AdminPlacesController } from './controller.js'
import {
  adminPlaceBodySchema,
  adminPlaceIdParamsSchema,
  adminPlaceListQuerySchema,
  adminPlaceMoveBodySchema,
  type AdminPlaceBody,
  type AdminPlaceIdParams,
  type AdminPlaceListQuery,
  type AdminPlaceMoveBody,
} from './validator.js'

export async function registerAdminPlaceRoutes(
  app: FastifyInstance,
  controller: AdminPlacesController,
  adminAuthService: AdminAuthService,
): Promise<void> {
  const requireAdminAuth = createRequireAdminAuth(adminAuthService)

  app.get<{ Querystring: AdminPlaceListQuery }>(
    '/admin/places',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Places'],
        summary: 'List destination places',
        security: [{ bearerAuth: [] }],
        response: { 401: apiErrorResponseSchema, 429: apiErrorResponseSchema },
      },
      preHandler: [requireAdminAuth, validateRequest(adminPlaceListQuerySchema, 'query')],
    },
    (request, reply) => controller.list(request, reply),
  )

  app.get(
    '/admin/places/options',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Places'],
        summary: 'List destination tier options for places',
        security: [{ bearerAuth: [] }],
        response: { 401: apiErrorResponseSchema, 429: apiErrorResponseSchema },
      },
      preHandler: [requireAdminAuth],
    },
    (request, reply) => controller.options(request, reply),
  )

  app.get<{ Params: AdminPlaceIdParams }>(
    '/admin/places/:id',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Places'],
        summary: 'Get destination place',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          404: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(adminPlaceIdParamsSchema, 'params')],
    },
    (request, reply) => controller.getById(request, reply),
  )

  app.post<{ Body: AdminPlaceBody }>(
    '/admin/places',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Places'],
        summary: 'Create destination place',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          404: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(adminPlaceBodySchema, 'body')],
    },
    (request, reply) => controller.create(request, reply),
  )

  app.put<{ Params: AdminPlaceIdParams; Body: AdminPlaceBody }>(
    '/admin/places/:id',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Places'],
        summary: 'Update destination place',
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
        validateRequest(adminPlaceIdParamsSchema, 'params'),
        validateRequest(adminPlaceBodySchema, 'body'),
      ],
    },
    (request, reply) => controller.update(request, reply),
  )

  app.delete<{ Params: AdminPlaceIdParams; Querystring: AdminPlaceListQuery }>(
    '/admin/places/:id',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Places'],
        summary: 'Delete destination place and renumber within tier',
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
        validateRequest(adminPlaceIdParamsSchema, 'params'),
        validateRequest(adminPlaceListQuerySchema, 'query'),
      ],
    },
    (request, reply) => controller.remove(request, reply),
  )

  app.post<{ Params: AdminPlaceIdParams; Body: AdminPlaceMoveBody }>(
    '/admin/places/:id/move',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Places'],
        summary: 'Move destination place within its tier',
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
        validateRequest(adminPlaceIdParamsSchema, 'params'),
        validateRequest(adminPlaceMoveBodySchema, 'body'),
      ],
    },
    (request, reply) => controller.move(request, reply),
  )

  app.post<{ Params: AdminPlaceIdParams }>(
    '/admin/places/:id/media',
    {
      config: { rateLimit: { max: 20, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Places'],
        summary: 'Upload image or video media for a place',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          404: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(adminPlaceIdParamsSchema, 'params')],
    },
    (request, reply) => controller.uploadMedia(request, reply),
  )

  app.delete<{ Params: AdminPlaceIdParams }>(
    '/admin/places/:id/media',
    {
      config: { rateLimit: { max: 30, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Places'],
        summary: 'Remove uploaded media from a place',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          404: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(adminPlaceIdParamsSchema, 'params')],
    },
    (request, reply) => controller.removeMedia(request, reply),
  )
}
