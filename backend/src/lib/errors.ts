import { ERROR_CODES, type ErrorCode } from '../constants/error-codes.js'
import { HTTP_STATUS } from '../constants/http.js'
import type { ApiErrorDetail } from '../types/api.js'

export class AppError extends Error {
  readonly statusCode: number
  readonly errorCode: ErrorCode
  readonly errors: ApiErrorDetail[]
  readonly isOperational: boolean

  constructor(
    message: string,
    statusCode: number,
    errorCode: ErrorCode,
    errors: ApiErrorDetail[] = [],
  ) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
    this.errorCode = errorCode
    this.errors = errors
    this.isOperational = true
  }
}

export function notFoundError(message: string, errorCode: ErrorCode): AppError {
  return new AppError(message, HTTP_STATUS.NOT_FOUND, errorCode)
}

export function validationError(message: string, errors: ApiErrorDetail[]): AppError {
  return new AppError(message, HTTP_STATUS.UNPROCESSABLE, ERROR_CODES.VALIDATION_ERROR, errors)
}

export function unauthorizedError(message: string, errorCode: ErrorCode): AppError {
  return new AppError(message, HTTP_STATUS.UNAUTHORIZED, errorCode)
}

export function conflictError(message: string, errorCode: ErrorCode): AppError {
  return new AppError(message, HTTP_STATUS.CONFLICT, errorCode)
}

export function serviceUnavailableError(message: string, errorCode: ErrorCode): AppError {
  return new AppError(message, HTTP_STATUS.SERVICE_UNAVAILABLE, errorCode)
}

export function tooManyRequestsError(message: string, errorCode: ErrorCode): AppError {
  return new AppError(message, HTTP_STATUS.TOO_MANY_REQUESTS, errorCode)
}
