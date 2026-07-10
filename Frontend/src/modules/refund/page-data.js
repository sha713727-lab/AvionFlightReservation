import { COPY } from '@/constants/copy'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { EMAIL, PHONE_NUMBER, SITE_URL } from '@/constants/contact'
import { REFUND_POLICY_PATH } from '@/constants/routes'

export function getRefundPageMetadata() {
  const canonical = `${SITE_URL}${REFUND_POLICY_PATH}`

  return {
    title: `Refund Policy | ${BRAND_FULL_NAME}`,
    description: COPY.refund.metaDescription,
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
      title: `Refund Policy | ${BRAND_FULL_NAME}`,
      description: COPY.refund.metaDescription,
      url: canonical,
      siteName: BRAND_FULL_NAME,
    },
    twitter: {
      card: 'summary',
      title: `Refund Policy | ${BRAND_FULL_NAME}`,
      description: COPY.refund.metaDescription,
    },
  }
}

export function getRefundPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Refund Policy | ${BRAND_FULL_NAME}`,
    description: COPY.refund.metaDescription,
    url: `${SITE_URL}${REFUND_POLICY_PATH}`,
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
      email: EMAIL,
      telephone: PHONE_NUMBER,
    },
  }
}
