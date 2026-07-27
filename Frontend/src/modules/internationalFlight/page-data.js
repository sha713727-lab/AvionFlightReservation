import { COPY } from '@/constants/copy'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { INTERNATIONAL_FLIGHT_PATH } from '@/constants/routes'
import { buildPageMetadata, buildTravelAssistanceJsonLd } from '@/utils/seo'

const INTERNATIONAL_FLIGHT_KEYWORDS = [
  'international flights',
  'book flights by phone',
  'Europe flights',
  'Canada domestic flights',
  'Mexico flights',
  'USA flights',
  'Avion Flight Reservation',
]

export function getInternationalFlightPageMetadata() {
  return buildPageMetadata({
    title: `International Flights by Phone | ${BRAND_FULL_NAME}`,
    description: COPY.internationalFlight.metaDescription,
    path: INTERNATIONAL_FLIGHT_PATH,
    keywords: INTERNATIONAL_FLIGHT_KEYWORDS,
  })
}

export function getInternationalFlightPageJsonLd() {
  return buildTravelAssistanceJsonLd({
    description: COPY.internationalFlight.metaDescription,
    path: INTERNATIONAL_FLIGHT_PATH,
    includeAddress: true,
  })
}
