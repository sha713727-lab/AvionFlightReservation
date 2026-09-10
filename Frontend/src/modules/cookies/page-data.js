import { CONTACT_EMAILS, PHONE_NUMBER, SITE_URL, buildCanonicalUrl } from '@/constants/contact'
import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { COOKIE_POLICY_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { COPY } from '@/constants/copy'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { buildPathMetadata } from '@/utils/seo'

export function getCookiePageMetadata() {
  return buildPathMetadata(COOKIE_POLICY_PATH)
}

export function getCookiePageJsonLd() {
  const { title, description } = getSeoPageMeta(COOKIE_POLICY_PATH)
  return withBreadcrumbJsonLd(COOKIE_POLICY_PATH, {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: buildCanonicalUrl(COOKIE_POLICY_PATH),
    dateModified: COPY.cookies.lastUpdatedIso,
    about: {
      '@type': 'Organization',
      name: BRAND_FULL_NAME,
      email: CONTACT_EMAILS,
      telephone: PHONE_NUMBER,
      url: SITE_URL,
    },
  })
}
