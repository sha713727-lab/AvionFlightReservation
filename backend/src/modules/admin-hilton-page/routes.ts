import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema } from '../../constants/openapi-schemas.js'
import { createRequireAdminAuth } from '../../middleware/require-admin-auth.js'
import { validateRequest } from '../../middleware/validate.js'
import type { AdminAuthService } from '../admin-auth/service.js'
import type { AdminHiltonPageController } from './controller.js'
import {
  adminHiltonItemIdParamsSchema,
  adminHiltonLogoBodySchema,
  adminHiltonMoveBodySchema,
  adminHiltonPageBodySchema,
  adminHiltonPrincipleBodySchema,
  adminHiltonPropertyBodySchema,
  adminHiltonRailCardBodySchema,
  adminHiltonSlotParamsSchema,
  type AdminHiltonItemIdParams,
  type AdminHiltonLogoBody,
  type AdminHiltonMoveBody,
  type AdminHiltonPageBody,
  type AdminHiltonPrincipleBody,
  type AdminHiltonPropertyBody,
  type AdminHiltonRailCardBody,
  type AdminHiltonSlotParams,
} from './validator.js'

const err = {
  401: apiErrorResponseSchema,
  404: apiErrorResponseSchema,
  422: apiErrorResponseSchema,
  429: apiErrorResponseSchema,
}

