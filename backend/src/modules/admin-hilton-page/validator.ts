import { z } from 'zod'
import {
  HILTON_MEDIA_SLOTS,
  HILTON_RAIL_CARD_TYPES,
} from '../hilton-page/types.js'

const optionalHref = z
  .string()
  .trim()
  .max(500)
  .refine((value) => value === '' || value.startsWith('/') || value.startsWith('http'), {
    message: 'Link must be a relative path or absolute URL',
  })
  .nullable()
  .optional()

export const adminHiltonPageBodySchema = z.object({
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

export const adminHiltonSlotParamsSchema = z.object({
  slotKey: z.enum(HILTON_MEDIA_SLOTS),
})

export const adminHiltonMediaMetaSchema = z.object({
  alt: z.string().trim().max(200).optional(),
  focalX: z.coerce.number().min(0).max(1).optional(),
  focalY: z.coerce.number().min(0).max(1).optional(),
})

export const adminHiltonItemIdParamsSchema = z.object({
  id: z.string().trim().min(1).max(64),
})

export const adminHiltonPrincipleBodySchema = z.object({
  numberLabel: z.string().trim().min(1).max(8),
  title: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(500),
  isEnabled: z.boolean(),
})

export const adminHiltonRailCardBodySchema = z.object({
  cardType: z.enum(HILTON_RAIL_CARD_TYPES),
  title: z.string().trim().max(120),
  body: z.string().trim().max(600),
  linkLabel: z.string().trim().max(80).nullable().optional(),
  linkHref: optionalHref,
  factValue: z.string().trim().max(40).nullable().optional(),
  mediaAlt: z.string().trim().max(200).optional(),
  isEnabled: z.boolean(),
})

export const adminHiltonPropertyBodySchema = z.object({
  title: z.string().trim().min(2).max(160),
  blurb: z.string().trim().min(10).max(600),
  mediaAlt: z.string().trim().max(200).optional(),
  isEnabled: z.boolean(),
})

export const adminHiltonLogoBodySchema = z.object({
  name: z.string().trim().min(1).max(80),
  href: optionalHref,
  isEnabled: z.boolean(),
})

export const adminHiltonMoveBodySchema = z.object({
  direction: z.enum(['up', 'down']),
})

export type AdminHiltonPageBody = z.infer<typeof adminHiltonPageBodySchema>
export type AdminHiltonSlotParams = z.infer<typeof adminHiltonSlotParamsSchema>
export type AdminHiltonItemIdParams = z.infer<typeof adminHiltonItemIdParamsSchema>
export type AdminHiltonPrincipleBody = z.infer<typeof adminHiltonPrincipleBodySchema>
export type AdminHiltonRailCardBody = z.infer<typeof adminHiltonRailCardBodySchema>
export type AdminHiltonPropertyBody = z.infer<typeof adminHiltonPropertyBodySchema>
export type AdminHiltonLogoBody = z.infer<typeof adminHiltonLogoBodySchema>
export type AdminHiltonMoveBody = z.infer<typeof adminHiltonMoveBodySchema>
