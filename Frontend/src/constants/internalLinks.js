import {
  BAGGAGE_ASSISTANCE_PATH,
  CONTACT_PATH,
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
  SEAT_SELECTION_PATH,
  SERVICES_PATH,
  TRIP_PLANNING_PATH,
} from '@/constants/routes'

export { getPageRelatedLinks } from '@/constants/pageRelatedLinks'

/** All main service/product pages — homepage must link to each. */
export const MAIN_SERVICE_LINKS = [
  {
    href: FLIGHT_BOOKING_PATH,
    title: 'Flight Booking',
    anchor: 'flight booking assistance',
    description: 'Book domestic and international flights by phone with clear fare guidance.',
  },
  {
    href: HOTEL_BOOKING_PATH,
    title: 'Hotel Booking',
    anchor: 'hotel booking by phone',
    description: 'Reserve stays with cancellation terms and resort fees explained upfront.',
  },
  {
    href: POINTS_REDEMPTION_PATH,
    title: 'Points Redemption',
    anchor: 'points and miles redemption help',
    description: 'Independent guidance for award space, transfers, and surcharge trade-offs.',
  },
  {
    href: FLIGHT_CHANGES_PATH,
    title: 'Flight Changes',
    anchor: 'flight change assistance',
    description: 'Rebook dates or times with change fees quoted before anything is submitted.',
  },
  {
    href: FLIGHT_CANCELLATION_PATH,
    title: 'Flight Cancellation',
    anchor: 'flight cancellation assistance',
    description: 'Cancel tickets with a clear read on refunds versus airline travel credits.',
  },
  {
    href: SEAT_SELECTION_PATH,
    title: 'Seat Selection',
    anchor: 'airline seat selection help',
    description: 'Choose seats, seat families together, and understand preferred-seat fees.',
  },
  {
    href: BAGGAGE_ASSISTANCE_PATH,
    title: 'Baggage Assistance',
    anchor: 'baggage allowance and fee help',
    description: 'Confirm carry-on rules, checked bag fees, and prepaid bag options.',
  },
  {
    href: TRIP_PLANNING_PATH,
    title: 'Trip Planning',
    anchor: 'custom trip planning by phone',
    description: 'Build multi-city itineraries with realistic connection and hotel timing.',
  },
  {
    href: INTERNATIONAL_FLIGHT_PATH,
    title: 'International Flights',
    anchor: 'international flights by phone',
    description: 'Long-haul and transborder booking help with connection buffers explained.',
  },
]

const byHref = Object.fromEntries(MAIN_SERVICE_LINKS.map((item) => [item.href, item]))

function serviceCard(href) {
  return byHref[href]
}

/**
 * Per service-page internal links: home, contact, related services, guides.
 * Keyword-rich anchors only — no “click here” / “learn more”.
 */
