import type { ErrorCode } from '../constants/error-codes.js'

export interface ApiSuccessResponse<T> {
  success: true
  message: string
  data: T
  errors: null
}

export interface ApiErrorDetail {
  field?: string
  message: string
  code?: string
}

export interface ApiErrorResponse {
  success: false
  message: string
  data: null
  errors: ApiErrorDetail[]
  errorCode: ErrorCode
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

export interface PaginationMeta {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface PaginatedData<T> {
  items: T[]
  pagination: PaginationMeta
}
