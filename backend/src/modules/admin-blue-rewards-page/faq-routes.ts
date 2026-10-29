import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import { createRequireAdminAuth } from '../../middleware/require-admin-auth.js'
import { validateRequest } from '../../middleware/validate.js'
import type { AdminAuthService } from '../admin-auth/service.js'
import type { AdminBlueRewardsFaqController } from './faq-controller.js'
import {
  adminBlueRewardsFaqBodySchema,
  adminBlueRewardsItemIdParamsSchema,
  adminBlueRewardsMoveBodySchema,
  type AdminBlueRewardsFaqBody,
  type AdminBlueRewardsItemIdParams,
  type AdminBlueRewardsMoveBody,
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

export async function registerAdminBlueRewardsFaqRoutes(
  app: FastifyInstance,
  controller: AdminBlueRewardsFaqController,
  adminAuthService: AdminAuthService,
): Promise<void> {
  const auth = createRequireAdminAuth(adminAuthService)
  const rate = { rateLimit: { max: 60, timeWindow: '1 minute' as const } }
  const base = {
    config: rate,
    schema: { tags: ['Admin Blue Rewards Page'], security: [{ bearerAuth: [] }], response: err },
    preHandler: [auth],
  }

  app.post<{ Body: AdminBlueRewardsFaqBody }>(
    '/admin/blue-rewards-page/faqs',
    {
      ...base,
      preHandler: [auth, validateRequest(adminBlueRewardsFaqBodySchema, 'body')],
    },
    (req, reply) => controller.create(req, reply),
  )

  app.put<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsFaqBody }>(
    '/admin/blue-rewards-page/faqs/:id',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminBlueRewardsItemIdParamsSchema, 'params'),
        validateRequest(adminBlueRewardsFaqBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.update(req, reply),
  )

  app.delete<{ Params: AdminBlueRewardsItemIdParams }>(
    '/admin/blue-rewards-page/faqs/:id',
    {
      ...base,
      preHandler: [auth, validateRequest(adminBlueRewardsItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.delete(req, reply),
  )

  app.post<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsMoveBody }>(
    '/admin/blue-rewards-page/faqs/:id/move',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminBlueRewardsItemIdParamsSchema, 'params'),
        validateRequest(adminBlueRewardsMoveBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.move(req, reply),
  )
}
