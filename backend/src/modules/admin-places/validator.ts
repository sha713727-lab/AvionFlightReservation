import { z } from 'zod'

export const adminPlaceIdParamsSchema = z.object({
  id: z.string().trim().min(1).max(64),
})

export const adminPlaceListQuerySchema = z.object({
  tierId: z.string().trim().min(1).max(64).optional(),
})

export const adminPlaceBodySchema = z.object({
  name: z.string().trim().min(2).max(120),
  alt: z.string().trim().min(2).max(200),
  imageUrl: z
    .string()
    .trim()
    .max(2048)
    .refine(
      (value) => value === '' || (value.startsWith('https://') && z.string().url().safeParse(value).success),
      'Image URL must be empty or a valid HTTPS URL',
    ),
  isActive: z.boolean(),
  tierId: z.string().trim().min(1).max(64),
})

export const adminPlaceMoveBodySchema = z.object({
  direction: z.enum(['up', 'down']),
})

export type AdminPlaceIdParams = z.infer<typeof adminPlaceIdParamsSchema>
export type AdminPlaceListQuery = z.infer<typeof adminPlaceListQuerySchema>
export type AdminPlaceBody = z.infer<typeof adminPlaceBodySchema>
export type AdminPlaceMoveBody = z.infer<typeof adminPlaceMoveBodySchema>
