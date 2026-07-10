import { COPY } from '@/constants/copy'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { DESTINATIONS_PATH } from '@/constants/routes'
import { buildPageMetadata, buildWebPageJsonLd } from '@/utils/seo'

const DESTINATIONS_KEYWORDS = [
  'Canada domestic flights',
  'USA flights',
  'Europe flights',
  'Mexico flights',
  'Cancun flights',
  'international flights',
  'flight destinations',
]

export function getDestinationsPageMetadata() {
  return buildPageMetadata({
    title: `Flight Destinations | Canada, USA & Europe | ${BRAND_FULL_NAME}`,
    description: COPY.destinations.metaDescription,
    path: DESTINATIONS_PATH,
    keywords: DESTINATIONS_KEYWORDS,
  })
}

export function getDestinationsPageJsonLd() {
  return buildWebPageJsonLd({
    name: `Flight Destinations | ${BRAND_FULL_NAME}`,
    description: COPY.destinations.metaDescription,
    path: DESTINATIONS_PATH,
  })
}
