import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { TERMS_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { COPY } from '@/constants/copy'
import { buildPathMetadata, buildWebPageJsonLd } from '@/utils/seo'

export function getTermsPageMetadata() {
  return buildPathMetadata(TERMS_PATH)
}

export function getTermsPageJsonLd() {
  const { title, description } = getSeoPageMeta(TERMS_PATH)
  return withBreadcrumbJsonLd(TERMS_PATH, {
    ...buildWebPageJsonLd({
      name: title,
      description,
      path: TERMS_PATH,
    }),
    dateModified: COPY.terms.lastUpdatedIso,
  })
}
