import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ERROR_CODES } from '../constants/error-codes.js'
import { API_MESSAGES } from '../constants/messages.js'
import { HTTP_STATUS } from '../constants/http.js'
import { AppError } from '../lib/errors.js'
import { errorResponse } from '../utils/response.js'

export function errorHandler(
  error: FastifyError | AppError | Error,
  request: FastifyRequest,
  reply: FastifyReply,
): void {
  if (error instanceof AppError) {
    request.log.warn(
      {
        errorCode: error.errorCode,
        statusCode: error.statusCode,
        errors: error.errors,
      },
      error.message,
    )

    void reply
      .status(error.statusCode)
      .send(errorResponse(error.message, error.errorCode, error.errors))
    return
  }

  const statusCode =
    'statusCode' in error && typeof error.statusCode === 'number'
      ? error.statusCode
      : HTTP_STATUS.INTERNAL

  if (statusCode === HTTP_STATUS.TOO_MANY_REQUESTS) {
    void reply
      .status(HTTP_STATUS.TOO_MANY_REQUESTS)
      .send(errorResponse(API_MESSAGES.RATE_LIMITED, ERROR_CODES.RATE_LIMITED))
    return
  }

  if (statusCode >= 400 && statusCode < 500) {
    request.log.warn({ err: error, statusCode }, 'Client error')
    void reply
      .status(statusCode)
      .send(errorResponse(API_MESSAGES.VALIDATION_FAILED, ERROR_CODES.VALIDATION_ERROR))
    return
  }

  request.log.error({ err: error }, 'Unhandled error')

  void reply
    .status(HTTP_STATUS.INTERNAL)
    .send(errorResponse(API_MESSAGES.INTERNAL, ERROR_CODES.INTERNAL))
}
