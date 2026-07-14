import { COPY } from '@/constants/copy'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { CONTACT_EMAILS, PHONE_NUMBER, SITE_URL } from '@/constants/contact'
import { PRIVACY_POLICY_PATH } from '@/constants/routes'

export function getPrivacyPageMetadata() {
  const canonical = `${SITE_URL}${PRIVACY_POLICY_PATH}`

  return {
    title: `Privacy Policy | ${BRAND_FULL_NAME}`,
    description: COPY.privacy.metaDescription,
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
      title: `Privacy Policy | ${BRAND_FULL_NAME}`,
      description: COPY.privacy.metaDescription,
      url: canonical,
      siteName: BRAND_FULL_NAME,
    },
    twitter: {
      card: 'summary',
      title: `Privacy Policy | ${BRAND_FULL_NAME}`,
      description: COPY.privacy.metaDescription,
    },
  }
}

export function getPrivacyPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Privacy Policy | ${BRAND_FULL_NAME}`,
    description: COPY.privacy.metaDescription,
    url: `${SITE_URL}${PRIVACY_POLICY_PATH}`,
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
  }
}
