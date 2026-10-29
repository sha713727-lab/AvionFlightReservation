import { COPY } from '@/constants/copy'
import {
  BLUE_REWARDS_PATH,
  HILTON_HOTELS_PATH,
  POINTS_REDEMPTION_PATH,
  WYNDHAM_HOTELS_PATH,
} from '@/constants/routes'
import { BLUE_REWARDS_DISCLOSURE } from '@/modules/blueRewards/constants/copy'
import { HILTON_DISCLOSURE } from '@/modules/hiltonHotels/constants/copy'
import { WYNDHAM_DISCLOSURE } from '@/modules/wyndhamHotels/constants/copy'

export const BOOK_NOW_CTA_LABEL = 'Book Now'

export const BRAND_PAGE_PATHS = [
  HILTON_HOTELS_PATH,
  WYNDHAM_HOTELS_PATH,
  BLUE_REWARDS_PATH,
]

const HILTON_CHROME = {
  floatingDisclosure:
    'AvioSupportDesk is an independent travel assistance service. We are not affiliated with Hilton Worldwide, Hilton Hotels & Resorts, or Hilton Honors.',
  footerTagline: 'Independent Hilton hotel booking help by phone.',
  footerDisclaimer: HILTON_DISCLOSURE,
  callModalDescription:
    'Speak with AvioSupportDesk about Hilton hotel dates, rates, and booking help within our stated scope.',
  callModalDisclosure: HILTON_DISCLOSURE,
  navbarCtaLabel: BOOK_NOW_CTA_LABEL,
  logoTagline: 'Independent Hilton hotel help',
  aboutCtaTitle: 'Ready to book a Hilton stay?',
  aboutCtaDescription:
    'Request independent phone help reviewing Hilton dates, rates, and options. Fees are quoted before paid work begins.',
  aboutCtaLabel: BOOK_NOW_CTA_LABEL,
}

const WYNDHAM_CHROME = {
  floatingDisclosure:
    'AvioSupportDesk is an independent travel assistance service. We are not affiliated with Wyndham Hotels & Resorts or Wyndham Rewards.',
  footerTagline: 'Independent Wyndham hotel booking help by phone.',
  footerDisclaimer: WYNDHAM_DISCLOSURE,
  callModalDescription:
    'Speak with AvioSupportDesk about Wyndham hotel dates, rates, and booking help within our stated scope.',
  callModalDisclosure: WYNDHAM_DISCLOSURE,
  navbarCtaLabel: BOOK_NOW_CTA_LABEL,
  logoTagline: 'Independent Wyndham hotel help',
  aboutCtaTitle: 'Ready to book a Wyndham stay?',
  aboutCtaDescription:
    'Request independent phone help reviewing Wyndham dates, rates, and options. Fees are quoted before paid work begins.',
  aboutCtaLabel: BOOK_NOW_CTA_LABEL,
}

const BLUE_REWARDS_CHROME = {
  floatingDisclosure:
    'AvioSupportDesk is an independent travel assistance service. We are not affiliated with Blue Rewards or BMO.',
  footerTagline: 'Independent Blue Rewards travel redemption help.',
  footerDisclaimer: BLUE_REWARDS_DISCLOSURE,
  callModalDescription:
    'Speak with AvioSupportDesk about Blue Rewards travel options and redemption help within our stated scope.',
  callModalDisclosure: BLUE_REWARDS_DISCLOSURE,
  navbarCtaLabel: BOOK_NOW_CTA_LABEL,
  logoTagline: 'Independent Blue Rewards travel help',
  aboutCtaTitle: 'Ready to redeem Blue Rewards for travel?',
  aboutCtaDescription:
    'Request independent help comparing Blue Rewards travel options. Fees are quoted before paid work begins.',
  aboutCtaLabel: BOOK_NOW_CTA_LABEL,
}

const CHROME_BY_PATH = {
  [HILTON_HOTELS_PATH]: HILTON_CHROME,
  [WYNDHAM_HOTELS_PATH]: WYNDHAM_CHROME,
  [BLUE_REWARDS_PATH]: BLUE_REWARDS_CHROME,
}

/** Brand-scoped chrome for Hilton / Wyndham / Blue Rewards; null on all other routes. */
export function getBrandPageChrome(pathname) {
  if (!pathname) return null
  return CHROME_BY_PATH[pathname] ?? null
}

export function isBrandPagePath(pathname) {
  return Boolean(getBrandPageChrome(pathname))
}

/** Primary nav links — omit Points & Flight Help on brand hotel/rewards pages. */
export function getPrimaryNavLinks(pathname, navLinks) {
  const chrome = getBrandPageChrome(pathname)
  if (!chrome) return navLinks
  return navLinks.filter((link) => link.href !== POINTS_REDEMPTION_PATH)
}

export function getNavbarCtaLabel(pathname) {
  const chrome = getBrandPageChrome(pathname)
  return chrome?.navbarCtaLabel ?? COPY.cta.bookConsultation
}
