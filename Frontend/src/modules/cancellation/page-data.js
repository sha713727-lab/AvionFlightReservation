import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { CANCELLATION_POLICY_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { COPY } from '@/constants/copy'
import { buildPathMetadata, buildWebPageJsonLd } from '@/utils/seo'

export function getCancellationPageMetadata() {
  return buildPathMetadata(CANCELLATION_POLICY_PATH)
}

export function getCancellationPageJsonLd() {
  const { title, description } = getSeoPageMeta(CANCELLATION_POLICY_PATH)
  return withBreadcrumbJsonLd(CANCELLATION_POLICY_PATH, {
    ...buildWebPageJsonLd({
      name: title,
      description,
      path: CANCELLATION_POLICY_PATH,
    }),
    dateModified: COPY.cancellation.lastUpdatedIso,
  })
}
