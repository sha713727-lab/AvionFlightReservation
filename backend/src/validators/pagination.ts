import { z } from 'zod'

export type PaginationQuery = {
  page: number
  pageSize: number
}

export function createPaginationQuerySchema(
  maxPageSize: number,
  defaultPageSize: number,
) {
  return z.object({
    page: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce
      .number()
      .int()
      .positive()
      .max(maxPageSize)
      .default(defaultPageSize),
  })
}
