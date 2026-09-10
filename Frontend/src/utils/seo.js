import { BRAND_FULL_NAME } from '@/constants/brand'
import {
  CONTACT_EMAILS,
  MAILING_ADDRESS_LINES,
  PHONE_NUMBER,
  SITE_URL,
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

export function buildTravelAssistanceJsonLd({ description, path, includeAddress = false }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND_FULL_NAME,
    description,
    url: `${SITE_URL}${path}`,
    telephone: PHONE_NUMBER,
    email: CONTACT_EMAILS,
    areaServed: ['Canada', 'United States', 'Europe', 'Mexico'],
    priceRange: '$$',
    parentOrganization: {
      '@type': 'Organization',
      name: BRAND_FULL_NAME,
      url: SITE_URL,
    },
  }

  if (includeAddress) {
    jsonLd.address = {
      '@type': 'PostalAddress',
      streetAddress: MAILING_ADDRESS_LINES[0],
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      postalCode: 'M5X 1C9',
      addressCountry: 'CA',
    }
  }

  return jsonLd
}

/** CSS selectors Google Speakable / answer engines may use for voice snippets. */
export const SPEAKABLE_CSS_SELECTORS = ['.speakable-summary', 'h1', '.faq-answer']

export function buildWebPageJsonLd({ name, description, path, speakable = false }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: BRAND_FULL_NAME,
      url: SITE_URL,
    },
    about: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: BRAND_FULL_NAME,
      url: SITE_URL,
      email: CONTACT_EMAILS,
      telephone: PHONE_NUMBER,
    },
  }

  if (speakable) {
    jsonLd.speakable = {
      '@type': 'SpeakableSpecification',
      cssSelector: SPEAKABLE_CSS_SELECTORS,
    }
  }

  return jsonLd
}

export function buildWebSiteJsonLd({ name, description, path = '/' }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: BRAND_FULL_NAME,
      url: SITE_URL,
    },
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

export function buildServiceJsonLd({ name, description, path, serviceType }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE_URL}${path}`,
    serviceType,
    provider: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: BRAND_FULL_NAME,
      url: SITE_URL,
      telephone: PHONE_NUMBER,
      email: CONTACT_EMAILS,
    },
    areaServed: ['Canada', 'United States', 'Europe', 'Mexico'],
  }
}
