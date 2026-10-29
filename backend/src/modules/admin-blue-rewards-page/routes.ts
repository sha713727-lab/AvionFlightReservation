import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import { createRequireAdminAuth } from '../../middleware/require-admin-auth.js'
import { validateRequest } from '../../middleware/validate.js'
import type { AdminAuthService } from '../admin-auth/service.js'
import type { AdminBlueRewardsPageController } from './controller.js'
import {
  adminBlueRewardsItemIdParamsSchema,
  adminBlueRewardsLogoBodySchema,
  adminBlueRewardsMoveBodySchema,
  adminBlueRewardsPageBodySchema,
  adminBlueRewardsPrincipleBodySchema,
  adminBlueRewardsPropertyBodySchema,
  adminBlueRewardsRailCardBodySchema,
  adminBlueRewardsSlotParamsSchema,
  type AdminBlueRewardsItemIdParams,
  type AdminBlueRewardsLogoBody,
  type AdminBlueRewardsMoveBody,
  type AdminBlueRewardsPageBody,
  type AdminBlueRewardsPrincipleBody,
  type AdminBlueRewardsPropertyBody,
  type AdminBlueRewardsRailCardBody,
  type AdminBlueRewardsSlotParams,
} from './validator.js'

const err = {
  401: apiErrorResponseSchema,
  404: apiErrorResponseSchema,
  422: apiErrorResponseSchema,
  429: apiErrorResponseSchema,
}

