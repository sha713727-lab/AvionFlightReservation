import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ZodType } from 'zod'
import { API_MESSAGES } from '../constants/messages.js'
import { validationError } from '../lib/errors.js'
import { normalizeString } from '../utils/sanitize.js'

type RequestPart = 'body' | 'params' | 'query'

function sanitizeUnknown(value: unknown): unknown {
  if (typeof value === 'string') {
    return normalizeString(value)
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeUnknown)
  }

  if (value !== null && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
      key,
      sanitizeUnknown(entry),
    ])
    return Object.fromEntries(entries)
  }

  return value
}

export function validateRequest<T>(schema: ZodType<T>, part: RequestPart) {
  return async (request: FastifyRequest): Promise<void> => {
    const raw = request[part]
    const sanitized = sanitizeUnknown(raw)
    const result = schema.safeParse(sanitized)

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.') || part,
        message: issue.message,
        code: issue.code,
      }))

      throw validationError(API_MESSAGES.VALIDATION_FAILED, errors)
    }

    Object.assign(request, { [part]: result.data })
  }
}

export function sendPayload(
  reply: FastifyReply,
  statusCode: number,
  payload: unknown,
): FastifyReply {
  return reply.status(statusCode).send(payload)
}
