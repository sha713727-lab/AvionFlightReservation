import { z } from 'zod'

export const apiErrorDetailSchema = z.object({
  field: z.string().optional(),
  message: z.string(),
  code: z.string().optional(),
})

export const apiSuccessSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.unknown(),
  errors: z.null().optional(),
})

export const apiFailureSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  data: z.null(),
  errors: z.array(apiErrorDetailSchema),
  errorCode: z.string(),
})

export const paginationSchema = z.object({
  page: z.number().int().nonnegative(),
  pageSize: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
})

export const serviceDtoSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  tagline: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  iconKey: z.string(),
  imageKey: z.string(),
  imageAlt: z.string(),
  mediaUrl: z.string().nullable().optional(),
  mediaType: z.enum(['image', 'video']).nullable().optional(),
  sortOrder: z.number().int(),
})

export const serviceListSchema = z.object({
  items: z.array(serviceDtoSchema),
  pagination: paginationSchema,
})

export const destinationPlaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  alt: z.string(),
  imageUrl: z.string(),
  mediaUrl: z.string().nullable().optional(),
  mediaType: z.enum(['image', 'video']).nullable().optional(),
  sortOrder: z.number().int(),
})

export const destinationTierSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  points: z.number().int(),
  sortOrder: z.number().int(),
  places: z.array(destinationPlaceSchema),
})

export const destinationListSchema = z.object({
  items: z.array(destinationTierSchema),
  pagination: paginationSchema,
})

export const faqDtoSchema = z.object({
  id: z.string(),
  slug: z.string(),
  question: z.string(),
  answer: z.string(),
  sortOrder: z.number().int(),
})

export const faqListSchema = z.object({
  items: z.array(faqDtoSchema),
  pagination: paginationSchema,
})
