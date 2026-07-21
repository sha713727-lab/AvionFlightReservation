import { z } from 'zod'

export const SERVICE_ICON_KEYS = [
  'plane',
  'hotel',
  'gift',
  'exchange',
  'ban',
  'chair',
  'suitcase',
  'route',
  'beach',
]

export const SERVICE_IMAGE_KEYS = [
  'flight-booking',
  'hotel-booking',
  'reward-travel',
  'flight-change',
  'cancellation',
  'seat-selection',
  'baggage',
  'trip-planning',
  'vacation-package',
]

export const ADMIN_SERVICE_VALIDATION = {
  slugRequired: 'Enter a lowercase slug (e.g. flight-booking).',
  titleRequired: 'Enter a title between 2 and 120 characters.',
  taglineRequired: 'Enter a tagline between 2 and 200 characters.',
  descriptionRequired: 'Enter a description of at least 10 characters.',
  featuresRequired: 'Add at least one feature.',
  featureTooLong: 'Each feature must be 200 characters or fewer.',
  iconRequired: 'Select an icon.',
  imageRequired: 'Select an image.',
  imageAltRequired: 'Enter image alt text.',
}

const featureSchema = z
  .string()
  .trim()
  .min(1, ADMIN_SERVICE_VALIDATION.featuresRequired)
  .max(200, ADMIN_SERVICE_VALIDATION.featureTooLong)

export const adminServiceSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  features: z.array(z.string()),
  iconKey: z.string().min(1),
  imageKey: z.string().min(1),
  imageAlt: z.string().min(1),
  mediaUrl: z.string().nullable(),
  mediaType: z.enum(['image', 'video']).nullable(),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
})

export const adminServiceListSchema = z.object({
  items: z.array(adminServiceSchema),
})

export const adminServiceOptionsSchema = z.object({
  iconKeys: z.array(z.string().min(1)).min(1),
  imageKeys: z.array(z.string().min(1)).min(1),
})

export const adminServiceFormSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, ADMIN_SERVICE_VALIDATION.slugRequired)
    .max(80, ADMIN_SERVICE_VALIDATION.slugRequired)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, ADMIN_SERVICE_VALIDATION.slugRequired),
  title: z
    .string()
    .trim()
    .min(2, ADMIN_SERVICE_VALIDATION.titleRequired)
    .max(120, ADMIN_SERVICE_VALIDATION.titleRequired),
  tagline: z
    .string()
    .trim()
    .min(2, ADMIN_SERVICE_VALIDATION.taglineRequired)
    .max(200, ADMIN_SERVICE_VALIDATION.taglineRequired),
  description: z
    .string()
    .trim()
    .min(10, ADMIN_SERVICE_VALIDATION.descriptionRequired)
    .max(2000, ADMIN_SERVICE_VALIDATION.descriptionRequired),
  features: z.array(featureSchema).min(1, ADMIN_SERVICE_VALIDATION.featuresRequired).max(12),
  iconKey: z
    .string()
    .refine((value) => SERVICE_ICON_KEYS.includes(value), ADMIN_SERVICE_VALIDATION.iconRequired),
  imageKey: z
    .string()
    .refine((value) => SERVICE_IMAGE_KEYS.includes(value), ADMIN_SERVICE_VALIDATION.imageRequired),
  imageAlt: z
    .string()
    .trim()
    .min(2, ADMIN_SERVICE_VALIDATION.imageAltRequired)
    .max(200, ADMIN_SERVICE_VALIDATION.imageAltRequired),
  isActive: z.boolean(),
})
