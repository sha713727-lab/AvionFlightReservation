import { z } from 'zod'

export const ADMIN_DESTINATION_VALIDATION = {
  slugRequired: 'Enter a lowercase slug (e.g. europe).',
  titleRequired: 'Enter a title between 2 and 120 characters.',
  pointsRequired: 'Enter points as a whole number from 0 to 10,000,000.',
}

export const adminDestinationSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  points: z.number().int(),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
  placesCount: z.number().int(),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
})

export const adminDestinationListSchema = z.object({
  items: z.array(adminDestinationSchema),
})

export const adminDestinationFormSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, ADMIN_DESTINATION_VALIDATION.slugRequired)
    .max(80, ADMIN_DESTINATION_VALIDATION.slugRequired)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, ADMIN_DESTINATION_VALIDATION.slugRequired),
  title: z
    .string()
    .trim()
    .min(2, ADMIN_DESTINATION_VALIDATION.titleRequired)
    .max(120, ADMIN_DESTINATION_VALIDATION.titleRequired),
  points: z.coerce
    .number({ invalid_type_error: ADMIN_DESTINATION_VALIDATION.pointsRequired })
    .int(ADMIN_DESTINATION_VALIDATION.pointsRequired)
    .min(0, ADMIN_DESTINATION_VALIDATION.pointsRequired)
    .max(10_000_000, ADMIN_DESTINATION_VALIDATION.pointsRequired),
  isActive: z.boolean(),
})
