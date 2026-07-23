import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema, successEnvelopeSchema } from '../../constants/openapi-schemas.js'
import { createRequireAdminAuth } from '../../middleware/require-admin-auth.js'
import { validateRequest } from '../../middleware/validate.js'
import type { AdminAuthService } from './service.js'
import type { AdminAuthController } from './controller.js'
import {
  adminLoginBodySchema,
  adminPinChangeBodySchema,
  adminPinVerifyBodySchema,
  type AdminLoginBody,
  type AdminPinChangeBody,
  type AdminPinVerifyBody,
} from './validator.js'

const adminLoginBodyOpenApi = {
  type: 'object',
  required: ['email', 'password'],
  additionalProperties: false,
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 8, maxLength: 128 },
  },
} as const

const adminPinChallengeDataSchema = {
  type: 'object',
  required: ['challengeId', 'expiresAt'],
  additionalProperties: false,
  properties: {
    challengeId: { type: 'string', format: 'uuid' },
    expiresAt: { type: 'string', format: 'date-time' },
  },
} as const

const adminLoginDataSchema = {
  type: 'object',
  required: ['token', 'expiresAt', 'admin'],
  additionalProperties: false,
  properties: {
    token: { type: 'string' },
    expiresAt: { type: 'string', format: 'date-time' },
    admin: {
      type: 'object',
      required: ['email'],
      additionalProperties: false,
      properties: {
        email: { type: 'string', format: 'email' },
      },
    },
  },
} as const

const pinVerifyBodyOpenApi = {
  type: 'object',
  required: ['challengeId', 'pin'],
  additionalProperties: false,
  properties: {
    challengeId: { type: 'string', format: 'uuid' },
    pin: { type: 'string', pattern: '^\\d{8}$' },
  },
} as const

const pinChangeBodyOpenApi = {
  type: 'object',
  required: ['currentPin', 'newPin', 'confirmPin'],
  additionalProperties: false,
  properties: {
    currentPin: { type: 'string', pattern: '^\\d{8}$' },
    newPin: { type: 'string', pattern: '^\\d{8}$' },
    confirmPin: { type: 'string', pattern: '^\\d{8}$' },
  },
} as const

const pinChangeDataSchema = {
  type: 'object',
  required: ['updated'],
  additionalProperties: false,
  properties: {
    updated: { type: 'boolean', const: true },
  },
} as const

export async function registerAdminAuthRoutes(
  app: FastifyInstance,
  controller: AdminAuthController,
  adminAuthService: AdminAuthService,
): Promise<void> {
  const requireAdminAuth = createRequireAdminAuth(adminAuthService)

  app.post<{ Body: AdminLoginBody }>(
    '/admin/auth/login',
    {
      config: { rateLimit: { max: 8, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Auth'],
        summary: 'Validate admin credentials and start PIN challenge',
        body: adminLoginBodyOpenApi,
        response: {
          200: successEnvelopeSchema(adminPinChallengeDataSchema),
          401: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
          503: apiErrorResponseSchema,
        },
      },
      preHandler: [validateRequest(adminLoginBodySchema, 'body')],
    },
    (request, reply) => controller.login(request, reply),
  )

  app.post<{ Body: AdminPinVerifyBody }>(
    '/admin/auth/pin/verify',
    {
      config: { rateLimit: { max: 10, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Auth'],
        summary: 'Verify admin PIN and create session',
        body: pinVerifyBodyOpenApi,
        response: {
          200: successEnvelopeSchema(adminLoginDataSchema),
          401: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
          503: apiErrorResponseSchema,
        },
      },
      preHandler: [validateRequest(adminPinVerifyBodySchema, 'body')],
    },
    (request, reply) => controller.verifyPin(request, reply),
  )

  app.put<{ Body: AdminPinChangeBody }>(
    '/admin/auth/pin',
    {
      config: { rateLimit: { max: 6, timeWindow: '1 minute' } },
      schema: {
        tags: ['Admin Auth'],
        summary: 'Change admin PIN',
        security: [{ bearerAuth: [] }],
        body: pinChangeBodyOpenApi,
        response: {
          200: successEnvelopeSchema(pinChangeDataSchema),
          401: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
          503: apiErrorResponseSchema,
        },
      },
      preHandler: [requireAdminAuth, validateRequest(adminPinChangeBodySchema, 'body')],
    },
    (request, reply) => controller.changePin(request, reply),
  )
}
