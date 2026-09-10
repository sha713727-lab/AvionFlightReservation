import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { INTERNATIONAL_FLIGHT_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { buildPathMetadata, buildTravelAssistanceJsonLd, buildWebPageJsonLd } from '@/utils/seo'

export function getInternationalFlightPageMetadata() {
  return buildPathMetadata(INTERNATIONAL_FLIGHT_PATH)
}

export function getInternationalFlightPageJsonLd() {
  const { title, description } = getSeoPageMeta(INTERNATIONAL_FLIGHT_PATH)
  return withBreadcrumbJsonLd(INTERNATIONAL_FLIGHT_PATH, [
    buildWebPageJsonLd({
      name: title,
      description,
      path: INTERNATIONAL_FLIGHT_PATH,
      speakable: true,
    }),
    buildTravelAssistanceJsonLd({
      description,
      path: INTERNATIONAL_FLIGHT_PATH,
    }),
  ])
}
