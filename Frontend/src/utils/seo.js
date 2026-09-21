import { BRAND_FULL_NAME } from '@/constants/brand'
import {
  CANONICAL_ORIGIN,
  CONTACT_EMAILS,
  MAILING_ADDRESS,
  PHONE_NUMBER,
  buildCanonicalUrl,
} from '@/constants/contact'
import { SEO_OG_IMAGE_ABSOLUTE, SEO_SITE_NAME } from '@/constants/images'
import { getSeoPageMeta } from '@/constants/seoPageMeta'

/** Public pages — indexable with rich result preview hints. */
export const SEO_ROBOTS_INDEX = {
  index: true,
  follow: true,
  'max-image-preview': 'large',
  'max-snippet': -1,
  'max-video-preview': -1,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  ogImage = SEO_OG_IMAGE_ABSOLUTE,
}) {
  const canonical = buildCanonicalUrl(path)

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    robots: SEO_ROBOTS_INDEX,
    openGraph: {
      type: 'website',
      title,
      description,
      url: canonical,
      siteName: SEO_SITE_NAME,
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

/** Build full Next.js metadata from the centralized SEO_PAGE_META map. */
export function buildPathMetadata(path) {
  const meta = getSeoPageMeta(path)
  return buildPageMetadata({
    title: meta.title,
    description: meta.description,
    path,
    keywords: meta.keywords,
  })
}

/**
 * Stable node identifiers — every record joins one graph (audit §11).
 * Page/service nodes are namespaced by their own canonical URL.
 */
export const ORGANIZATION_ID = `${CANONICAL_ORIGIN}/#organization`
export const WEBSITE_ID = `${CANONICAL_ORIGIN}/#website`

export function buildWebPageId(path) {
  return `${buildCanonicalUrl(path)}#webpage`
}

export function buildServiceId(path) {
  return `${buildCanonicalUrl(path)}#service`
}

/**
 * Organization record for a service/contact page.
 * No priceRange — assistance fees are quoted, never published as a range.
 */
export function buildTravelAssistanceJsonLd({ description, path, includeAddress = false }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: BRAND_FULL_NAME,
    description,
    url: buildCanonicalUrl(path),
    telephone: PHONE_NUMBER,
    email: CONTACT_EMAILS,
    areaServed: ['Canada', 'United States', 'Europe', 'Mexico'],
  }

  if (includeAddress) {
    jsonLd.address = {
      '@type': 'PostalAddress',
      streetAddress: MAILING_ADDRESS.streetAddress,
      addressLocality: MAILING_ADDRESS.addressLocality,
      addressRegion: MAILING_ADDRESS.addressRegion,
      postalCode: MAILING_ADDRESS.postalCode,
      addressCountry: MAILING_ADDRESS.addressCountry,
    }
  }

  return jsonLd
}

export function buildWebPageJsonLd({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': buildWebPageId(path),
    name,
    description,
    url: buildCanonicalUrl(path),
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
  }
}

export function buildWebSiteJsonLd({ name, description, path = '/' }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name,
    description,
    url: buildCanonicalUrl(path),
    publisher: { '@id': ORGANIZATION_ID },
  }
}

export function buildBreadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: buildCanonicalUrl(item.path),
    })),
  }
}

export function buildFaqPageJsonLd(faqs) {
  if (!faqs?.length) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: [faq.answer, faq.detail].filter(Boolean).join(' '),
      },
    })),
  }
}

/** Service records carry no Offer — pricing is quoted, not published. */
export function buildServiceJsonLd({ name, description, path, serviceType }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': buildServiceId(path),
    name,
    description,
    url: buildCanonicalUrl(path),
    serviceType,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: ['Canada', 'United States', 'Europe', 'Mexico'],
  }
}
