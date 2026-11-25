import {
  FLIGHT_BOOKING_PATH,
  FLIGHT_CANCELLATION_PATH,
  FLIGHT_CHANGES_PATH,
  HOTEL_BOOKING_PATH,
  INTERNATIONAL_FLIGHT_PATH,
  TRIP_PLANNING_PATH,
} from '@/constants/routes'

/** Homepage category blocks — brand-neutral service IA (brief sections 4–7). */
export const HOME_CATEGORY_SECTIONS = [
  {
    id: 'flight-booking',
    title: 'Flight Booking Assistance',
    description:
      'Book domestic and international flights by phone. Specialists compare schedules, fare rules, and connection options before you confirm.',
    links: [
      { href: FLIGHT_BOOKING_PATH, label: 'Flight booking by phone' },
      { href: INTERNATIONAL_FLIGHT_PATH, label: 'International flights' },
    ],
  },
  {
    id: 'hotel-booking',
    title: 'Hotel Booking Assistance',
    description:
      'Reserve accommodations with room types, deposits, taxes, and cancellation windows explained before you book.',
    links: [{ href: HOTEL_BOOKING_PATH, label: 'Hotel booking by phone' }],
  },
  {
    id: 'changes-cancellations',
    title: 'Flight Changes & Cancellations',
    description:
      'Get clear guidance on change fees, fare differences, refunds, and travel credits before anything is submitted.',
    links: [
      { href: FLIGHT_CHANGES_PATH, label: 'Flight change assistance' },
      { href: FLIGHT_CANCELLATION_PATH, label: 'Cancellation assistance' },
    ],
  },
  {
    id: 'travel-planning',
    title: 'Personalized Travel Planning',
    description:
      'Build multi-city and multi-destination itineraries with realistic connection and hotel timing.',
    links: [{ href: TRIP_PLANNING_PATH, label: 'Custom trip planning' }],
  },
]
