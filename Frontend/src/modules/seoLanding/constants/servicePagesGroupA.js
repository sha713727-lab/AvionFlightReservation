import {
  FLIGHT_BOOKING_PATH,
  FLIGHT_CHANGES_PATH,
  HOTEL_BOOKING_PATH,
  POINTS_REDEMPTION_PATH,
} from '@/constants/routes'
import {
  FLIGHT_BOOKING_BODY,
  FLIGHT_CHANGES_BODY,
  HOTEL_BOOKING_BODY,
  POINTS_REDEMPTION_BODY,
} from '@/modules/seoLanding/constants/serviceBodiesGroupA'
import {
  FLIGHT_BOOKING_FAQS,
  FLIGHT_CHANGES_FAQS,
  HOTEL_BOOKING_FAQS,
  POINTS_REDEMPTION_FAQS,
} from '@/modules/seoLanding/constants/serviceFaqsGroupA'
import {
  FLIGHT_BOOKING_GEO,
  FLIGHT_CHANGES_GEO,
  HOTEL_BOOKING_GEO,
  POINTS_REDEMPTION_GEO,
} from '@/modules/seoLanding/constants/serviceGeoGroupA'

export const SERVICE_PAGES_GROUP_A = [
  {
    slug: 'flight-booking',
    path: FLIGHT_BOOKING_PATH,
    h1: 'Flight Booking Assistance — Book Any Airline by Phone',
    ...FLIGHT_BOOKING_BODY,
    ...FLIGHT_BOOKING_GEO,
    faqs: FLIGHT_BOOKING_FAQS,
  },
  {
    slug: 'hotel-booking',
    path: HOTEL_BOOKING_PATH,
    h1: 'Hotel Booking Help by Phone — Reserve Your Stay',
    ...HOTEL_BOOKING_BODY,
    ...HOTEL_BOOKING_GEO,
    faqs: HOTEL_BOOKING_FAQS,
  },
  {
    slug: 'points-redemption',
    path: POINTS_REDEMPTION_PATH,
    h1: 'Points & Miles Redemption Help by Phone',
    ...POINTS_REDEMPTION_BODY,
    ...POINTS_REDEMPTION_GEO,
    faqs: POINTS_REDEMPTION_FAQS,
  },
  {
    slug: 'flight-changes',
    path: FLIGHT_CHANGES_PATH,
    h1: 'Flight Change Assistance — Rebook Any Airline Flight',
    ...FLIGHT_CHANGES_BODY,
    ...FLIGHT_CHANGES_GEO,
    faqs: FLIGHT_CHANGES_FAQS,
  },
]
