import { buildCanonicalUrl } from '@/constants/contact'
import {
  ABOUT_PATH,
  BAGGAGE_ASSISTANCE_PATH,
  BLOG_AIRLINE_CONTACT_GUIDE_PATH,
  BLOG_CANCEL_FLIGHT_REFUND_PATH,
  BLOG_CHANGE_FLIGHT_PATH,
  BLOG_DELAY_COMPENSATION_PATH,
  BLOG_PATH,
  BLOG_SAVE_MONEY_FLIGHTS_PATH,
  CANCELLATION_POLICY_PATH,
  CONTACT_PATH,
  COOKIE_POLICY_PATH,
  DESTINATIONS_PATH,
  FLIGHT_BOOKING_PATH,
  FLIGHT_CANCELLATION_PATH,
  FLIGHT_CHANGES_PATH,
  GUIDE_BAGGAGE_PATH,
  GUIDE_FLIGHT_BOOKING_PATH,
  GUIDE_FLIGHT_CANCELLATIONS_PATH,
  GUIDE_FLIGHT_CHANGES_PATH,
  GUIDE_POINTS_PATH,
  GUIDES_PATH,
  HOME_PATH,
  HOTEL_BOOKING_PATH,
  INTERNATIONAL_FLIGHT_PATH,
  POINTS_REDEMPTION_PATH,
  PRIVACY_POLICY_PATH,
  REFUND_POLICY_PATH,
  SEAT_SELECTION_PATH,
  SERVICES_PATH,
  TERMS_PATH,
  TRIP_PLANNING_PATH,
} from '@/constants/routes'

/** Short breadcrumb labels (not full H1s). */
export const BREADCRUMB_LABELS = {
  [HOME_PATH]: 'Home',
  [SERVICES_PATH]: 'Services',
  [DESTINATIONS_PATH]: 'Destinations',
  [INTERNATIONAL_FLIGHT_PATH]: 'International Flights',
  [FLIGHT_BOOKING_PATH]: 'Flight Booking',
  [HOTEL_BOOKING_PATH]: 'Hotel Booking',
  [POINTS_REDEMPTION_PATH]: 'Points Redemption',
  [FLIGHT_CHANGES_PATH]: 'Flight Changes',
  [FLIGHT_CANCELLATION_PATH]: 'Flight Cancellation',
  [SEAT_SELECTION_PATH]: 'Seat Selection',
  [BAGGAGE_ASSISTANCE_PATH]: 'Baggage Assistance',
  [TRIP_PLANNING_PATH]: 'Trip Planning',
  [GUIDES_PATH]: 'Guides',
  [GUIDE_FLIGHT_BOOKING_PATH]: 'Flight Booking',
  [GUIDE_FLIGHT_CHANGES_PATH]: 'Flight Changes',
  [GUIDE_FLIGHT_CANCELLATIONS_PATH]: 'Flight Cancellations',
  [GUIDE_BAGGAGE_PATH]: 'Baggage',
  [GUIDE_POINTS_PATH]: 'Points & Miles',
  [BLOG_PATH]: 'Blog',
  [BLOG_CANCEL_FLIGHT_REFUND_PATH]: 'Cancel & Refund',
  [BLOG_AIRLINE_CONTACT_GUIDE_PATH]: 'Airline Contacts',
  [BLOG_DELAY_COMPENSATION_PATH]: 'Delay Compensation',
  [BLOG_CHANGE_FLIGHT_PATH]: 'Change Flight',
  [BLOG_SAVE_MONEY_FLIGHTS_PATH]: 'Save on Flights',
  [ABOUT_PATH]: 'About',
  [CONTACT_PATH]: 'Contact',
  [PRIVACY_POLICY_PATH]: 'Privacy Policy',
  [CANCELLATION_POLICY_PATH]: 'Cancellation Policy',
  [TERMS_PATH]: 'Terms of Service',
  [REFUND_POLICY_PATH]: 'Refund Policy',
  [COOKIE_POLICY_PATH]: 'Cookie Policy',
}

function crumb(path) {
  return { name: BREADCRUMB_LABELS[path], path }
}

const HOME = crumb(HOME_PATH)
const SERVICES = crumb(SERVICES_PATH)
const GUIDES = crumb(GUIDES_PATH)
const BLOG = crumb(BLOG_PATH)

/**
 * Breadcrumb trails for every public page except homepage.
 * Paths follow URL hierarchy; service landings nest under Services; guides under Guides.
 */
