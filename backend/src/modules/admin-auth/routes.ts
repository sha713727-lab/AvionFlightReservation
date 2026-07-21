import type { FastifyInstance } from 'fastify'
import { apiErrorResponseSchema, successEnvelopeSchema } from '../../constants/openapi-schemas.js'
import { validateRequest } from '../../middleware/validate.js'
import type { AdminAuthController } from './controller.js'
import {
  adminLoginBodySchema,
  adminOtpResendBodySchema,
  adminOtpVerifyBodySchema,
  type AdminLoginBody,
  type AdminOtpResendBody,
  type AdminOtpVerifyBody,
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

const adminOtpChallengeDataSchema = {
  type: 'object',
  required: ['challengeId', 'expiresAt', 'destinationHint', 'resendAvailableAt'],
  additionalProperties: false,
  properties: {
    challengeId: { type: 'string', format: 'uuid' },
    expiresAt: { type: 'string', format: 'date-time' },
    destinationHint: { type: 'string' },
    resendAvailableAt: { type: 'string', format: 'date-time' },
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

const otpVerifyBodyOpenApi = {
  type: 'object',
  required: ['challengeId', 'code'],
  additionalProperties: false,
  properties: {
    challengeId: { type: 'string', format: 'uuid' },
    code: { type: 'string', pattern: '^\\d{6}$' },
  },
} as const

const otpResendBodyOpenApi = {
  type: 'object',
  required: ['challengeId'],
  additionalProperties: false,
  properties: {
    challengeId: { type: 'string', format: 'uuid' },
  },
} as const

export async function registerAdminAuthRoutes(
  app: FastifyInstance,
  controller: AdminAuthController,
): Promise<void> {
  app.post<{ Body: AdminLoginBody }>(
    '/admin/auth/login',
    {
      config: {
        rateLimit: {
          max: 8,
          timeWindow: '1 minute',
        },
      },
      schema: {
        tags: ['Admin Auth'],
        summary: 'Validate admin credentials and send OTP',
        body: adminLoginBodyOpenApi,
        response: {
          200: successEnvelopeSchema(adminOtpChallengeDataSchema),
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

  app.post<{ Body: AdminOtpVerifyBody }>(
    '/admin/auth/otp/verify',
    {
      config: {
        rateLimit: {
          max: 10,
          timeWindow: '1 minute',
        },
      },
      schema: {
        tags: ['Admin Auth'],
        summary: 'Verify admin OTP and create session',
        body: otpVerifyBodyOpenApi,
        response: {
          200: successEnvelopeSchema(adminLoginDataSchema),
          401: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
          503: apiErrorResponseSchema,
        },
      },
      preHandler: [validateRequest(adminOtpVerifyBodySchema, 'body')],
    },
    (request, reply) => controller.verifyOtp(request, reply),
  )

  app.post<{ Body: AdminOtpResendBody }>(
    '/admin/auth/otp/resend',
    {
      config: {
        rateLimit: {
          max: 3,
          timeWindow: '1 minute',
        },
      },
      schema: {
        tags: ['Admin Auth'],
        summary: 'Resend admin OTP',
        body: otpResendBodyOpenApi,
        response: {
          200: successEnvelopeSchema(adminOtpChallengeDataSchema),
          401: apiErrorResponseSchema,
          422: apiErrorResponseSchema,
          429: apiErrorResponseSchema,
          503: apiErrorResponseSchema,
        },
      },
      preHandler: [validateRequest(adminOtpResendBodySchema, 'body')],
    },
    (request, reply) => controller.resendOtp(request, reply),
  )
}
