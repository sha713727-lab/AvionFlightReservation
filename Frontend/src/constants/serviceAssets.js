import {
  FaPlane,
  FaHotel,
  FaGift,
  FaExchangeAlt,
  FaBan,
  FaChair,
  FaSuitcase,
  FaRoute,
  FaUmbrellaBeach,
} from 'react-icons/fa'
import {
  FLIGHT_BOOKING_SERVICE_IMAGE,
  HOTEL_BOOKING_SERVICE_IMAGE,
  REWARD_TRAVEL_SERVICE_IMAGE,
  FLIGHT_CHANGE_SERVICE_IMAGE,
  CANCELLATION_SERVICE_IMAGE,
  SEAT_SELECTION_SERVICE_IMAGE,
  BAGGAGE_SERVICE_IMAGE,
  TRIP_PLANNING_SERVICE_IMAGE,
  VACATION_PACKAGE_SERVICE_IMAGE,
} from '@/constants/images'

export const SERVICE_ICON_MAP = {
  plane: FaPlane,
  hotel: FaHotel,
  gift: FaGift,
  exchange: FaExchangeAlt,
  ban: FaBan,
  chair: FaChair,
  suitcase: FaSuitcase,
  route: FaRoute,
  beach: FaUmbrellaBeach,
}

export const SERVICE_IMAGE_MAP = {
  'flight-booking': FLIGHT_BOOKING_SERVICE_IMAGE,
  'hotel-booking': HOTEL_BOOKING_SERVICE_IMAGE,
  'reward-travel': REWARD_TRAVEL_SERVICE_IMAGE,
  'flight-change': FLIGHT_CHANGE_SERVICE_IMAGE,
  cancellation: CANCELLATION_SERVICE_IMAGE,
  'seat-selection': SEAT_SELECTION_SERVICE_IMAGE,
  baggage: BAGGAGE_SERVICE_IMAGE,
  'trip-planning': TRIP_PLANNING_SERVICE_IMAGE,
  'vacation-package': VACATION_PACKAGE_SERVICE_IMAGE,
}

export function resolveServiceVisuals(service) {
  const icon = SERVICE_ICON_MAP[service.iconKey] || SERVICE_ICON_MAP.plane
  const image = SERVICE_IMAGE_MAP[service.imageKey] || SERVICE_IMAGE_MAP['flight-booking']

  return {
    ...service,
    icon,
    image,
  }
}
