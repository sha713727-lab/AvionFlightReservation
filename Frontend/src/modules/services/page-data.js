import { COPY } from '@/constants/copy'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { SERVICES_PATH } from '@/constants/routes'
import { buildPageMetadata, buildWebPageJsonLd } from '@/utils/seo'

const SERVICES_KEYWORDS = [
  'flight booking',
  'hotel booking',
  'points redemption assistance',
  'flight changes',
  'cancellation support',
  'vacation packages',
  'trip planning',
  '24/7 travel support',
]

export function getServicesPageMetadata() {
  return buildPageMetadata({
    title: `Flight & Travel Services | ${BRAND_FULL_NAME}`,
    description: COPY.services.metaDescription,
    path: SERVICES_PATH,
    keywords: SERVICES_KEYWORDS,
  })
}

export function getServicesPageJsonLd() {
  return buildWebPageJsonLd({
    name: `Flight & Travel Services | ${BRAND_FULL_NAME}`,
    description: COPY.services.metaDescription,
    path: SERVICES_PATH,
  })
}
