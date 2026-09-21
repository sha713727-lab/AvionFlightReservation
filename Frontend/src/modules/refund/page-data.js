import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { REFUND_POLICY_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { COPY } from '@/constants/copy'
import { buildPathMetadata, buildWebPageJsonLd } from '@/utils/seo'

export function getRefundPageMetadata() {
  return buildPathMetadata(REFUND_POLICY_PATH)
}

export function getRefundPageJsonLd() {
  const { title, description } = getSeoPageMeta(REFUND_POLICY_PATH)
  return withBreadcrumbJsonLd(REFUND_POLICY_PATH, {
    ...buildWebPageJsonLd({
      name: title,
      description,
      path: REFUND_POLICY_PATH,
    }),
    dateModified: COPY.refund.lastUpdatedIso,
  })
}
