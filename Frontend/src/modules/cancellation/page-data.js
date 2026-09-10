import { CONTACT_EMAILS, PHONE_NUMBER, SITE_URL, buildCanonicalUrl } from '@/constants/contact'
import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { CANCELLATION_POLICY_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { COPY } from '@/constants/copy'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { buildPathMetadata } from '@/utils/seo'

export function getCancellationPageMetadata() {
  return buildPathMetadata(CANCELLATION_POLICY_PATH)
}

export function getCancellationPageJsonLd() {
  const { title, description } = getSeoPageMeta(CANCELLATION_POLICY_PATH)
  return withBreadcrumbJsonLd(CANCELLATION_POLICY_PATH, {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: buildCanonicalUrl(CANCELLATION_POLICY_PATH),
    dateModified: COPY.cancellation.lastUpdatedIso,
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
