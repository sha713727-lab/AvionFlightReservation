export const BLUE_REWARDS_MEDIA_SLOTS = [
  'lead',
  'pairALeft',
  'pairARight',
  'pairBLeft',
  'pairBRight',
] as const

export type BlueRewardsMediaSlotKey = (typeof BLUE_REWARDS_MEDIA_SLOTS)[number]

export const BLUE_REWARDS_RAIL_CARD_TYPES = [
  'photo',
  'partnership',
  'fact',
  'capabilities',
  'standard',
] as const

export type BlueRewardsRailCardType = (typeof BLUE_REWARDS_RAIL_CARD_TYPES)[number]

export interface BlueRewardsMediaSlotDto {
  id: string
  slotKey: string
  mediaUrl: string
  alt: string
  focalX: number
  focalY: number
}

export interface BlueRewardsPrincipleDto {
  id: string
  numberLabel: string
  title: string
  description: string
  sortOrder: number
  isEnabled: boolean
}

export interface BlueRewardsRailCardDto {
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

export interface BlueRewardsPropertyDto {
  id: string
  title: string
  blurb: string
  mediaUrl: string | null
  mediaAlt: string
  sortOrder: number
  isEnabled: boolean
}

export interface BlueRewardsClientLogoDto {
  id: string
  name: string
  mediaUrl: string
  href: string | null
  sortOrder: number
  isEnabled: boolean
}

export interface BlueRewardsFaqDto {
  id: string
  question: string
  answer: string
  sortOrder: number
  isEnabled: boolean
}

export interface BlueRewardsPageDto {
  id: string
  status: string
  metaTitle: string
  metaDescription: string
  ogTitle: string | null
  ogDescription: string | null
  heroHeading: string
  heroIntroduction: string
  heroPrimaryCtaLabel: string
  heroSecondaryCtaLabel: string
  heroSecondaryCtaHref: string
  officialLinkLabel: string
  officialLinkHref: string
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
  mediaSlots: BlueRewardsMediaSlotDto[]
  principles: BlueRewardsPrincipleDto[]
  railCards: BlueRewardsRailCardDto[]
  properties: BlueRewardsPropertyDto[]
  clientLogos: BlueRewardsClientLogoDto[]
  faqs: BlueRewardsFaqDto[]
  updatedAt: string
}
