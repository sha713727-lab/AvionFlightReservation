import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { CONTACT_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import {
  ORGANIZATION_ID,
  WEBSITE_ID,
  buildPathMetadata,
  buildWebPageId,
} from '@/utils/seo'
import {
  CONTACT_EMAILS,
  MAILING_ADDRESS,
  PHONE_NUMBER,
  buildCanonicalUrl,
} from '@/constants/contact'

export function getContactPageMetadata() {
  return buildPathMetadata(CONTACT_PATH)
}

/**
 * ContactPage node joined to the shared graph.
 * hoursAvailable omitted until the owner verifies staffed hours.
 */
function buildContactPageJsonLd(description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': buildWebPageId(CONTACT_PATH),
    name: 'Contact AvioSupportDesk',
    description,
    url: buildCanonicalUrl(CONTACT_PATH),
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: {
      '@id': ORGANIZATION_ID,
      telephone: PHONE_NUMBER,
      email: CONTACT_EMAILS,
      address: {
        '@type': 'PostalAddress',
        streetAddress: MAILING_ADDRESS.streetAddress,
        addressLocality: MAILING_ADDRESS.addressLocality,
        addressRegion: MAILING_ADDRESS.addressRegion,
        postalCode: MAILING_ADDRESS.postalCode,
        addressCountry: MAILING_ADDRESS.addressCountry,
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: PHONE_NUMBER.replace(/\s+/g, '-'),
          contactType: 'customer service',
          areaServed: ['US', 'CA'],
          availableLanguage: ['English'],
        },
      ],
    },
  }
}

export function getContactPageJsonLd() {
  const { description } = getSeoPageMeta(CONTACT_PATH)
  return withBreadcrumbJsonLd(CONTACT_PATH, buildContactPageJsonLd(description))
}
