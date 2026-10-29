import { z } from 'zod'
import {
  BLUE_REWARDS_MEDIA_SLOTS,
  BLUE_REWARDS_RAIL_CARD_TYPES,
} from '../blue-rewards-page/types.js'

const optionalHref = z
  .string()
  .trim()
  .max(500)
  .refine((value) => value === '' || value.startsWith('/') || value.startsWith('http'), {
    message: 'Link must be a relative path or absolute URL',
  })
  .nullable()
  .optional()

export const adminBlueRewardsPageBodySchema = z.object({
  status: z.enum(['draft', 'published']),
  metaTitle: z.string().trim().min(30).max(65),
  metaDescription: z.string().trim().min(120).max(165),
  ogTitle: z.string().trim().max(120).nullable().optional(),
  ogDescription: z.string().trim().max(320).nullable().optional(),
  heroHeading: z.string().trim().min(5).max(160),
  heroIntroduction: z.string().trim().min(20).max(800),
  heroPrimaryCtaLabel: z.string().trim().min(2).max(80),
  heroSecondaryCtaLabel: z.string().trim().min(2).max(80),
  heroSecondaryCtaHref: z
    .string()
    .trim()
    .min(1)
    .max(500)
    .refine((value) => value.startsWith('/') || value.startsWith('http'), {
      message: 'Link must be a relative path or absolute URL',
    }),
  officialLinkLabel: z.string().trim().min(2).max(120),
  officialLinkHref: z
    .string()
    .trim()
    .min(1)
    .max(500)
    .refine((value) => value.startsWith('/') || value.startsWith('http'), {
      message: 'Link must be a relative path or absolute URL',
    }),
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

export const adminBlueRewardsSlotParamsSchema = z.object({
  slotKey: z.enum(BLUE_REWARDS_MEDIA_SLOTS),
})

export const adminBlueRewardsMediaMetaSchema = z.object({
  alt: z.string().trim().max(200).optional(),
  focalX: z.coerce.number().min(0).max(1).optional(),
  focalY: z.coerce.number().min(0).max(1).optional(),
})

export const adminBlueRewardsItemIdParamsSchema = z.object({
  id: z.string().trim().min(1).max(64),
})

export const adminBlueRewardsPrincipleBodySchema = z.object({
  numberLabel: z.string().trim().min(1).max(8),
  title: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(500),
  isEnabled: z.boolean(),
})

export const adminBlueRewardsRailCardBodySchema = z.object({
  cardType: z.enum(BLUE_REWARDS_RAIL_CARD_TYPES),
  title: z.string().trim().max(120),
  body: z.string().trim().max(600),
  linkLabel: z.string().trim().max(80).nullable().optional(),
  linkHref: optionalHref,
  factValue: z.string().trim().max(40).nullable().optional(),
  mediaAlt: z.string().trim().max(200).optional(),
  isEnabled: z.boolean(),
})

export const adminBlueRewardsPropertyBodySchema = z.object({
  title: z.string().trim().min(2).max(160),
  blurb: z.string().trim().min(10).max(600),
  mediaAlt: z.string().trim().max(200).optional(),
  isEnabled: z.boolean(),
})

export const adminBlueRewardsLogoBodySchema = z.object({
  name: z.string().trim().min(1).max(80),
  href: optionalHref,
  isEnabled: z.boolean(),
})

export const adminBlueRewardsMoveBodySchema = z.object({
  direction: z.enum(['up', 'down']),
})

export const adminBlueRewardsFaqBodySchema = z.object({
  question: z.string().trim().min(10).max(160),
  answer: z.string().trim().min(40).max(600),
  isEnabled: z.boolean(),
})

export type AdminBlueRewardsPageBody = z.infer<typeof adminBlueRewardsPageBodySchema>
export type AdminBlueRewardsSlotParams = z.infer<typeof adminBlueRewardsSlotParamsSchema>
export type AdminBlueRewardsItemIdParams = z.infer<typeof adminBlueRewardsItemIdParamsSchema>
export type AdminBlueRewardsPrincipleBody = z.infer<typeof adminBlueRewardsPrincipleBodySchema>
export type AdminBlueRewardsRailCardBody = z.infer<typeof adminBlueRewardsRailCardBodySchema>
export type AdminBlueRewardsPropertyBody = z.infer<typeof adminBlueRewardsPropertyBodySchema>
export type AdminBlueRewardsLogoBody = z.infer<typeof adminBlueRewardsLogoBodySchema>
export type AdminBlueRewardsMoveBody = z.infer<typeof adminBlueRewardsMoveBodySchema>
export type AdminBlueRewardsFaqBody = z.infer<typeof adminBlueRewardsFaqBodySchema>
