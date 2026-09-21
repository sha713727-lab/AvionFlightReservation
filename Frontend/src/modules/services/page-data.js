import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { SERVICES_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { buildPathMetadata, buildWebPageJsonLd } from '@/utils/seo'

export function getServicesPageMetadata() {
  return buildPathMetadata(SERVICES_PATH)
}

export function getServicesPageJsonLd() {
  const { title, description } = getSeoPageMeta(SERVICES_PATH)
  return withBreadcrumbJsonLd(
    SERVICES_PATH,
    buildWebPageJsonLd({
      name: title,
      description,
      path: SERVICES_PATH,
    }),
  )
}
