import { z } from 'zod'
import {
  WYNDHAM_MEDIA_SLOTS,
  WYNDHAM_RAIL_CARD_TYPES,
} from '../wyndham-page/types.js'

const optionalHref = z
  .string()
  .trim()
  .max(500)
  .refine((value) => value === '' || value.startsWith('/') || value.startsWith('http'), {
    message: 'Link must be a relative path or absolute URL',
  })
  .nullable()
  .optional()

export const adminWyndhamPageBodySchema = z.object({
  status: z.enum(['draft', 'published']),
  metaTitle: z.string().trim().min(10).max(120),
  metaDescription: z.string().trim().min(40).max(320),
  ogTitle: z.string().trim().max(120).nullable().optional(),
  ogDescription: z.string().trim().max(320).nullable().optional(),
  heroHeading: z.string().trim().min(5).max(160),
  heroIntroduction: z.string().trim().min(20).max(500),
  storyLabel: z.string().trim().min(2).max(80),
  storyParagraphs: z.array(z.string().trim().min(10).max(1200)).min(1).max(6),
  storyCtaLabel: z.string().trim().min(2).max(80),
  storyCtaHref: z.string().trim().min(1).max(500),
  principlesHeading: z.string().trim().min(2).max(120),
  clientsEnabled: z.boolean(),
  clientsHeading: z.string().trim().max(160),
  clientsIntroduction: z.string().trim().max(500),
  railLabel: z.string().trim().min(2).max(120),
  contactEmailOverride: z
    .union([z.string().trim().email().max(160), z.literal(''), z.null()])
    .optional()
    .transform((value) => (value === '' || value === undefined ? null : value)),
})

export const adminWyndhamSlotParamsSchema = z.object({
  slotKey: z.enum(WYNDHAM_MEDIA_SLOTS),
})

export const adminWyndhamMediaMetaSchema = z.object({
  alt: z.string().trim().max(200).optional(),
  focalX: z.coerce.number().min(0).max(1).optional(),
  focalY: z.coerce.number().min(0).max(1).optional(),
})

export const adminWyndhamItemIdParamsSchema = z.object({
  id: z.string().trim().min(1).max(64),
})

export const adminWyndhamPrincipleBodySchema = z.object({
  numberLabel: z.string().trim().min(1).max(8),
  title: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(500),
  isEnabled: z.boolean(),
})

export const adminWyndhamRailCardBodySchema = z.object({
  cardType: z.enum(WYNDHAM_RAIL_CARD_TYPES),
  title: z.string().trim().max(120),
  body: z.string().trim().max(600),
  linkLabel: z.string().trim().max(80).nullable().optional(),
  linkHref: optionalHref,
  factValue: z.string().trim().max(40).nullable().optional(),
  mediaAlt: z.string().trim().max(200).optional(),
  isEnabled: z.boolean(),
})

export const adminWyndhamPropertyBodySchema = z.object({
  title: z.string().trim().min(2).max(160),
  blurb: z.string().trim().min(10).max(600),
  mediaAlt: z.string().trim().max(200).optional(),
  isEnabled: z.boolean(),
})

export const adminWyndhamLogoBodySchema = z.object({
  name: z.string().trim().min(1).max(80),
  href: optionalHref,
  isEnabled: z.boolean(),
})

export const adminWyndhamMoveBodySchema = z.object({
  direction: z.enum(['up', 'down']),
})

export type AdminWyndhamPageBody = z.infer<typeof adminWyndhamPageBodySchema>
export type AdminWyndhamSlotParams = z.infer<typeof adminWyndhamSlotParamsSchema>
export type AdminWyndhamItemIdParams = z.infer<typeof adminWyndhamItemIdParamsSchema>
export type AdminWyndhamPrincipleBody = z.infer<typeof adminWyndhamPrincipleBodySchema>
export type AdminWyndhamRailCardBody = z.infer<typeof adminWyndhamRailCardBodySchema>
export type AdminWyndhamPropertyBody = z.infer<typeof adminWyndhamPropertyBodySchema>
export type AdminWyndhamLogoBody = z.infer<typeof adminWyndhamLogoBodySchema>
export type AdminWyndhamMoveBody = z.infer<typeof adminWyndhamMoveBodySchema>
