import { z } from 'zod'

const slugSchema = z
  .string()
  .trim()
  .min(2)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case')

export const adminFaqIdParamsSchema = z.object({
  id: z.string().trim().min(1).max(64),
})

export const adminFaqBodySchema = z.object({
  slug: slugSchema,
  question: z.string().trim().min(5).max(300),
  answer: z.string().trim().min(10).max(5000),
  isActive: z.boolean(),
})

export const adminFaqMoveBodySchema = z.object({
  direction: z.enum(['up', 'down']),
})

export type AdminFaqIdParams = z.infer<typeof adminFaqIdParamsSchema>
export type AdminFaqBody = z.infer<typeof adminFaqBodySchema>
export type AdminFaqMoveBody = z.infer<typeof adminFaqMoveBodySchema>
