import { COPY } from '@/constants/copy'
import { HILTON_HOTELS_PATH, BLUE_REWARDS_PATH, WYNDHAM_HOTELS_PATH } from '@/constants/routes'

/** Legacy label for brand page modules until redirects land. */
export const BOOK_NOW_CTA_LABEL = 'Get Travel Assistance'

/** Kept for import stability; brand chrome is disabled site-wide. */
export const BRAND_PAGE_PATHS = [HILTON_HOTELS_PATH, WYNDHAM_HOTELS_PATH, BLUE_REWARDS_PATH]

export function getBrandPageChrome() {
  return null
}

export function isBrandPagePath() {
  return false
}

export function getPrimaryNavLinks(_pathname, navLinks) {
  return navLinks
}

export function getNavbarCtaLabel() {
  return COPY.cta.bookConsultation
}