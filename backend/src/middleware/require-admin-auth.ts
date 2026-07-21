import type { FastifyRequest } from 'fastify'
import { ERROR_CODES } from '../constants/error-codes.js'
import { API_MESSAGES } from '../constants/messages.js'
import { unauthorizedError } from '../lib/errors.js'
import type { AdminAuthService } from '../modules/admin-auth/service.js'
import type { AdminSessionPayload } from '../modules/admin-auth/types.js'

export type AdminAuthenticatedRequest = FastifyRequest & {
  admin: AdminSessionPayload
}

export function createRequireAdminAuth(adminAuthService: AdminAuthService) {
  return async function requireAdminAuth(request: FastifyRequest): Promise<void> {
    const header = request.headers.authorization

    if (!header || !header.startsWith('Bearer ')) {
      throw unauthorizedError(API_MESSAGES.ADMIN_AUTH_REQUIRED, ERROR_CODES.AUTH_INVALID)
    }

    const token = header.slice('Bearer '.length).trim()
    if (!token) {
      throw unauthorizedError(API_MESSAGES.ADMIN_AUTH_REQUIRED, ERROR_CODES.AUTH_INVALID)
    }

    const admin = adminAuthService.verifySession(token)
    ;(request as AdminAuthenticatedRequest).admin = admin
  }
}
