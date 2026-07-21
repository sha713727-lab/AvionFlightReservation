import { z } from 'zod'
import { SERVICE_ICON_KEYS, SERVICE_IMAGE_KEYS } from './constants.js'

const slugSchema = z
  .string()
  .trim()
  .min(2)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case')

const featureSchema = z.string().trim().min(1).max(200)

export const adminServiceIdParamsSchema = z.object({
  id: z.string().trim().min(1).max(64),
})

export const adminServiceBodySchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(2).max(120),
  tagline: z.string().trim().min(2).max(200),
  description: z.string().trim().min(10).max(2000),
  features: z.array(featureSchema).min(1).max(12),
  iconKey: z.enum(SERVICE_ICON_KEYS),
  imageKey: z.enum(SERVICE_IMAGE_KEYS),
  imageAlt: z.string().trim().min(2).max(200),
  isActive: z.boolean(),
})

export const adminServiceMoveBodySchema = z.object({
  direction: z.enum(['up', 'down']),
})

export type AdminServiceIdParams = z.infer<typeof adminServiceIdParamsSchema>
export type AdminServiceBody = z.infer<typeof adminServiceBodySchema>
export type AdminServiceMoveBody = z.infer<typeof adminServiceMoveBodySchema>
