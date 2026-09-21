import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { buildPathMetadata, buildWebPageJsonLd } from '@/utils/seo'
import { TRUST_PAGES } from '@/modules/trust/constants'

export function getTrustPageMetadata(path) {
  return buildPathMetadata(path)
}

export function getTrustPageContent(path) {
  return TRUST_PAGES[path]
}

export function getTrustPageJsonLd(path) {
  const content = TRUST_PAGES[path]
  const { title, description } = getSeoPageMeta(path)
  if (!content) return null

  return withBreadcrumbJsonLd(
    path,
    buildWebPageJsonLd({ name: title, description, path }),
  )
}
