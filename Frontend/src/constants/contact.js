export const PHONE_NUMBER = '+1 877 702 9887'
export const PHONE_HREF = 'tel:+18777029887'

export const RESERVATION_EMAIL = 'reservation@aviosupportdesk.com'
export const RESERVATION_EMAIL_HREF = `mailto:${RESERVATION_EMAIL}`

export const CONTACT_EMAILS = [RESERVATION_EMAIL]

export const MAILING_ADDRESS_LINES = [
  '100 King Street West, Suite 1500',
  'Toronto, ON M5X 1C9, Canada',
]

export const SUPPORT_HOURS = '24/7 Phone Support · 365 Days a Year'

export const CONTACT_LABELS = {
  columnTitle: 'Contact',
  mailingAddress: 'Mailing Address',
  phoneSupport: 'Phone Support',
  reservationEmail: 'Email',
  supportHours: 'Support Hours',
}

export const SITE_NAME = 'Avion Flight Reservation'

/** Canonical production origin — always https + non-www. */
export const CANONICAL_ORIGIN = 'https://aviosupportdesk.com'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_ORIGIN

export const SITE_DESCRIPTION =
  'Book flights and hotels with Avion Flight Reservation. Independent travel assistance for USA and Canada. Call +1 877 702 9887 for 24/7 flight reservation support.'

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
