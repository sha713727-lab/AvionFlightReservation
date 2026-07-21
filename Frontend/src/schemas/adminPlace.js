import { z } from 'zod'

export const ADMIN_PLACE_VALIDATION = {
  nameRequired: 'Enter a place name between 2 and 120 characters.',
  altRequired: 'Enter alt text between 2 and 200 characters.',
  imageUrlRequired: 'Enter a valid HTTPS image URL, or upload media instead.',
  mediaRequired: 'Upload an image or video, or provide an HTTPS image URL.',
  tierRequired: 'Select a destination tier.',
}

export const adminPlaceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  alt: z.string().min(1),
  imageUrl: z.string(),
  mediaUrl: z.string().nullable(),
  mediaType: z.enum(['image', 'video']).nullable(),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
  tierId: z.string().min(1),
  tierTitle: z.string().min(1),
  tierSlug: z.string().min(1),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
})

export const adminPlaceListSchema = z.object({
  items: z.array(adminPlaceSchema),
})

export const adminPlaceTierOptionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  isActive: z.boolean(),
})

export const adminPlaceOptionsSchema = z.object({
  tiers: z.array(adminPlaceTierOptionSchema),
})

export const adminPlaceFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, ADMIN_PLACE_VALIDATION.nameRequired)
    .max(120, ADMIN_PLACE_VALIDATION.nameRequired),
  alt: z
    .string()
    .trim()
    .min(2, ADMIN_PLACE_VALIDATION.altRequired)
    .max(200, ADMIN_PLACE_VALIDATION.altRequired),
  imageUrl: z
    .string()
    .trim()
    .max(2048, ADMIN_PLACE_VALIDATION.imageUrlRequired)
    .refine(
      (value) =>
        value === '' ||
        (value.startsWith('https://') && z.string().url().safeParse(value).success),
      ADMIN_PLACE_VALIDATION.imageUrlRequired,
    ),
  isActive: z.boolean(),
  tierId: z.string().trim().min(1, ADMIN_PLACE_VALIDATION.tierRequired),
})
