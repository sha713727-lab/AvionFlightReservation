import { COPY } from '@/constants/copy'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { EMAIL, PHONE_NUMBER, SITE_URL } from '@/constants/contact'
import { TERMS_PATH } from '@/constants/routes'

export function getTermsPageMetadata() {
  const canonical = `${SITE_URL}${TERMS_PATH}`

  return {
    title: `Terms & Conditions | ${BRAND_FULL_NAME}`,
    description: COPY.terms.metaDescription,
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      type: 'website',
      title: `Terms & Conditions | ${BRAND_FULL_NAME}`,
      description: COPY.terms.metaDescription,
      url: canonical,
      siteName: BRAND_FULL_NAME,
    },
    twitter: {
      card: 'summary',
      title: `Terms & Conditions | ${BRAND_FULL_NAME}`,
      description: COPY.terms.metaDescription,
    },
  }
}

export function getTermsPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Terms & Conditions | ${BRAND_FULL_NAME}`,
    description: COPY.terms.metaDescription,
    url: `${SITE_URL}${TERMS_PATH}`,
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
      email: EMAIL,
      telephone: PHONE_NUMBER,
    },
  }
}
