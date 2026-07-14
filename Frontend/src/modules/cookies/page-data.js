import { COPY } from '@/constants/copy'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { CONTACT_EMAILS, PHONE_NUMBER, SITE_URL } from '@/constants/contact'
import { COOKIE_POLICY_PATH } from '@/constants/routes'

export function getCookiePageMetadata() {
  const canonical = `${SITE_URL}${COOKIE_POLICY_PATH}`

  return {
    title: `Cookie Policy | ${BRAND_FULL_NAME}`,
    description: COPY.cookies.metaDescription,
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      title: `Cookie Policy | ${BRAND_FULL_NAME}`,
      description: COPY.cookies.metaDescription,
      url: canonical,
      siteName: BRAND_FULL_NAME,
    },
  }
}

export function getCookiePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Cookie Policy | ${BRAND_FULL_NAME}`,
    description: COPY.cookies.metaDescription,
    url: `${SITE_URL}${COOKIE_POLICY_PATH}`,
    dateModified: COPY.cookies.lastUpdatedIso,
    about: {
      '@type': 'Organization',
      name: BRAND_FULL_NAME,
      email: CONTACT_EMAILS,
      telephone: PHONE_NUMBER,
    },
  }
}
