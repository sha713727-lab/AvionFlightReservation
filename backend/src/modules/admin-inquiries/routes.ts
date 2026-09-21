import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import { createRequireAdminAuth } from '../../middleware/require-admin-auth.js'
import { validateRequest } from '../../middleware/validate.js'
import type { AdminAuthService } from '../admin-auth/service.js'
import type { AdminInquiriesController } from './controller.js'
import {
  adminInquiryIdParamsSchema,
  adminInquiryListQuerySchema,
  adminInquiryStatusBodySchema,
  type AdminInquiryIdParams,
  type AdminInquiryListQuery,
  type AdminInquiryStatusBody,
} from './validator.js'

export async function registerAdminInquiryRoutes(
  app: FastifyInstance,
  controller: AdminInquiriesController,
  adminAuthService: AdminAuthService,
): Promise<void> {
  const requireAdminAuth = createRequireAdminAuth(adminAuthService)

  app.get<{ Querystring: AdminInquiryListQuery }>(
    '/admin/inquiries',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Inquiries'],
        summary: 'List inquiry requests',
        security: [{ bearerAuth: [] }],
        response: { 401: apiErrorResponseSchema, 429: apiErrorResponseSchema },
      },
      preHandler: [requireAdminAuth, validateRequest(adminInquiryListQuerySchema, 'query')],
    },
    (request, reply) => controller.list(request, reply),
  )

  app.put<{ Params: AdminInquiryIdParams; Body: AdminInquiryStatusBody }>(
    '/admin/inquiries/:id/status',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Inquiries'],
        summary: 'Update inquiry request status',
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
        validateRequest(adminInquiryIdParamsSchema, 'params'),
        validateRequest(adminInquiryStatusBodySchema, 'body'),
      ],
    },
    (request, reply) => controller.updateStatus(request, reply),
  )

  app.delete<{ Params: AdminInquiryIdParams }>(
    '/admin/inquiries/:id',
    {
      config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Inquiries'],
        summary: 'Delete an inquiry request',
        security: [{ bearerAuth: [] }],
        response: {
          401: apiErrorResponseSchema,
          404: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(adminInquiryIdParamsSchema, 'params')],
    },
    (request, reply) => controller.remove(request, reply),
  )
}
