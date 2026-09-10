import { FaExchangeAlt, FaPlane, FaRoute } from 'react-icons/fa'
import {
  FLIGHT_BOOKING_PATH,
  FLIGHT_CHANGES_PATH,
  TRIP_PLANNING_PATH,
} from '@/constants/routes'

export const SERVICE_CATEGORY_IDS = {
  booking: 'booking',
  changes: 'changes-support',
  planning: 'trip-planning',
}

export const SERVICE_CATEGORIES = [
  {
    id: SERVICE_CATEGORY_IDS.booking,
    title: 'Booking',
    description: 'Flights, hotels, and points redemption by phone',
    icon: FaPlane,
    serviceIds: ['flights', 'hotels', 'rewards'],
    href: FLIGHT_BOOKING_PATH,
  },
  {
    id: SERVICE_CATEGORY_IDS.changes,
    title: 'Changes & Support',
    description: 'Rebooking, cancellations, seats, and baggage help',
    icon: FaExchangeAlt,
    serviceIds: ['changes', 'cancellation', 'seats', 'baggage'],
    href: FLIGHT_CHANGES_PATH,
  },
  {
    id: SERVICE_CATEGORY_IDS.planning,
    title: 'Trip Planning',
    description: 'Custom itineraries and all-inclusive vacation packages',
    icon: FaRoute,
    serviceIds: ['planning', 'packages'],
    href: TRIP_PLANNING_PATH,
  },
]
