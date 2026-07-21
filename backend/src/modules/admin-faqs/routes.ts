import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import { createRequireAdminAuth } from '../../middleware/require-admin-auth.js'
import { validateRequest } from '../../middleware/validate.js'
import type { AdminAuthService } from '../admin-auth/service.js'
import type { AdminFaqsController } from './controller.js'
import {
  adminFaqBodySchema,
  adminFaqIdParamsSchema,
  adminFaqMoveBodySchema,
  type AdminFaqBody,
  type AdminFaqIdParams,
  type AdminFaqMoveBody,
} from './validator.js'

export async function registerAdminFaqRoutes(
  app: FastifyInstance,
  controller: AdminFaqsController,
  adminAuthService: AdminAuthService,
): Promise<void> {
  const requireAdminAuth = createRequireAdminAuth(adminAuthService)

  app.get(
    '/admin/faqs',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin FAQs'],
        summary: 'List FAQs',
        security: [{ bearerAuth: [] }],
        response: { 401: apiErrorResponseSchema, 429: apiErrorResponseSchema },
      },
      preHandler: [requireAdminAuth],
    },
    (request, reply) => controller.list(request, reply),
  )

  app.get<{ Params: AdminFaqIdParams }>(
    '/admin/faqs/:id',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin FAQs'],
        summary: 'Get FAQ',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          404: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(adminFaqIdParamsSchema, 'params')],
    },
    (request, reply) => controller.getById(request, reply),
  )

  app.post<{ Body: AdminFaqBody }>(
    '/admin/faqs',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin FAQs'],
        summary: 'Create FAQ',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          409: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(adminFaqBodySchema, 'body')],
    },
    (request, reply) => controller.create(request, reply),
  )

  app.put<{ Params: AdminFaqIdParams; Body: AdminFaqBody }>(
    '/admin/faqs/:id',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin FAQs'],
        summary: 'Update FAQ',
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
        validateRequest(adminFaqIdParamsSchema, 'params'),
        validateRequest(adminFaqBodySchema, 'body'),
      ],
    },
    (request, reply) => controller.update(request, reply),
  )

  app.delete<{ Params: AdminFaqIdParams }>(
    '/admin/faqs/:id',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin FAQs'],
        summary: 'Delete FAQ and renumber',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          404: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(adminFaqIdParamsSchema, 'params')],
    },
    (request, reply) => controller.remove(request, reply),
  )

  app.post<{ Params: AdminFaqIdParams; Body: AdminFaqMoveBody }>(
    '/admin/faqs/:id/move',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin FAQs'],
        summary: 'Move FAQ',
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
        validateRequest(adminFaqIdParamsSchema, 'params'),
        validateRequest(adminFaqMoveBodySchema, 'body'),
      ],
    },
    (request, reply) => controller.move(request, reply),
  )
}
