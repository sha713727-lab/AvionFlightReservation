import { z } from 'zod'

export const CALLBACK_STATUSES = ['new', 'contacted', 'closed'] as const

export const adminCallbackIdParamsSchema = z.object({
  id: z.string().trim().min(1).max(64),
})

export const adminCallbackListQuerySchema = z.object({
  status: z.enum(CALLBACK_STATUSES).optional(),
})

export const adminCallbackStatusBodySchema = z.object({
  status: z.enum(CALLBACK_STATUSES),
})

export type AdminCallbackIdParams = z.infer<typeof adminCallbackIdParamsSchema>
export type AdminCallbackListQuery = z.infer<typeof adminCallbackListQuerySchema>
export type AdminCallbackStatusBody = z.infer<typeof adminCallbackStatusBodySchema>
