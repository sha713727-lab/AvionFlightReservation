import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { COOKIE_POLICY_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { COPY } from '@/constants/copy'
import { buildPathMetadata, buildWebPageJsonLd } from '@/utils/seo'

export function getCookiePageMetadata() {
  return buildPathMetadata(COOKIE_POLICY_PATH)
}

export function getCookiePageJsonLd() {
  const { title, description } = getSeoPageMeta(COOKIE_POLICY_PATH)
  return withBreadcrumbJsonLd(COOKIE_POLICY_PATH, {
    ...buildWebPageJsonLd({
      name: title,
      description,
      path: COOKIE_POLICY_PATH,
    }),
    dateModified: COPY.cookies.lastUpdatedIso,
  })
}
