import flightBookingServiceImage from '@/assets/images/flightBookingService.webp'
import hotelBookingServiceImage from '@/assets/images/hotelBookingService.webp'
import rewardTravelServiceImage from '@/assets/images/rewardTravelService.webp'
import flightChangeServiceImage from '@/assets/images/flightChangeService.webp'
import cancellationServiceImage from '@/assets/images/cancellationService.webp'
import seatSelectionServiceImage from '@/assets/images/seatSelectionService.webp'
import baggageServiceImage from '@/assets/images/baggageService.webp'
import tripPlanningServiceImage from '@/assets/images/tripPlanningService.webp'
import vacationPackageServiceImage from '@/assets/images/vacationPackageService.webp'

export const AVION_HERO_BACKGROUND_SRC = '/avion-hero-background.webp'
export const AVION_OG_IMAGE_SRC = '/avion-hero-background.png'

/** Absolute OG/Twitter image URL required in social meta tags. */
export const SEO_OG_IMAGE_ABSOLUTE = 'https://aviosupportdesk.com/og-image.jpg'

/** Public brand name used in Open Graph site_name. */
export const SEO_SITE_NAME = 'AvioSupportDesk'

export const HERO_BACKGROUND_SRC = AVION_HERO_BACKGROUND_SRC

/** Homepage hero visual — airplane wing over cloudy sky. */
export const HERO_BACKGROUND_ALT =
  'Airplane wing against cloudy sky for airline customer support'

export const REWARDS_CABIN_IMAGE_SRC =
  'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=70'
export const REWARDS_CABIN_IMAGE_ALT =
  'Premium airplane cabin seats for points and miles flight redemption'

export const INTERNATIONAL_FLIGHT_HERO_IMAGE_SRC =
  'https://images.unsplash.com/photo-1436491867331615-027857379939?auto=format&fit=crop&w=1280&q=70'
export const INTERNATIONAL_FLIGHT_HERO_ALT =
  'Passenger jet flying above clouds for international flight booking by phone'

export const INTERNATIONAL_REGION_IMAGES = {
  europe:
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=70',
  canada:
    'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=70',
  mexico:
    'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=800&q=70',
  usa: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=70',
}

export const FLIGHT_BOOKING_SERVICE_IMAGE = flightBookingServiceImage
export const HOTEL_BOOKING_SERVICE_IMAGE = hotelBookingServiceImage
export const REWARD_TRAVEL_SERVICE_IMAGE = rewardTravelServiceImage
export const FLIGHT_CHANGE_SERVICE_IMAGE = flightChangeServiceImage
export const CANCELLATION_SERVICE_IMAGE = cancellationServiceImage
export const SEAT_SELECTION_SERVICE_IMAGE = seatSelectionServiceImage
export const BAGGAGE_SERVICE_IMAGE = baggageServiceImage
export const TRIP_PLANNING_SERVICE_IMAGE = tripPlanningServiceImage
export const VACATION_PACKAGE_SERVICE_IMAGE = vacationPackageServiceImage

/** Fallback keyword-rich alts when catalog imageAlt is empty. */
export const SERVICE_IMAGE_ALT_FALLBACKS = {
  'flight-booking': 'Travel specialist booking airline flights by phone',
  'hotel-booking': 'Hotel room ready for phone hotel reservation booking',
  'reward-travel': 'Airplane cabin for points and miles redemption travel',
  'flight-change': 'Airport departure board during flight change rebooking',
  cancellation: 'Boarding pass for flight cancellation and refund help',
  'seat-selection': 'Airplane cabin seats for airline seat selection help',
  baggage: 'Checked luggage for airline baggage fee assistance',
  'trip-planning': 'World map and passport for custom trip planning',
  'vacation-package': 'Tropical resort for vacation package flight and hotel bookings',
}
