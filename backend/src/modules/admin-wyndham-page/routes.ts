import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import { createRequireAdminAuth } from '../../middleware/require-admin-auth.js'
import { validateRequest } from '../../middleware/validate.js'
import type { AdminAuthService } from '../admin-auth/service.js'
import type { AdminWyndhamPageController } from './controller.js'
import {
  adminWyndhamItemIdParamsSchema,
  adminWyndhamLogoBodySchema,
  adminWyndhamMoveBodySchema,
  adminWyndhamPageBodySchema,
  adminWyndhamPrincipleBodySchema,
  adminWyndhamPropertyBodySchema,
  adminWyndhamRailCardBodySchema,
  adminWyndhamSlotParamsSchema,
  type AdminWyndhamItemIdParams,
  type AdminWyndhamLogoBody,
  type AdminWyndhamMoveBody,
  type AdminWyndhamPageBody,
  type AdminWyndhamPrincipleBody,
  type AdminWyndhamPropertyBody,
  type AdminWyndhamRailCardBody,
  type AdminWyndhamSlotParams,
} from './validator.js'

const err = {
  401: apiErrorResponseSchema,
  404: apiErrorResponseSchema,
  422: apiErrorResponseSchema,
  429: apiErrorResponseSchema,
}

export async function registerAdminWyndhamPageRoutes(
  app: FastifyInstance,
  controller: AdminWyndhamPageController,
  adminAuthService: AdminAuthService,
): Promise<void> {
  const auth = createRequireAdminAuth(adminAuthService)
  const rate = { rateLimit: { max: 60, timeWindow: '1 minute' as const } }
  const base = {
    config: rate,
    schema: { tags: ['Admin Wyndham Page'], security: [{ bearerAuth: [] }], response: err },
    preHandler: [auth],
  }

  app.get('/admin/wyndham-page', base, (req, reply) => controller.getPage(req, reply))

  app.put<{ Body: AdminWyndhamPageBody }>(
    '/admin/wyndham-page',
    {
      ...base,
      preHandler: [auth, validateRequest(adminWyndhamPageBodySchema, 'body')],
    },
    (req, reply) => controller.updatePage(req, reply),
  )

  app.post<{ Params: AdminWyndhamSlotParams }>(
    '/admin/wyndham-page/media/:slotKey',
    {
      ...base,
      preHandler: [auth, validateRequest(adminWyndhamSlotParamsSchema, 'params')],
    },
    (req, reply) => controller.uploadSlotMedia(req, reply),
  )

  app.delete<{ Params: AdminWyndhamSlotParams }>(
    '/admin/wyndham-page/media/:slotKey',
    {
      ...base,
      preHandler: [auth, validateRequest(adminWyndhamSlotParamsSchema, 'params')],
    },
    (req, reply) => controller.removeSlotMedia(req, reply),
  )

  app.post<{ Body: AdminWyndhamPrincipleBody }>(
    '/admin/wyndham-page/principles',
    {
      ...base,
      preHandler: [auth, validateRequest(adminWyndhamPrincipleBodySchema, 'body')],
    },
    (req, reply) => controller.createPrinciple(req, reply),
  )

  app.put<{ Params: AdminWyndhamItemIdParams; Body: AdminWyndhamPrincipleBody }>(
    '/admin/wyndham-page/principles/:id',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminWyndhamItemIdParamsSchema, 'params'),
        validateRequest(adminWyndhamPrincipleBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.updatePrinciple(req, reply),
  )

  app.delete<{ Params: AdminWyndhamItemIdParams }>(
    '/admin/wyndham-page/principles/:id',
    {
      ...base,
      preHandler: [auth, validateRequest(adminWyndhamItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.deletePrinciple(req, reply),
  )

  app.post<{ Params: AdminWyndhamItemIdParams; Body: AdminWyndhamMoveBody }>(
    '/admin/wyndham-page/principles/:id/move',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminWyndhamItemIdParamsSchema, 'params'),
        validateRequest(adminWyndhamMoveBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.movePrinciple(req, reply),
  )

  app.post<{ Body: AdminWyndhamRailCardBody }>(
    '/admin/wyndham-page/rail-cards',
    {
      ...base,
      preHandler: [auth, validateRequest(adminWyndhamRailCardBodySchema, 'body')],
    },
    (req, reply) => controller.createRailCard(req, reply),
  )

  app.put<{ Params: AdminWyndhamItemIdParams; Body: AdminWyndhamRailCardBody }>(
    '/admin/wyndham-page/rail-cards/:id',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminWyndhamItemIdParamsSchema, 'params'),
        validateRequest(adminWyndhamRailCardBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.updateRailCard(req, reply),
  )

  app.delete<{ Params: AdminWyndhamItemIdParams }>(
    '/admin/wyndham-page/rail-cards/:id',
    {
      ...base,
      preHandler: [auth, validateRequest(adminWyndhamItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.deleteRailCard(req, reply),
  )

  app.post<{ Params: AdminWyndhamItemIdParams; Body: AdminWyndhamMoveBody }>(
    '/admin/wyndham-page/rail-cards/:id/move',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminWyndhamItemIdParamsSchema, 'params'),
        validateRequest(adminWyndhamMoveBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.moveRailCard(req, reply),
  )

  app.post<{ Params: AdminWyndhamItemIdParams }>(
    '/admin/wyndham-page/rail-cards/:id/media',
    {
      ...base,
      preHandler: [auth, validateRequest(adminWyndhamItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.uploadRailMedia(req, reply),
  )

  app.post<{ Body: AdminWyndhamPropertyBody }>(
    '/admin/wyndham-page/properties',
    {
      ...base,
      preHandler: [auth, validateRequest(adminWyndhamPropertyBodySchema, 'body')],
    },
    (req, reply) => controller.createProperty(req, reply),
  )

  app.put<{ Params: AdminWyndhamItemIdParams; Body: AdminWyndhamPropertyBody }>(
    '/admin/wyndham-page/properties/:id',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminWyndhamItemIdParamsSchema, 'params'),
        validateRequest(adminWyndhamPropertyBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.updateProperty(req, reply),
  )

  app.delete<{ Params: AdminWyndhamItemIdParams }>(
    '/admin/wyndham-page/properties/:id',
    {
      ...base,
      preHandler: [auth, validateRequest(adminWyndhamItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.deleteProperty(req, reply),
  )

  app.post<{ Params: AdminWyndhamItemIdParams; Body: AdminWyndhamMoveBody }>(
    '/admin/wyndham-page/properties/:id/move',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminWyndhamItemIdParamsSchema, 'params'),
        validateRequest(adminWyndhamMoveBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.moveProperty(req, reply),
  )

  app.post<{ Params: AdminWyndhamItemIdParams }>(
    '/admin/wyndham-page/properties/:id/media',
    {
      ...base,
      preHandler: [auth, validateRequest(adminWyndhamItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.uploadPropertyMedia(req, reply),
  )

  app.post<{ Body: AdminWyndhamLogoBody }>(
    '/admin/wyndham-page/logos',
    {
      ...base,
      preHandler: [auth, validateRequest(adminWyndhamLogoBodySchema, 'body')],
    },
    (req, reply) => controller.createLogo(req, reply),
  )

  app.put<{ Params: AdminWyndhamItemIdParams; Body: AdminWyndhamLogoBody }>(
    '/admin/wyndham-page/logos/:id',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminWyndhamItemIdParamsSchema, 'params'),
        validateRequest(adminWyndhamLogoBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.updateLogo(req, reply),
  )

  app.delete<{ Params: AdminWyndhamItemIdParams }>(
    '/admin/wyndham-page/logos/:id',
    {
      ...base,
      preHandler: [auth, validateRequest(adminWyndhamItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.deleteLogo(req, reply),
  )

  app.post<{ Params: AdminWyndhamItemIdParams; Body: AdminWyndhamMoveBody }>(
    '/admin/wyndham-page/logos/:id/move',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminWyndhamItemIdParamsSchema, 'params'),
        validateRequest(adminWyndhamMoveBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.moveLogo(req, reply),
  )

  app.post<{ Params: AdminWyndhamItemIdParams }>(
    '/admin/wyndham-page/logos/:id/media',
    {
      ...base,
      preHandler: [auth, validateRequest(adminWyndhamItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.uploadLogoMedia(req, reply),
  )
}
