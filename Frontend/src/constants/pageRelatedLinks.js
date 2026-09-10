import {
  ABOUT_PATH,
  BAGGAGE_ASSISTANCE_PATH,
  CANCELLATION_POLICY_PATH,
  CONTACT_PATH,
  COOKIE_POLICY_PATH,
  DESTINATIONS_PATH,
  FLIGHT_BOOKING_PATH,
  FLIGHT_CANCELLATION_PATH,
  BLOG_PATH,
  BLOG_CANCEL_FLIGHT_REFUND_PATH,
  GUIDES_PATH,
  GUIDE_FLIGHT_BOOKING_PATH,
  HOME_PATH,
  HOTEL_BOOKING_PATH,
  INTERNATIONAL_FLIGHT_PATH,
  PRIVACY_POLICY_PATH,
  REFUND_POLICY_PATH,
  SERVICES_PATH,
  TERMS_PATH,
  TRIP_PLANNING_PATH,
} from '@/constants/routes'

/** Static marketing / legal pages — 3–5 keyword-rich outbound links each. */
export const PAGE_RELATED_LINKS = {
  [ABOUT_PATH]: [
    { href: SERVICES_PATH, label: 'flight and travel services' },
    { href: CONTACT_PATH, label: 'contact AvioSupportDesk' },
    { href: FLIGHT_BOOKING_PATH, label: 'flight booking assistance' },
    { href: GUIDES_PATH, label: 'travel guides hub' },
  ],
  [CONTACT_PATH]: [
    { href: FLIGHT_BOOKING_PATH, label: 'book flights by phone' },
    { href: FLIGHT_CANCELLATION_PATH, label: 'flight cancellation assistance' },
    { href: SERVICES_PATH, label: 'all travel services' },
    { href: ABOUT_PATH, label: 'about AvioSupportDesk' },
  ],
  [SERVICES_PATH]: [
    { href: FLIGHT_BOOKING_PATH, label: 'flight booking assistance' },
    { href: HOTEL_BOOKING_PATH, label: 'hotel booking by phone' },
    { href: TRIP_PLANNING_PATH, label: 'custom trip planning' },
    { href: CONTACT_PATH, label: 'contact travel support' },
    { href: GUIDES_PATH, label: 'practical travel guides' },
  ],
  [DESTINATIONS_PATH]: [
    { href: FLIGHT_BOOKING_PATH, label: 'flight booking assistance' },
    { href: INTERNATIONAL_FLIGHT_PATH, label: 'international flights by phone' },
    { href: TRIP_PLANNING_PATH, label: 'multi-city trip planning' },
    { href: CONTACT_PATH, label: 'contact destination specialists' },
  ],
  [INTERNATIONAL_FLIGHT_PATH]: [
    { href: FLIGHT_BOOKING_PATH, label: 'flight booking assistance' },
    { href: TRIP_PLANNING_PATH, label: 'custom trip planning' },
    { href: BAGGAGE_ASSISTANCE_PATH, label: 'baggage allowance help' },
    { href: CONTACT_PATH, label: 'contact international flight help' },
    { href: DESTINATIONS_PATH, label: 'popular flight destinations' },
  ],
  [GUIDES_PATH]: [
    { href: GUIDE_FLIGHT_BOOKING_PATH, label: 'how to book a flight by phone' },
    { href: FLIGHT_BOOKING_PATH, label: 'flight booking assistance' },
    { href: SERVICES_PATH, label: 'all travel services' },
    { href: CONTACT_PATH, label: 'contact travel specialists' },
    { href: BLOG_PATH, label: 'AvioSupportDesk blog' },
  ],
  [BLOG_PATH]: [
    { href: BLOG_CANCEL_FLIGHT_REFUND_PATH, label: 'cancel flight refund guide' },
    { href: FLIGHT_BOOKING_PATH, label: 'flight booking assistance' },
    { href: FLIGHT_CANCELLATION_PATH, label: 'flight cancellation assistance' },
    { href: GUIDES_PATH, label: 'travel guides hub' },
    { href: CONTACT_PATH, label: 'contact AvioSupportDesk' },
  ],
  [PRIVACY_POLICY_PATH]: [
    { href: TERMS_PATH, label: 'terms and conditions' },
    { href: COOKIE_POLICY_PATH, label: 'cookie policy' },
    { href: CONTACT_PATH, label: 'contact AvioSupportDesk' },
    { href: HOME_PATH, label: 'AvioSupportDesk home' },
  ],
  [CANCELLATION_POLICY_PATH]: [
    { href: FLIGHT_CANCELLATION_PATH, label: 'flight cancellation assistance' },
    { href: REFUND_POLICY_PATH, label: 'refund policy' },
    { href: CONTACT_PATH, label: 'contact travel support' },
    { href: SERVICES_PATH, label: 'all travel services' },
  ],
  [TERMS_PATH]: [
    { href: PRIVACY_POLICY_PATH, label: 'privacy policy' },
    { href: REFUND_POLICY_PATH, label: 'refund policy' },
    { href: CONTACT_PATH, label: 'contact AvioSupportDesk' },
    { href: ABOUT_PATH, label: 'about AvioSupportDesk' },
  ],
  [REFUND_POLICY_PATH]: [
    { href: FLIGHT_CANCELLATION_PATH, label: 'flight cancellation assistance' },
    { href: CANCELLATION_POLICY_PATH, label: 'cancellation policy' },
    { href: CONTACT_PATH, label: 'contact refund help' },
    { href: HOME_PATH, label: 'AvioSupportDesk home' },
  ],
  [COOKIE_POLICY_PATH]: [
    { href: PRIVACY_POLICY_PATH, label: 'privacy policy' },
    { href: TERMS_PATH, label: 'terms and conditions' },
    { href: CONTACT_PATH, label: 'contact AvioSupportDesk' },
    { href: HOME_PATH, label: 'AvioSupportDesk home' },
  ],
}

export function getPageRelatedLinks(path) {
  return PAGE_RELATED_LINKS[path]
}
