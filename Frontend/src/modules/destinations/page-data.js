import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { DESTINATIONS_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { buildPathMetadata, buildWebPageJsonLd } from '@/utils/seo'

export function getDestinationsPageMetadata() {
  return buildPathMetadata(DESTINATIONS_PATH)
}

export function getDestinationsPageJsonLd() {
  const { title, description } = getSeoPageMeta(DESTINATIONS_PATH)
  return withBreadcrumbJsonLd(
    DESTINATIONS_PATH,
    buildWebPageJsonLd({
      name: title,
      description,
      path: DESTINATIONS_PATH,
      speakable: true,
    }),
  )
}
