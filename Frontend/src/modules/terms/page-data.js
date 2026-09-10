import { CONTACT_EMAILS, PHONE_NUMBER, SITE_URL, buildCanonicalUrl } from '@/constants/contact'
import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { TERMS_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { COPY } from '@/constants/copy'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { buildPathMetadata } from '@/utils/seo'

export function getTermsPageMetadata() {
  return buildPathMetadata(TERMS_PATH)
}

export function getTermsPageJsonLd() {
  const { title, description } = getSeoPageMeta(TERMS_PATH)
  return withBreadcrumbJsonLd(TERMS_PATH, {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: buildCanonicalUrl(TERMS_PATH),
    dateModified: COPY.terms.lastUpdatedIso,
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
