export const HILTON_MEDIA_SLOTS = [
  'lead',
  'pairALeft',
  'pairARight',
  'pairBLeft',
  'pairBRight',
] as const

export type HiltonMediaSlotKey = (typeof HILTON_MEDIA_SLOTS)[number]

export const HILTON_RAIL_CARD_TYPES = [
  'photo',
  'partnership',
  'fact',
  'capabilities',
  'standard',
] as const

export type HiltonRailCardType = (typeof HILTON_RAIL_CARD_TYPES)[number]

export interface HiltonMediaSlotDto {
  id: string
  slotKey: string
  mediaUrl: string
  alt: string
  focalX: number
  focalY: number
}

export interface HiltonPrincipleDto {
  id: string
  numberLabel: string
  title: string
  description: string
  sortOrder: number
  isEnabled: boolean
}

export interface HiltonRailCardDto {
  id: string
  cardType: string
  title: string
  body: string
  linkLabel: string | null
  linkHref: string | null
  factValue: string | null
  mediaUrl: string | null
  mediaAlt: string
  sortOrder: number
  isEnabled: boolean
}

export interface HiltonPropertyDto {
  id: string
  title: string
  blurb: string
  mediaUrl: string | null
  mediaAlt: string
  sortOrder: number
  isEnabled: boolean
}

export interface HiltonClientLogoDto {
  id: string
  name: string
  mediaUrl: string
  href: string | null
  sortOrder: number
  isEnabled: boolean
}

export interface HiltonFaqDto {
  id: string
  question: string
  answer: string
  sortOrder: number
  isEnabled: boolean
}

export interface HiltonPageDto {
  id: string
  status: string
  metaTitle: string
  metaDescription: string
  ogTitle: string | null
  ogDescription: string | null
  heroHeading: string
  heroIntroduction: string
  storyLabel: string
  storyParagraphs: string[]
  storyCtaLabel: string
  storyCtaHref: string
  principlesHeading: string
  clientsEnabled: boolean
  clientsHeading: string
  clientsIntroduction: string
  railLabel: string
  contactEmailOverride: string | null
  mediaSlots: HiltonMediaSlotDto[]
  principles: HiltonPrincipleDto[]
  railCards: HiltonRailCardDto[]
  properties: HiltonPropertyDto[]
  clientLogos: HiltonClientLogoDto[]
  faqs: HiltonFaqDto[]
  updatedAt: string
}
