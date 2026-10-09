import { AVION_LOGO_SRC, BRAND_NAME } from '@/constants/brand'
import {
  ORGANIZATION_DISAMBIGUATING_DESCRIPTION,
  getVerifiedSameAs,
} from '@/constants/businessFacts'
import { CANONICAL_ORIGIN, MAILING_ADDRESS, PHONE_SCHEMA_TELEPHONE } from '@/constants/contact'
import { COPY } from '@/constants/copy'
import { HOME_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import {
  ORGANIZATION_ID,
  ORGANIZATION_URL,
  buildFaqPageJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
} from '@/utils/seo'

const ORGANIZATION_DESCRIPTION =
  'Independent travel assistance helping customers compare Avion points flight options and complete permitted booking steps for a separately quoted assistance fee.'

/**
 * Homepage-only WebSite JSON-LD (schema.org).
 * No SearchAction — site has no /search page.
 */
export function getHomeWebSiteJsonLd() {
  return buildWebSiteJsonLd({
    name: BRAND_NAME,
    description: ORGANIZATION_DESCRIPTION,
    path: HOME_PATH,
  })
}

/** Homepage WebPage JSON-LD — joins the shared graph by @id. */
export function getHomeWebPageJsonLd() {
  const seo = getSeoPageMeta(HOME_PATH)

  return buildWebPageJsonLd({
    name: seo.title,
    description: COPY.hero.speakableSummary,
    path: HOME_PATH,
  })
}

/**
 * Homepage Organization JSON-LD — the canonical entity node.
 * sameAs only includes verified own profiles from BUSINESS_FACTS.
 * No aggregateRating — unsupported review counts must not be published.
 */
export function getHomeOrganizationJsonLd() {
  const logoPath = AVION_LOGO_SRC.startsWith('/') ? AVION_LOGO_SRC : `/${AVION_LOGO_SRC}`
  const sameAs = getVerifiedSameAs()

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: BRAND_NAME,
    url: ORGANIZATION_URL,
    telephone: PHONE_SCHEMA_TELEPHONE,
    logo: `${CANONICAL_ORIGIN}${logoPath.replace(/\.webp$/i, '.png')}`,
    description: ORGANIZATION_DESCRIPTION,
    disambiguatingDescription: ORGANIZATION_DISAMBIGUATING_DESCRIPTION,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: PHONE_SCHEMA_TELEPHONE,
        contactType: 'customer service',
        areaServed: ['CA', 'US'],
        availableLanguage: ['English'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: MAILING_ADDRESS.streetAddress,
      addressLocality: MAILING_ADDRESS.addressLocality,
      addressRegion: MAILING_ADDRESS.addressRegion,
      postalCode: MAILING_ADDRESS.postalCode,
      addressCountry: MAILING_ADDRESS.addressCountry,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }
}

/** FAQPage for the CMS FAQs rendered in the home FAQ section; null when the list is empty. */
export function getHomeFaqPageJsonLd(faqs) {
  return buildFaqPageJsonLd(faqs)
}
