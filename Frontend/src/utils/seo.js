import { BRAND_FULL_NAME } from '@/constants/brand'
import {
  CONTACT_EMAILS,
  MAILING_ADDRESS_LINES,
  PHONE_NUMBER,
  SITE_URL,
} from '@/constants/contact'
import { AVION_HERO_BACKGROUND_SRC } from '@/constants/images'

export const SEO_ROBOTS_INDEX = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
  },
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  ogImage = AVION_HERO_BACKGROUND_SRC,
}) {
  const canonical = `${SITE_URL}${path}`

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
      siteName: BRAND_FULL_NAME,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
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

export function buildWebPageJsonLd({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${SITE_URL}${path}`,
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
