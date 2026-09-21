import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { PRIVACY_POLICY_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { COPY } from '@/constants/copy'
import { buildPathMetadata, buildWebPageJsonLd } from '@/utils/seo'

export function getPrivacyPageMetadata() {
  return buildPathMetadata(PRIVACY_POLICY_PATH)
}

export function getPrivacyPageJsonLd() {
  const { title, description } = getSeoPageMeta(PRIVACY_POLICY_PATH)
  return withBreadcrumbJsonLd(PRIVACY_POLICY_PATH, {
    ...buildWebPageJsonLd({
      name: title,
      description,
      path: PRIVACY_POLICY_PATH,
    }),
    dateModified: COPY.privacy.lastUpdatedIso,
  })
}
