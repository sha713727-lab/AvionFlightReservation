import {
  ORGANIZATION_ID,
  buildFaqPageJsonLd,
  buildPathMetadata,
  buildServiceJsonLd,
  buildWebPageId,
  buildWebPageJsonLd,
} from '@/utils/seo'
import { buildBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { buildCanonicalUrl } from '@/constants/contact'
import { GEO_BYLINES } from '@/constants/geo'
import { getOpeningPlainText } from '@/constants/internalLinks'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { getGuideFaqsBySlug } from '@/modules/seoLanding/constants/guideFaqs'
import { GUIDE_HUB, GUIDE_PAGES, getGuidePageBySlug } from '@/modules/seoLanding/constants/guidePages'
import { getServicePageBySlug } from '@/modules/seoLanding/constants/servicePages'

export function getServicePageMetadata(slug) {
  const page = getServicePageBySlug(slug)
  if (!page) {
    return {}
  }
  return buildPathMetadata(page.path)
}

export function getServicePageJsonLd(slug) {
  const page = getServicePageBySlug(slug)
  if (!page) {
    return []
  }

  const seo = getSeoPageMeta(page.path)
  const summary = getOpeningPlainText(page.speakableSummary || page.opening)

  return [
    buildWebPageJsonLd({
      name: page.h1,
      description: seo.description,
      path: page.path,
    }),
    buildServiceJsonLd({
      name: page.h1,
      description: summary,
      path: page.path,
      serviceType: page.h1,
    }),
    buildBreadcrumbJsonLd(page.path),
    buildFaqPageJsonLd(page.faqs),
  ]
}

/**
 * Editorial Article node for guides.
 * Organizational authorship + the review date shown on the page.
 */
function buildGuideArticleJsonLd(guide, description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${buildCanonicalUrl(guide.path)}#article`,
    headline: guide.question,
    description,
    url: buildCanonicalUrl(guide.path),
    dateModified: GEO_BYLINES.lastUpdatedIso,
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: { '@id': buildWebPageId(guide.path) },
  }
}

export function getGuidePageMetadata(slug) {
  const guide = getGuidePageBySlug(slug)
  if (!guide) {
    return {}
  }
  return buildPathMetadata(guide.path)
}

export function getGuidePageJsonLd(slug) {
  const guide = getGuidePageBySlug(slug)
  if (!guide) {
    return []
  }

  const seo = getSeoPageMeta(guide.path)
  const faqs = getGuideFaqsBySlug(slug)

  return [
    buildWebPageJsonLd({
      name: guide.question,
      description: seo.description,
      path: guide.path,
    }),
    buildGuideArticleJsonLd(guide, seo.description),
    buildBreadcrumbJsonLd(guide.path),
    ...(faqs.length ? [buildFaqPageJsonLd(faqs)] : []),
  ]
}

export function getGuidesHubMetadata() {
  return buildPathMetadata(GUIDE_HUB.path)
}

export function getGuidesHubJsonLd() {
  const seo = getSeoPageMeta(GUIDE_HUB.path)
  return [
    buildWebPageJsonLd({
      name: GUIDE_HUB.h1,
      description: seo.description,
      path: GUIDE_HUB.path,
    }),
    buildBreadcrumbJsonLd(GUIDE_HUB.path),
  ]
}

export { GUIDE_PAGES }
