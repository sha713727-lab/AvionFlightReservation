export const WYNDHAM_MEDIA_SLOTS = [
  'lead',
  'pairALeft',
  'pairARight',
  'pairBLeft',
  'pairBRight',
] as const

export type WyndhamMediaSlotKey = (typeof WYNDHAM_MEDIA_SLOTS)[number]

export const WYNDHAM_RAIL_CARD_TYPES = [
  'photo',
  'partnership',
  'fact',
  'capabilities',
  'standard',
] as const

export type WyndhamRailCardType = (typeof WYNDHAM_RAIL_CARD_TYPES)[number]

export interface WyndhamMediaSlotDto {
  id: string
  slotKey: string
  mediaUrl: string
  alt: string
  focalX: number
  focalY: number
}

export interface WyndhamPrincipleDto {
  id: string
  numberLabel: string
  title: string
  description: string
  sortOrder: number
  isEnabled: boolean
}

export interface WyndhamRailCardDto {
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

export interface WyndhamPropertyDto {
  id: string
  title: string
  blurb: string
  mediaUrl: string | null
  mediaAlt: string
  sortOrder: number
  isEnabled: boolean
}

export interface WyndhamClientLogoDto {
  id: string
  name: string
  mediaUrl: string
  href: string | null
  sortOrder: number
  isEnabled: boolean
}

export interface WyndhamPageDto {
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
  mediaSlots: WyndhamMediaSlotDto[]
  principles: WyndhamPrincipleDto[]
  railCards: WyndhamRailCardDto[]
  properties: WyndhamPropertyDto[]
  clientLogos: WyndhamClientLogoDto[]
  updatedAt: string
}