export async function registerAdminHiltonPageRoutes(
  app: FastifyInstance,
  controller: AdminHiltonPageController,
  adminAuthService: AdminAuthService,
): Promise<void> {
  const auth = createRequireAdminAuth(adminAuthService)
  const rate = { rateLimit: { max: 60, timeWindow: '1 minute' as const } }
  const base = {
    config: rate,
    schema: { tags: ['Admin Hilton Page'], security: [{ bearerAuth: [] }], response: err },
    preHandler: [auth],
  }

  app.get('/admin/hilton-page', base, (req, reply) => controller.getPage(req, reply))

  app.put<{ Body: AdminHiltonPageBody }>(
    '/admin/hilton-page',
    {
      ...base,
      preHandler: [auth, validateRequest(adminHiltonPageBodySchema, 'body')],
    },
    (req, reply) => controller.updatePage(req, reply),
  )

  app.post<{ Params: AdminHiltonSlotParams }>(
    '/admin/hilton-page/media/:slotKey',
    {
      ...base,
      preHandler: [auth, validateRequest(adminHiltonSlotParamsSchema, 'params')],
    },
    (req, reply) => controller.uploadSlotMedia(req, reply),
  )

  app.delete<{ Params: AdminHiltonSlotParams }>(
    '/admin/hilton-page/media/:slotKey',
    {
      ...base,
      preHandler: [auth, validateRequest(adminHiltonSlotParamsSchema, 'params')],
    },
    (req, reply) => controller.removeSlotMedia(req, reply),
  )

  app.post<{ Body: AdminHiltonPrincipleBody }>(
    '/admin/hilton-page/principles',
    {
      ...base,
      preHandler: [auth, validateRequest(adminHiltonPrincipleBodySchema, 'body')],
    },
    (req, reply) => controller.createPrinciple(req, reply),
  )

  app.put<{ Params: AdminHiltonItemIdParams; Body: AdminHiltonPrincipleBody }>(
    '/admin/hilton-page/principles/:id',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminHiltonItemIdParamsSchema, 'params'),
        validateRequest(adminHiltonPrincipleBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.updatePrinciple(req, reply),
  )

  app.delete<{ Params: AdminHiltonItemIdParams }>(
    '/admin/hilton-page/principles/:id',
    {
      ...base,
      preHandler: [auth, validateRequest(adminHiltonItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.deletePrinciple(req, reply),
  )

  app.post<{ Params: AdminHiltonItemIdParams; Body: AdminHiltonMoveBody }>(
    '/admin/hilton-page/principles/:id/move',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminHiltonItemIdParamsSchema, 'params'),
        validateRequest(adminHiltonMoveBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.movePrinciple(req, reply),
  )

  app.post<{ Body: AdminHiltonRailCardBody }>(
    '/admin/hilton-page/rail-cards',
    {
      ...base,
      preHandler: [auth, validateRequest(adminHiltonRailCardBodySchema, 'body')],
    },
    (req, reply) => controller.createRailCard(req, reply),
  )

  app.put<{ Params: AdminHiltonItemIdParams; Body: AdminHiltonRailCardBody }>(
    '/admin/hilton-page/rail-cards/:id',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminHiltonItemIdParamsSchema, 'params'),
        validateRequest(adminHiltonRailCardBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.updateRailCard(req, reply),
  )

  app.delete<{ Params: AdminHiltonItemIdParams }>(
    '/admin/hilton-page/rail-cards/:id',
    {
      ...base,
      preHandler: [auth, validateRequest(adminHiltonItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.deleteRailCard(req, reply),
  )

  app.post<{ Params: AdminHiltonItemIdParams; Body: AdminHiltonMoveBody }>(
    '/admin/hilton-page/rail-cards/:id/move',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminHiltonItemIdParamsSchema, 'params'),
        validateRequest(adminHiltonMoveBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.moveRailCard(req, reply),
  )

  app.post<{ Params: AdminHiltonItemIdParams }>(
    '/admin/hilton-page/rail-cards/:id/media',
    {
      ...base,
      preHandler: [auth, validateRequest(adminHiltonItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.uploadRailMedia(req, reply),
  )

  app.post<{ Body: AdminHiltonPropertyBody }>(
    '/admin/hilton-page/properties',
    {
      ...base,
      preHandler: [auth, validateRequest(adminHiltonPropertyBodySchema, 'body')],
    },
    (req, reply) => controller.createProperty(req, reply),
  )

  app.put<{ Params: AdminHiltonItemIdParams; Body: AdminHiltonPropertyBody }>(
    '/admin/hilton-page/properties/:id',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminHiltonItemIdParamsSchema, 'params'),
        validateRequest(adminHiltonPropertyBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.updateProperty(req, reply),
  )

  app.delete<{ Params: AdminHiltonItemIdParams }>(
    '/admin/hilton-page/properties/:id',
    {
      ...base,
      preHandler: [auth, validateRequest(adminHiltonItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.deleteProperty(req, reply),
  )

  app.post<{ Params: AdminHiltonItemIdParams; Body: AdminHiltonMoveBody }>(
    '/admin/hilton-page/properties/:id/move',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminHiltonItemIdParamsSchema, 'params'),
        validateRequest(adminHiltonMoveBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.moveProperty(req, reply),
  )

  app.post<{ Params: AdminHiltonItemIdParams }>(
    '/admin/hilton-page/properties/:id/media',
    {
      ...base,
      preHandler: [auth, validateRequest(adminHiltonItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.uploadPropertyMedia(req, reply),
  )

  app.post<{ Body: AdminHiltonLogoBody }>(
    '/admin/hilton-page/logos',
    {
      ...base,
      preHandler: [auth, validateRequest(adminHiltonLogoBodySchema, 'body')],
    },
    (req, reply) => controller.createLogo(req, reply),
  )

  app.put<{ Params: AdminHiltonItemIdParams; Body: AdminHiltonLogoBody }>(
    '/admin/hilton-page/logos/:id',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminHiltonItemIdParamsSchema, 'params'),
        validateRequest(adminHiltonLogoBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.updateLogo(req, reply),
  )

  app.delete<{ Params: AdminHiltonItemIdParams }>(
    '/admin/hilton-page/logos/:id',
    {
      ...base,
      preHandler: [auth, validateRequest(adminHiltonItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.deleteLogo(req, reply),
  )

  app.post<{ Params: AdminHiltonItemIdParams; Body: AdminHiltonMoveBody }>(
    '/admin/hilton-page/logos/:id/move',
    {
      ...base,
      preHandler: [
        auth,
        validateRequest(adminHiltonItemIdParamsSchema, 'params'),
        validateRequest(adminHiltonMoveBodySchema, 'body'),
      ],
    },
    (req, reply) => controller.moveLogo(req, reply),
  )

  app.post<{ Params: AdminHiltonItemIdParams }>(
    '/admin/hilton-page/logos/:id/media',
    {
      ...base,
      preHandler: [auth, validateRequest(adminHiltonItemIdParamsSchema, 'params')],
    },
    (req, reply) => controller.uploadLogoMedia(req, reply),
  )
}
