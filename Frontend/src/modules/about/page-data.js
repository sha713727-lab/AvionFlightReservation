import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { ABOUT_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { buildPathMetadata, buildTravelAssistanceJsonLd, buildWebPageJsonLd } from '@/utils/seo'

export function getAboutPageMetadata() {
  return buildPathMetadata(ABOUT_PATH)
}

export function getAboutPageJsonLd() {
  const { title, description } = getSeoPageMeta(ABOUT_PATH)
  return withBreadcrumbJsonLd(ABOUT_PATH, [
    buildWebPageJsonLd({
      name: title,
      description,
      path: ABOUT_PATH,
    }),
    buildTravelAssistanceJsonLd({
      description,
      path: ABOUT_PATH,
      includeAddress: true,
    }),
  ])
}
