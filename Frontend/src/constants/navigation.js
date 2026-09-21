import {
  ABOUT_PATH,
  BAGGAGE_ASSISTANCE_PATH,
  BLOG_PATH,
  CANCELLATION_POLICY_PATH,
  CONTACT_PATH,
  COOKIE_POLICY_PATH,
  DESTINATIONS_PATH,
  FLIGHT_BOOKING_PATH,
  FLIGHT_CANCELLATION_PATH,
  FLIGHT_CHANGES_PATH,
  GUIDES_PATH,
  HOME_PATH,
  HOW_IT_WORKS_PATH,
  HOTEL_BOOKING_PATH,
  INDEPENDENT_SERVICE_DISCLOSURE_PATH,
  INTERNATIONAL_FLIGHT_PATH,
  POINTS_REDEMPTION_PATH,
  PRIVACY_POLICY_PATH,
  REFUND_POLICY_PATH,
  SEAT_SELECTION_PATH,
  SERVICE_FEES_PATH,
  SERVICES_PATH,
  TERMS_PATH,
  TRIP_PLANNING_PATH,
} from '@/constants/routes'

export const FOOTER_DISCLAIMER_HASH = '#disclaimer'
export const LEGAL_NAV_LABEL = 'Legal'

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: PRIVACY_POLICY_PATH },
  { label: 'Terms of Service', href: TERMS_PATH },
  { label: 'Refund Policy', href: REFUND_POLICY_PATH },
  { label: 'Cancellation Policy', href: CANCELLATION_POLICY_PATH },
  { label: 'Cookie Policy', href: COOKIE_POLICY_PATH },
  { label: 'Service Fees', href: SERVICE_FEES_PATH },
  { label: 'Independent Service Disclosure', href: INDEPENDENT_SERVICE_DISCLOSURE_PATH },
  { label: 'Disclaimer', href: FOOTER_DISCLAIMER_HASH },
]

/** Always-visible footer legal links (every page). */
export const FOOTER_PRIMARY_LEGAL_LINKS = [
  { label: 'Privacy Policy', href: PRIVACY_POLICY_PATH },
  { label: 'Terms of Service', href: TERMS_PATH },
]

export const NAV_LINKS = [
  { label: 'Points & Flight Help', href: POINTS_REDEMPTION_PATH },
  { label: 'How It Works', href: HOW_IT_WORKS_PATH },
  { label: 'Service Fees', href: SERVICE_FEES_PATH },
  { label: 'Guides', href: GUIDES_PATH },
  { label: 'About', href: ABOUT_PATH },
  { label: 'Contact', href: CONTACT_PATH },
]

/** Secondary destinations kept out of primary nav prominence (audit §7). */
export const SECONDARY_NAV_LINKS = [
  { label: 'Services', href: SERVICES_PATH },
  { label: 'Destinations', href: DESTINATIONS_PATH },
  { label: 'Blog', href: BLOG_PATH },
]

export const FOOTER_LINKS = {
  company: [
    { label: 'AvioSupportDesk home', href: HOME_PATH },
    { label: 'about AvioSupportDesk', href: ABOUT_PATH },
    { label: 'contact travel support', href: CONTACT_PATH },
    { label: 'how it works', href: HOW_IT_WORKS_PATH },
    { label: 'service fees', href: SERVICE_FEES_PATH },
    { label: 'flight destinations', href: DESTINATIONS_PATH },
    { label: 'international flights by phone', href: INTERNATIONAL_FLIGHT_PATH },
    { label: 'travel guides hub', href: GUIDES_PATH },
    { label: 'AvioSupportDesk blog', href: BLOG_PATH },
    { label: 'all travel services', href: SERVICES_PATH },
  ],
  services: [
    { label: 'flight booking assistance', href: FLIGHT_BOOKING_PATH },
    { label: 'hotel booking by phone', href: HOTEL_BOOKING_PATH },
    { label: 'points and miles redemption help', href: POINTS_REDEMPTION_PATH },
    { label: 'flight change assistance', href: FLIGHT_CHANGES_PATH },
    { label: 'flight cancellation assistance', href: FLIGHT_CANCELLATION_PATH },
    { label: 'airline seat selection help', href: SEAT_SELECTION_PATH },
    { label: 'baggage allowance and fee help', href: BAGGAGE_ASSISTANCE_PATH },
    { label: 'custom trip planning by phone', href: TRIP_PLANNING_PATH },
  ],
  legal: LEGAL_LINKS,
}
