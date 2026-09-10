import { AVION_LOGO_SRC } from '@/constants/brand'
import {
  CANONICAL_ORIGIN,
  MAILING_ADDRESS_LINES,
  PHONE_NUMBER,
} from '@/constants/contact'
import { COPY } from '@/constants/copy'
import { HOME_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { PLACEHOLDER_AGGREGATE_RATING } from '@/data/testimonials'
import { buildWebPageJsonLd } from '@/utils/seo'

/**
 * Homepage-only WebSite JSON-LD (schema.org).
 * No SearchAction — site has no /search page.
 */
export function getHomeWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AvioSupportDesk',
    alternateName: 'Avio Support Desk',
    url: CANONICAL_ORIGIN,
  }
}

/**
 * Homepage WebPage JSON-LD with SpeakableSpecification for answer engines.
 */
export function getHomeWebPageJsonLd() {
  const seo = getSeoPageMeta(HOME_PATH)

  return buildWebPageJsonLd({
    name: seo.title,
    description: COPY.hero.speakableSummary,
    path: HOME_PATH,
    speakable: true,
  })
}

/**
 * Homepage-only Organization JSON-LD (schema.org).
 *
 * FILL / CONFIRM BEFORE PUBLISH:
 * - sameAs[] — replace with live social profile URLs
 * - foundingDate — confirm year if different from 2026
 * - aggregateRating — PLACEHOLDER values; replace with real review-platform stats
 */
export function getHomeOrganizationJsonLd() {
  const logoPath = AVION_LOGO_SRC.startsWith('/') ? AVION_LOGO_SRC : `/${AVION_LOGO_SRC}`
  const rating = PLACEHOLDER_AGGREGATE_RATING

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AvioSupportDesk',
    alternateName: 'Avio Support Desk',
    url: CANONICAL_ORIGIN,
    logo: `${CANONICAL_ORIGIN}${logoPath.replace(/\.webp$/i, '.png')}`,
    description:
      '24/7 airline customer support service providing flight booking, cancellation, refund assistance, and travel support worldwide.',
    foundingDate: '2026',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: PHONE_NUMBER.replace(/\s+/g, '-'),
        contactType: 'customer service',
        areaServed: ['US', 'CA', 'GB', 'AU', 'IN'],
        availableLanguage: ['English'],
        contactOption: 'TollFree',
      },
    ],
    sameAs: [
      'https://www.facebook.com/aviosupportdesk',
      'https://twitter.com/aviosupportdesk',
      'https://www.linkedin.com/company/aviosupportdesk',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: MAILING_ADDRESS_LINES[0],
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      postalCode: 'M5X 1C9',
      addressCountry: 'CA',
    },
    // PLACEHOLDER AggregateRating — replace with real stats before publish
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.ratingValue,
      bestRating: rating.bestRating,
      worstRating: rating.worstRating,
      ratingCount: rating.ratingCount,
    },
  }
}

/**
 * Standalone AggregateRating JSON-LD for the homepage reviews section.
 * PLACEHOLDER: keep in sync with PLACEHOLDER_AGGREGATE_RATING until real stats exist.
 */
export function getHomeAggregateRatingJsonLd() {
  const rating = PLACEHOLDER_AGGREGATE_RATING

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: {
      '@type': 'Organization',
      name: 'AvioSupportDesk',
      url: CANONICAL_ORIGIN,
    },
    ratingValue: rating.ratingValue,
    bestRating: rating.bestRating,
    worstRating: rating.worstRating,
    ratingCount: rating.ratingCount,
  }
}
