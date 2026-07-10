import { COPY } from '@/constants/copy'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { CONTACT_PATH } from '@/constants/routes'
import { buildPageMetadata, buildTravelAssistanceJsonLd } from '@/utils/seo'

const CONTACT_KEYWORDS = [
  'book flights by phone',
  'call to book flights',
  'travel specialist',
  '24/7 travel support',
  'Avion Flight Reservation',
]

export function getContactPageMetadata() {
  return buildPageMetadata({
    title: `Contact Us | Book Flights by Phone | ${BRAND_FULL_NAME}`,
    description: COPY.contactPage.metaDescription,
    path: CONTACT_PATH,
    keywords: CONTACT_KEYWORDS,
  })
}

export function getContactPageJsonLd() {
  return buildTravelAssistanceJsonLd({
    description: COPY.contactPage.metaDescription,
    path: CONTACT_PATH,
    includeAddress: true,
  })
}
