import { z } from 'zod'

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().default(20),
})

export type PaginationQuery = z.infer<typeof paginationQuerySchema>

export function createPaginationQuerySchema(maxPageSize: number) {
  return z.object({
    page: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().max(maxPageSize).default(20),
  })
}
