import type { ApiErrorDetail, ApiErrorResponse, ApiSuccessResponse } from '../types/api.js'
import type { ErrorCode } from '../constants/error-codes.js'

export function successResponse<T>(
  data: T,
  message: string,
): ApiSuccessResponse<T> {
  return {
    success: true,
    message,
    data,
    errors: null,
  }
}

export function errorResponse(
  message: string,
  errorCode: ErrorCode,
  errors: ApiErrorDetail[] = [],
): ApiErrorResponse {
  return {
    success: false,
    message,
    data: null,
    errors,
    errorCode,
  }
}
