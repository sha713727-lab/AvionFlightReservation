import { COPY } from '@/constants/copy'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { CONTACT_EMAILS, PHONE_NUMBER, SITE_URL } from '@/constants/contact'
import { CANCELLATION_POLICY_PATH } from '@/constants/routes'

export function getCancellationPageMetadata() {
  const canonical = `${SITE_URL}${CANCELLATION_POLICY_PATH}`

  return {
    title: `Cancellation Policy | ${BRAND_FULL_NAME}`,
    description: COPY.cancellation.metaDescription,
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
      title: `Cancellation Policy | ${BRAND_FULL_NAME}`,
      description: COPY.cancellation.metaDescription,
      url: canonical,
      siteName: BRAND_FULL_NAME,
    },
    twitter: {
      card: 'summary',
      title: `Cancellation Policy | ${BRAND_FULL_NAME}`,
      description: COPY.cancellation.metaDescription,
    },
  }
}

export function getCancellationPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Cancellation Policy | ${BRAND_FULL_NAME}`,
    description: COPY.cancellation.metaDescription,
    url: `${SITE_URL}${CANCELLATION_POLICY_PATH}`,
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
  }
}
