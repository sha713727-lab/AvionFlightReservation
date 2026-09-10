import {
  BAGGAGE_ASSISTANCE_PATH,
  FLIGHT_CANCELLATION_PATH,
  SEAT_SELECTION_PATH,
  TRIP_PLANNING_PATH,
} from '@/constants/routes'
import {
  BAGGAGE_ASSISTANCE_BODY,
  FLIGHT_CANCELLATION_BODY,
  SEAT_SELECTION_BODY,
  TRIP_PLANNING_BODY,
} from '@/modules/seoLanding/constants/serviceBodiesGroupB'
import {
  BAGGAGE_ASSISTANCE_FAQS,
  FLIGHT_CANCELLATION_FAQS,
  SEAT_SELECTION_FAQS,
  TRIP_PLANNING_FAQS,
} from '@/modules/seoLanding/constants/serviceFaqsGroupB'
import {
  BAGGAGE_ASSISTANCE_GEO,
  FLIGHT_CANCELLATION_GEO,
  SEAT_SELECTION_GEO,
  TRIP_PLANNING_GEO,
} from '@/modules/seoLanding/constants/serviceGeoGroupB'

export const SERVICE_PAGES_GROUP_B = [
  {
    slug: 'flight-cancellation',
    path: FLIGHT_CANCELLATION_PATH,
    h1: 'Flight Cancellation Assistance — Cancel Any Airline Flight',
    ...FLIGHT_CANCELLATION_BODY,
    ...FLIGHT_CANCELLATION_GEO,
    faqs: FLIGHT_CANCELLATION_FAQS,
  },
  {
    slug: 'seat-selection',
    path: SEAT_SELECTION_PATH,
    h1: 'Airline Seat Selection Help by Phone',
    ...SEAT_SELECTION_BODY,
    ...SEAT_SELECTION_GEO,
    faqs: SEAT_SELECTION_FAQS,
  },
  {
    slug: 'baggage-assistance',
    path: BAGGAGE_ASSISTANCE_PATH,
    h1: 'Baggage Fees & Allowance Assistance by Phone',
    ...BAGGAGE_ASSISTANCE_BODY,
    ...BAGGAGE_ASSISTANCE_GEO,
    faqs: BAGGAGE_ASSISTANCE_FAQS,
  },
  {
    slug: 'trip-planning',
    path: TRIP_PLANNING_PATH,
    h1: 'Trip Planning by Phone — Custom Travel Itineraries',
    ...TRIP_PLANNING_BODY,
    ...TRIP_PLANNING_GEO,
    faqs: TRIP_PLANNING_FAQS,
  },
]
