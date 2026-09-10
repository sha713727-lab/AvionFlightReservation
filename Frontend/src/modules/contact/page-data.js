import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { CONTACT_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { SPEAKABLE_CSS_SELECTORS, buildPathMetadata } from '@/utils/seo'
import {
  CONTACT_EMAILS,
  MAILING_ADDRESS_LINES,
  PHONE_NUMBER,
  SITE_URL,
  SUPPORT_HOURS,
  buildCanonicalUrl,
} from '@/constants/contact'
export function getContactPageMetadata() {
  return buildPathMetadata(CONTACT_PATH)
}

function buildContactPageJsonLd(description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact AvioSupportDesk',
    description,
    url: buildCanonicalUrl(CONTACT_PATH),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: SPEAKABLE_CSS_SELECTORS,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: BRAND_FULL_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'AvioSupportDesk',
      alternateName: BRAND_FULL_NAME,
      url: SITE_URL,
      telephone: PHONE_NUMBER,
      email: CONTACT_EMAILS,
      address: {
        '@type': 'PostalAddress',
        streetAddress: MAILING_ADDRESS_LINES[0],
        addressLocality: 'Toronto',
        addressRegion: 'ON',
        postalCode: 'M5X 1C9',
        addressCountry: 'CA',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: PHONE_NUMBER.replace(/\s+/g, '-'),
          contactType: 'customer service',
          areaServed: ['US', 'CA'],
          availableLanguage: ['English'],
          hoursAvailable: SUPPORT_HOURS,
        },
      ],
    },
  }
}

export function getContactPageJsonLd() {
  const { description } = getSeoPageMeta(CONTACT_PATH)
  return withBreadcrumbJsonLd(CONTACT_PATH, buildContactPageJsonLd(description))
}