export const SERVICE_INTERNAL_LINKS = {
  [FLIGHT_BOOKING_PATH]: {
    home: { href: HOME_PATH, label: 'AvioSupportDesk home' },
    contact: { href: CONTACT_PATH, label: 'contact flight support' },
    relatedServices: [
      serviceCard(FLIGHT_CHANGES_PATH),
      serviceCard(SEAT_SELECTION_PATH),
      serviceCard(BAGGAGE_ASSISTANCE_PATH),
    ],
    relatedGuides: [
      { href: GUIDE_FLIGHT_BOOKING_PATH, label: 'how to book a flight by phone' },
      { href: GUIDE_POINTS_PATH, label: 'points and miles travel guide' },
    ],
  },
  [HOTEL_BOOKING_PATH]: {
    home: { href: HOME_PATH, label: 'AvioSupportDesk home' },
    contact: { href: CONTACT_PATH, label: 'contact hotel booking help' },
    relatedServices: [
      serviceCard(FLIGHT_BOOKING_PATH),
      serviceCard(TRIP_PLANNING_PATH),
      serviceCard(INTERNATIONAL_FLIGHT_PATH),
    ],
    relatedGuides: [
      { href: GUIDE_FLIGHT_BOOKING_PATH, label: 'flight booking phone guide' },
      { href: GUIDES_PATH, label: 'travel guides hub' },
    ],
  },
  [POINTS_REDEMPTION_PATH]: {
    home: { href: HOME_PATH, label: 'AvioSupportDesk home' },
    contact: { href: CONTACT_PATH, label: 'contact points redemption help' },
    relatedServices: [
      serviceCard(FLIGHT_BOOKING_PATH),
      serviceCard(INTERNATIONAL_FLIGHT_PATH),
      serviceCard(TRIP_PLANNING_PATH),
    ],
    relatedGuides: [
      { href: GUIDE_POINTS_PATH, label: 'points and miles basics guide' },
      { href: GUIDE_FLIGHT_BOOKING_PATH, label: 'how to book a flight by phone' },
    ],
  },
  [FLIGHT_CHANGES_PATH]: {
    home: { href: HOME_PATH, label: 'AvioSupportDesk home' },
    contact: { href: CONTACT_PATH, label: 'contact flight change help' },
    relatedServices: [
      serviceCard(FLIGHT_CANCELLATION_PATH),
      serviceCard(SEAT_SELECTION_PATH),
      serviceCard(FLIGHT_BOOKING_PATH),
    ],
    relatedGuides: [
      { href: GUIDE_FLIGHT_CHANGES_PATH, label: 'how airline flight changes work' },
      { href: GUIDE_FLIGHT_CANCELLATIONS_PATH, label: 'flight cancellation and refunds guide' },
    ],
  },
  [FLIGHT_CANCELLATION_PATH]: {
    home: { href: HOME_PATH, label: 'AvioSupportDesk home' },
    contact: { href: CONTACT_PATH, label: 'contact flight cancellation help' },
    relatedServices: [
      serviceCard(FLIGHT_CHANGES_PATH),
      serviceCard(FLIGHT_BOOKING_PATH),
      serviceCard(POINTS_REDEMPTION_PATH),
    ],
    relatedGuides: [
      { href: GUIDE_FLIGHT_CANCELLATIONS_PATH, label: 'flight cancellation and refunds guide' },
      { href: GUIDE_FLIGHT_CHANGES_PATH, label: 'airline flight change guide' },
    ],
  },
  [SEAT_SELECTION_PATH]: {
    home: { href: HOME_PATH, label: 'AvioSupportDesk home' },
    contact: { href: CONTACT_PATH, label: 'contact seat selection help' },
    relatedServices: [
      serviceCard(FLIGHT_BOOKING_PATH),
      serviceCard(BAGGAGE_ASSISTANCE_PATH),
      serviceCard(FLIGHT_CHANGES_PATH),
    ],
    relatedGuides: [
      { href: GUIDE_FLIGHT_BOOKING_PATH, label: 'how to book a flight by phone' },
      { href: GUIDE_BAGGAGE_PATH, label: 'airline baggage rules guide' },
    ],
  },
  [BAGGAGE_ASSISTANCE_PATH]: {
    home: { href: HOME_PATH, label: 'AvioSupportDesk home' },
    contact: { href: CONTACT_PATH, label: 'contact baggage assistance' },
    relatedServices: [
      serviceCard(FLIGHT_BOOKING_PATH),
      serviceCard(SEAT_SELECTION_PATH),
      serviceCard(FLIGHT_CHANGES_PATH),
    ],
    relatedGuides: [
      { href: GUIDE_BAGGAGE_PATH, label: 'airline baggage rules explained' },
      { href: GUIDE_FLIGHT_BOOKING_PATH, label: 'flight booking phone guide' },
    ],
  },
  [TRIP_PLANNING_PATH]: {
    home: { href: HOME_PATH, label: 'AvioSupportDesk home' },
    contact: { href: CONTACT_PATH, label: 'contact trip planning help' },
    relatedServices: [
      serviceCard(HOTEL_BOOKING_PATH),
      serviceCard(FLIGHT_BOOKING_PATH),
      serviceCard(INTERNATIONAL_FLIGHT_PATH),
    ],
    relatedGuides: [
      { href: GUIDE_FLIGHT_BOOKING_PATH, label: 'how to book a flight by phone' },
      { href: GUIDES_PATH, label: 'travel guides for airline help' },
    ],
  },
}

export const IMAGE_KEY_TO_SERVICE_PATH = {
  'flight-booking': FLIGHT_BOOKING_PATH,
  'hotel-booking': HOTEL_BOOKING_PATH,
  'reward-travel': POINTS_REDEMPTION_PATH,
  'flight-change': FLIGHT_CHANGES_PATH,
  cancellation: FLIGHT_CANCELLATION_PATH,
  'seat-selection': SEAT_SELECTION_PATH,
  baggage: BAGGAGE_ASSISTANCE_PATH,
  'trip-planning': TRIP_PLANNING_PATH,
}

export function getServiceInternalLinks(path) {
  return SERVICE_INTERNAL_LINKS[path]
}

export function buildServiceLinkMap(path) {
  const cfg = SERVICE_INTERNAL_LINKS[path]
  if (!cfg) {
    return {}
  }

  const map = {
    home: cfg.home,
    contact: cfg.contact,
  }

  for (const service of cfg.relatedServices) {
    const token = service.href.replace(/^\//, '')
    map[token] = { href: service.href, label: service.anchor }
  }

  for (const guide of cfg.relatedGuides) {
    const token = `guide-${guide.href.split('/').filter(Boolean).pop()}`
    map[token] = guide
  }

  map.services = { href: SERVICES_PATH, label: 'all travel services' }
  return map
}

export function getOpeningPlainText(opening) {
  return String(opening || '').replace(/\{\{([^}]+)\}\}/g, (_, token) => token.replace(/-/g, ' '))
}
