import { z } from 'zod'

const slugSchema = z
  .string()
  .trim()
  .min(2)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case')

export const adminDestinationIdParamsSchema = z.object({
  id: z.string().trim().min(1).max(64),
})

export const adminDestinationBodySchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(2).max(120),
  points: z.number().int().min(0).max(10_000_000),
  isActive: z.boolean(),
})

export const adminDestinationMoveBodySchema = z.object({
  direction: z.enum(['up', 'down']),
})

export type AdminDestinationIdParams = z.infer<typeof adminDestinationIdParamsSchema>
export type AdminDestinationBody = z.infer<typeof adminDestinationBodySchema>
export type AdminDestinationMoveBody = z.infer<typeof adminDestinationMoveBodySchema>
