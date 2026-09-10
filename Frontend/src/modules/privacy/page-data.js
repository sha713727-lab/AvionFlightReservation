import { CONTACT_EMAILS, PHONE_NUMBER, SITE_URL, buildCanonicalUrl } from '@/constants/contact'
import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { PRIVACY_POLICY_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { COPY } from '@/constants/copy'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { buildPathMetadata } from '@/utils/seo'

export function getPrivacyPageMetadata() {
  return buildPathMetadata(PRIVACY_POLICY_PATH)
}

export function getPrivacyPageJsonLd() {
  const { title, description } = getSeoPageMeta(PRIVACY_POLICY_PATH)
  return withBreadcrumbJsonLd(PRIVACY_POLICY_PATH, {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: buildCanonicalUrl(PRIVACY_POLICY_PATH),
    dateModified: COPY.privacy.lastUpdatedIso,
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
