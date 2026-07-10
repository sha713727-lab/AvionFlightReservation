import type { PaginationMeta } from '../types/api.js'

export function buildPaginationMeta(
  total: number,
  page: number,
  pageSize: number,
): PaginationMeta {
  const totalPages = total === 0 ? 0 : Math.ceil(total / pageSize)

  return {
    page,
    pageSize,
    total,
    totalPages,
  }
}

export function toSkipTake(page: number, pageSize: number): { skip: number; take: number } {
  return {
    skip: (page - 1) * pageSize,
    take: pageSize,
  }
}