export const BREADCRUMB_TRAILS = {
  [SERVICES_PATH]: [HOME, SERVICES],
  [DESTINATIONS_PATH]: [HOME, crumb(DESTINATIONS_PATH)],
  [INTERNATIONAL_FLIGHT_PATH]: [HOME, crumb(INTERNATIONAL_FLIGHT_PATH)],
  [FLIGHT_BOOKING_PATH]: [HOME, SERVICES, crumb(FLIGHT_BOOKING_PATH)],
  [HOTEL_BOOKING_PATH]: [HOME, SERVICES, crumb(HOTEL_BOOKING_PATH)],
  [POINTS_REDEMPTION_PATH]: [HOME, SERVICES, crumb(POINTS_REDEMPTION_PATH)],
  [FLIGHT_CHANGES_PATH]: [HOME, SERVICES, crumb(FLIGHT_CHANGES_PATH)],
  [FLIGHT_CANCELLATION_PATH]: [HOME, SERVICES, crumb(FLIGHT_CANCELLATION_PATH)],
  [SEAT_SELECTION_PATH]: [HOME, SERVICES, crumb(SEAT_SELECTION_PATH)],
  [BAGGAGE_ASSISTANCE_PATH]: [HOME, SERVICES, crumb(BAGGAGE_ASSISTANCE_PATH)],
  [TRIP_PLANNING_PATH]: [HOME, SERVICES, crumb(TRIP_PLANNING_PATH)],
  [GUIDES_PATH]: [HOME, GUIDES],
  [GUIDE_FLIGHT_BOOKING_PATH]: [HOME, GUIDES, crumb(GUIDE_FLIGHT_BOOKING_PATH)],
  [GUIDE_FLIGHT_CHANGES_PATH]: [HOME, GUIDES, crumb(GUIDE_FLIGHT_CHANGES_PATH)],
  [GUIDE_FLIGHT_CANCELLATIONS_PATH]: [HOME, GUIDES, crumb(GUIDE_FLIGHT_CANCELLATIONS_PATH)],
  [GUIDE_BAGGAGE_PATH]: [HOME, GUIDES, crumb(GUIDE_BAGGAGE_PATH)],
  [GUIDE_POINTS_PATH]: [HOME, GUIDES, crumb(GUIDE_POINTS_PATH)],
  [BLOG_PATH]: [HOME, BLOG],
  [BLOG_CANCEL_FLIGHT_REFUND_PATH]: [HOME, BLOG, crumb(BLOG_CANCEL_FLIGHT_REFUND_PATH)],
  [BLOG_AIRLINE_CONTACT_GUIDE_PATH]: [HOME, BLOG, crumb(BLOG_AIRLINE_CONTACT_GUIDE_PATH)],
  [BLOG_DELAY_COMPENSATION_PATH]: [HOME, BLOG, crumb(BLOG_DELAY_COMPENSATION_PATH)],
  [BLOG_CHANGE_FLIGHT_PATH]: [HOME, BLOG, crumb(BLOG_CHANGE_FLIGHT_PATH)],
  [BLOG_SAVE_MONEY_FLIGHTS_PATH]: [HOME, BLOG, crumb(BLOG_SAVE_MONEY_FLIGHTS_PATH)],
  [ABOUT_PATH]: [HOME, crumb(ABOUT_PATH)],
  [CONTACT_PATH]: [HOME, crumb(CONTACT_PATH)],
  [PRIVACY_POLICY_PATH]: [HOME, crumb(PRIVACY_POLICY_PATH)],
  [CANCELLATION_POLICY_PATH]: [HOME, crumb(CANCELLATION_POLICY_PATH)],
  [TERMS_PATH]: [HOME, crumb(TERMS_PATH)],
  [REFUND_POLICY_PATH]: [HOME, crumb(REFUND_POLICY_PATH)],
  [COOKIE_POLICY_PATH]: [HOME, crumb(COOKIE_POLICY_PATH)],
}

export function getBreadcrumbTrail(path) {
  return BREADCRUMB_TRAILS[path]
}

/** Visible nav items: { label, href } */
export function getBreadcrumbNavItems(path) {
  const trail = getBreadcrumbTrail(path)
  if (!trail) {
    return null
  }
  return trail.map((item) => ({ label: item.name, href: item.path }))
}

export function buildBreadcrumbJsonLd(path) {
  const trail = getBreadcrumbTrail(path)
  if (!trail) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: buildCanonicalUrl(item.path),
    })),
  }
}

/** Append BreadcrumbList JSON-LD to one or more page schemas. */
export function withBreadcrumbJsonLd(path, schemaOrList) {
  const crumb = buildBreadcrumbJsonLd(path)
  const list = Array.isArray(schemaOrList) ? schemaOrList : [schemaOrList]
  return crumb ? [...list, crumb] : list
}
