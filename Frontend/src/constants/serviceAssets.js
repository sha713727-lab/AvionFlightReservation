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
  SERVICE_IMAGE_ALT_FALLBACKS,
} from '@/constants/images'
import {
  BAGGAGE_ASSISTANCE_PATH,
  FLIGHT_BOOKING_PATH,
  FLIGHT_CANCELLATION_PATH,
  FLIGHT_CHANGES_PATH,
  HOTEL_BOOKING_PATH,
  POINTS_REDEMPTION_PATH,
  SEAT_SELECTION_PATH,
  SERVICES_PATH,
  TRIP_PLANNING_PATH,
} from '@/constants/routes'

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

/** Catalog slug → dedicated service landing page (or services hub). */
export const SERVICE_EXPLORE_PATH_BY_SLUG = {
  flights: FLIGHT_BOOKING_PATH,
  hotels: HOTEL_BOOKING_PATH,
  rewards: POINTS_REDEMPTION_PATH,
  changes: FLIGHT_CHANGES_PATH,
  cancellation: FLIGHT_CANCELLATION_PATH,
  seats: SEAT_SELECTION_PATH,
  baggage: BAGGAGE_ASSISTANCE_PATH,
  planning: TRIP_PLANNING_PATH,
  packages: SERVICES_PATH,
}

export function getServiceExplorePath(service) {
  const slug = service?.id || service?.slug
  if (!slug) {
    return SERVICES_PATH
  }
  return SERVICE_EXPLORE_PATH_BY_SLUG[slug] || SERVICES_PATH
}

export function resolveServiceVisuals(service) {
  const icon = SERVICE_ICON_MAP[service.iconKey] || SERVICE_ICON_MAP.plane
  const fallbackImage =
    SERVICE_IMAGE_MAP[service.imageKey] || SERVICE_IMAGE_MAP['flight-booking']
  const imageAlt =
    service.imageAlt?.trim() ||
    SERVICE_IMAGE_ALT_FALLBACKS[service.imageKey] ||
    `${service.title} travel support by phone`

  if (service.mediaUrl && service.mediaType === 'video') {
    return {
      ...service,
      icon,
      imageAlt,
      mediaType: 'video',
      mediaUrl: service.mediaUrl,
      image: fallbackImage,
      explorePath: getServiceExplorePath(service),
    }
  }

  if (service.mediaUrl && service.mediaType === 'image') {
    return {
      ...service,
      icon,
      imageAlt,
      mediaType: 'image',
      mediaUrl: service.mediaUrl,
      image: service.mediaUrl,
      explorePath: getServiceExplorePath(service),
    }
  }

  return {
    ...service,
    icon,
    imageAlt,
    mediaType: 'image',
    mediaUrl: null,
    image: fallbackImage,
    explorePath: getServiceExplorePath(service),
  }
}
