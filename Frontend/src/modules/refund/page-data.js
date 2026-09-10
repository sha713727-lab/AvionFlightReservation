import { CONTACT_EMAILS, PHONE_NUMBER, SITE_URL, buildCanonicalUrl } from '@/constants/contact'
import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { REFUND_POLICY_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { COPY } from '@/constants/copy'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { buildPathMetadata } from '@/utils/seo'

export function getRefundPageMetadata() {
  return buildPathMetadata(REFUND_POLICY_PATH)
}

export function getRefundPageJsonLd() {
  const { title, description } = getSeoPageMeta(REFUND_POLICY_PATH)
  return withBreadcrumbJsonLd(REFUND_POLICY_PATH, {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: buildCanonicalUrl(REFUND_POLICY_PATH),
    dateModified: COPY.refund.lastUpdatedIso,
    isPartOf: {
      '@type': 'WebSite',
      name: BRAND_FULL_NAME,
      url: SITE_URL,
    },
    about: {
      '@type': 'Organization',
      name: BRAND_FULL_NAME,
      url: SITE_URL,
      email: CONTACT_EMAILS,
      telephone: PHONE_NUMBER,
    },
  })
}