export async function registerAdminBlueRewardsPageRoutes(
  app: FastifyInstance,
  controller: AdminBlueRewardsPageController,
  adminAuthService: AdminAuthService,
): Promise<void> {
  const auth = createRequireAdminAuth(adminAuthService)
  const rate = { rateLimit: { max: 60, timeWindow: '1 minute' as const } }
  const base = {
    config: rate,
    schema: { tags: ['Admin Blue Rewards Page'], security: [{ bearerAuth: [] }], response: err },
    preHandler: [auth],
  }

  app.get('/admin/blue-rewards-page', base, (req, reply) => controller.getPage(req, reply))

  app.put<{ Body: AdminBlueRewardsPageBody }>(
    '/admin/blue-rewards-page',
    {
      ...base,
      preHandler: [auth, validateRequest(adminBlueRewardsPageBodySchema, 'body')],
    },
    (req, reply) => controller.updatePage(req, reply),
  )

  app.post<{ Params: AdminBlueRewardsSlotParams }>(
    '/admin/blue-rewards-page/media/:slotKey',
    {
      ...base,
      preHandler: [auth, validateRequest(adminBlueRewardsSlotParamsSchema, 'params')],
    },
    (req, reply) => controller.uploadSlotMedia(req, reply),
  )

  app.delete<{ Params: AdminBlueRewardsSlotParams }>(
    '/admin/blue-rewards-page/media/:slotKey',
    {
      ...base,
      preHandler: [auth, validateRequest(adminBlueRewardsSlotParamsSchema, 'params')],
    },
    (req, reply) => controller.removeSlotMedia(req, reply),
  )

  app.post<{ Body: AdminBlueRewardsPrincipleBody }>(
    '/admin/blue-rewards-page/principles',
    {
      ...base,
      preHandler: [auth, validateRequest(adminBlueRewardsPrincipleBodySchema, 'body')],
    },
    (req, reply) => controller.createPrinciple(req, reply),
  )

  app.put<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsPrincipleBody }>(
    '/admin/blue-rewards-page/principles/:id',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminBlueRewardsItemIdParamsSchema, 'params'),
        validateRequest(adminBlueRewardsPrincipleBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.updatePrinciple(req, reply),
  )

  app.delete<{ Params: AdminBlueRewardsItemIdParams }>(
    '/admin/blue-rewards-page/principles/:id',
    {
      ...base,
      preHandler: [auth, validateRequest(adminBlueRewardsItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.deletePrinciple(req, reply),
  )

  app.post<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsMoveBody }>(
    '/admin/blue-rewards-page/principles/:id/move',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminBlueRewardsItemIdParamsSchema, 'params'),
        validateRequest(adminBlueRewardsMoveBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.movePrinciple(req, reply),
  )

  app.post<{ Body: AdminBlueRewardsRailCardBody }>(
    '/admin/blue-rewards-page/rail-cards',
    {
      ...base,
      preHandler: [auth, validateRequest(adminBlueRewardsRailCardBodySchema, 'body')],
    },
    (req, reply) => controller.createRailCard(req, reply),
  )

  app.put<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsRailCardBody }>(
    '/admin/blue-rewards-page/rail-cards/:id',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminBlueRewardsItemIdParamsSchema, 'params'),
        validateRequest(adminBlueRewardsRailCardBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.updateRailCard(req, reply),
  )

  app.delete<{ Params: AdminBlueRewardsItemIdParams }>(
    '/admin/blue-rewards-page/rail-cards/:id',
    {
      ...base,
      preHandler: [auth, validateRequest(adminBlueRewardsItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.deleteRailCard(req, reply),
  )

  app.post<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsMoveBody }>(
    '/admin/blue-rewards-page/rail-cards/:id/move',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminBlueRewardsItemIdParamsSchema, 'params'),
        validateRequest(adminBlueRewardsMoveBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.moveRailCard(req, reply),
  )

  app.post<{ Params: AdminBlueRewardsItemIdParams }>(
    '/admin/blue-rewards-page/rail-cards/:id/media',
    {
      ...base,
      preHandler: [auth, validateRequest(adminBlueRewardsItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.uploadRailMedia(req, reply),
  )

  app.post<{ Body: AdminBlueRewardsPropertyBody }>(
    '/admin/blue-rewards-page/properties',
    {
      ...base,
      preHandler: [auth, validateRequest(adminBlueRewardsPropertyBodySchema, 'body')],
    },
    (req, reply) => controller.createProperty(req, reply),
  )

  app.put<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsPropertyBody }>(
    '/admin/blue-rewards-page/properties/:id',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminBlueRewardsItemIdParamsSchema, 'params'),
        validateRequest(adminBlueRewardsPropertyBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.updateProperty(req, reply),
  )

  app.delete<{ Params: AdminBlueRewardsItemIdParams }>(
    '/admin/blue-rewards-page/properties/:id',
    {
      ...base,
      preHandler: [auth, validateRequest(adminBlueRewardsItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.deleteProperty(req, reply),
  )

  app.post<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsMoveBody }>(
    '/admin/blue-rewards-page/properties/:id/move',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminBlueRewardsItemIdParamsSchema, 'params'),
        validateRequest(adminBlueRewardsMoveBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.moveProperty(req, reply),
  )

  app.post<{ Params: AdminBlueRewardsItemIdParams }>(
    '/admin/blue-rewards-page/properties/:id/media',
    {
      ...base,
      preHandler: [auth, validateRequest(adminBlueRewardsItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.uploadPropertyMedia(req, reply),
  )

  app.post<{ Body: AdminBlueRewardsLogoBody }>(
    '/admin/blue-rewards-page/logos',
    {
      ...base,
      preHandler: [auth, validateRequest(adminBlueRewardsLogoBodySchema, 'body')],
    },
    (req, reply) => controller.createLogo(req, reply),
  )

  app.put<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsLogoBody }>(
    '/admin/blue-rewards-page/logos/:id',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminBlueRewardsItemIdParamsSchema, 'params'),
        validateRequest(adminBlueRewardsLogoBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.updateLogo(req, reply),
  )

  app.delete<{ Params: AdminBlueRewardsItemIdParams }>(
    '/admin/blue-rewards-page/logos/:id',
    {
      ...base,
      preHandler: [auth, validateRequest(adminBlueRewardsItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.deleteLogo(req, reply),
  )

  app.post<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsMoveBody }>(
    '/admin/blue-rewards-page/logos/:id/move',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminBlueRewardsItemIdParamsSchema, 'params'),
        validateRequest(adminBlueRewardsMoveBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.moveLogo(req, reply),
  )

  app.post<{ Params: AdminBlueRewardsItemIdParams }>(
    '/admin/blue-rewards-page/logos/:id/media',
    {
      ...base,
      preHandler: [auth, validateRequest(adminBlueRewardsItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.uploadLogoMedia(req, reply),
  )
}
