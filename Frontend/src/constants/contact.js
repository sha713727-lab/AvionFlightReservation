import { BUSINESS_FACTS } from '@/constants/businessFacts'

export const PHONE_NUMBER = '+1 877 702 9887'
export const PHONE_HREF = 'tel:+18777029887'

export const RESERVATION_EMAIL = 'reservation@aviosupportdesk.com'
export const RESERVATION_EMAIL_HREF = `mailto:${RESERVATION_EMAIL}`

export const CONTACT_EMAILS = [RESERVATION_EMAIL]

/** Correspondence address only — not a staffed walk-in office. */
export const MAILING_ADDRESS = {
  streetAddress: '100 King Street West, Suite 1500',
  addressLocality: 'Toronto',
  addressRegion: 'ON',
  postalCode: 'M5X 1C9',
  addressCountry: 'CA',
}

export const MAILING_ADDRESS_LINES = [
  MAILING_ADDRESS.streetAddress,
  `${MAILING_ADDRESS.addressLocality}, ${MAILING_ADDRESS.addressRegion} ${MAILING_ADDRESS.postalCode}, Canada`,
]

/** Owner must verify staffed hours before treating this as a public promise. */
export const SUPPORT_HOURS = BUSINESS_FACTS.supportHours

export const CONTACT_LABELS = {
  columnTitle: 'Contact',
  mailingAddress: 'Mailing address (correspondence)',
  phoneSupport: 'Phone Support',
  reservationEmail: 'Email',
  supportHours: 'Support Hours',
}

export const SITE_NAME = 'AvioSupportDesk'

/** Canonical production origin — always https + non-www. */
export const CANONICAL_ORIGIN = 'https://aviosupportdesk.com'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_ORIGIN

export const SITE_DESCRIPTION =
  'Independent help comparing Avion points and flight options. AvioSupportDesk quotes a separate assistance fee before you agree. Not affiliated with RBC or Avion Rewards.'

/**
 * Absolute canonical URL for a site path.
 * Homepage → https://aviosupportdesk.com/
 * Other pages → https://aviosupportdesk.com/path (no trailing slash)
 */
export function buildCanonicalUrl(path = '/') {
  if (!path || path === '/') {
    return `${CANONICAL_ORIGIN}/`
  }

  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${CANONICAL_ORIGIN}${normalized.replace(/\/+$/, '')}`
}
