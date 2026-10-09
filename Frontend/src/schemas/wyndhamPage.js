import { z } from 'zod'

const mediaSlotSchema = z.object({
  id: z.string(),
  slotKey: z.string(),
  mediaUrl: z.string(),
  alt: z.string(),
  focalX: z.number(),
  focalY: z.number(),
})

const principleSchema = z.object({
  id: z.string(),
  numberLabel: z.string(),
  title: z.string(),
  description: z.string(),
  sortOrder: z.number(),
  isEnabled: z.boolean(),
})

const railCardSchema = z.object({
  id: z.string(),
  cardType: z.string(),
  title: z.string(),
  body: z.string(),
  linkLabel: z.string().nullable(),
  linkHref: z.string().nullable(),
  factValue: z.string().nullable(),
  mediaUrl: z.string().nullable(),
  mediaAlt: z.string(),
  sortOrder: z.number(),
  isEnabled: z.boolean(),
})

const propertySchema = z.object({
  id: z.string(),
  title: z.string(),
  blurb: z.string(),
  mediaUrl: z.string().nullable(),
  mediaAlt: z.string(),
  sortOrder: z.number(),
  isEnabled: z.boolean(),
})

const logoSchema = z.object({
  id: z.string(),
  name: z.string(),
  mediaUrl: z.string(),
  href: z.string().nullable(),
  sortOrder: z.number(),
  isEnabled: z.boolean(),
})

const faqSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  sortOrder: z.number(),
  isEnabled: z.boolean(),
})

export const wyndhamPageSchema = z.object({
  id: z.string(),
  status: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  ogTitle: z.string().nullable(),
  ogDescription: z.string().nullable(),
  heroHeading: z.string(),
  heroIntroduction: z.string(),
  storyLabel: z.string(),
  storyParagraphs: z.array(z.string()),
  storyCtaLabel: z.string(),
  storyCtaHref: z.string(),
  principlesHeading: z.string(),
  clientsEnabled: z.boolean(),
  clientsHeading: z.string(),
  clientsIntroduction: z.string(),
  railLabel: z.string(),
  contactEmailOverride: z.string().nullable(),
  mediaSlots: z.array(mediaSlotSchema),
  principles: z.array(principleSchema),
  railCards: z.array(railCardSchema),
  properties: z.array(propertySchema),
  clientLogos: z.array(logoSchema),
  faqs: z.array(faqSchema),
  updatedAt: z.string(),
})

export const adminWyndhamPageFormSchema = z.object({
  status: z.enum(['draft', 'published']),
  metaTitle: z.string().trim().min(30).max(65),
  metaDescription: z.string().trim().min(120).max(165),
  ogTitle: z.string().trim().max(120).optional(),
  ogDescription: z.string().trim().max(320).optional(),
  heroHeading: z.string().trim().min(5).max(160),
  heroIntroduction: z.string().trim().min(20).max(500),
  storyLabel: z.string().trim().min(2).max(80),
  storyParagraphsText: z.string().trim().min(10),
  storyCtaLabel: z.string().trim().min(2).max(80),
  storyCtaHref: z.string().trim().min(1).max(500),
  principlesHeading: z.string().trim().min(2).max(120),
  clientsEnabled: z.boolean(),
  clientsHeading: z.string().trim().max(160),
  clientsIntroduction: z.string().trim().max(500),
  railLabel: z.string().trim().min(2).max(120),
  contactEmailOverride: z.string().trim().max(160),
})

export const adminWyndhamFaqFormSchema = z.object({
  question: z.string().trim().min(10).max(160),
  answer: z.string().trim().min(40).max(600),
  isEnabled: z.boolean(),
})
