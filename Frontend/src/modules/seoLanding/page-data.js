import {
  buildFaqPageJsonLd,
  buildPathMetadata,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from '@/utils/seo'
import { buildBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { getOpeningPlainText } from '@/constants/internalLinks'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
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
      speakable: true,
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

  return [
    buildWebPageJsonLd({
      name: guide.question,
      description: seo.description,
      path: guide.path,
      speakable: true,
    }),
    buildBreadcrumbJsonLd(guide.path),
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
      speakable: true,
    }),
    buildBreadcrumbJsonLd(GUIDE_HUB.path),
  ]
}

export { GUIDE_PAGES }
