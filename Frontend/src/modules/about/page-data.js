import { COPY } from '@/constants/copy'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { ABOUT_PATH } from '@/constants/routes'
import { buildPageMetadata, buildTravelAssistanceJsonLd } from '@/utils/seo'

const ABOUT_KEYWORDS = [
  'independent travel assistance',
  'Avion Flight Reservation',
  'flight reservation',
  'book flights by phone',
  'travel specialist',
]

export function getAboutPageMetadata() {
  return buildPageMetadata({
    title: `About Us | Independent Travel Assistance | ${BRAND_FULL_NAME}`,
    description: COPY.about.metaDescription,
    path: ABOUT_PATH,
    keywords: ABOUT_KEYWORDS,
  })
}

export function getAboutPageJsonLd() {
  return buildTravelAssistanceJsonLd({
    description: COPY.about.metaDescription,
    path: ABOUT_PATH,
    includeAddress: true,
  })
}
