import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { WYNDHAM_HOTELS_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import {
  buildPageMetadata,
  buildTravelAssistanceJsonLd,
  buildWebPageJsonLd,
} from '@/utils/seo'
import { fetchWyndhamPageServer } from '@/modules/wyndhamHotels/services/wyndhamPageApi'

export async function loadWyndhamPage() {
  return fetchWyndhamPageServer()
}

export async function getWyndhamPageMetadata() {
  const page = await loadWyndhamPage()
  const fallback = getSeoPageMeta(WYNDHAM_HOTELS_PATH)
  return buildPageMetadata({
    title: page.metaTitle || fallback.title,
    description: page.metaDescription || fallback.description,
    path: WYNDHAM_HOTELS_PATH,
    keywords: fallback.keywords,
  })
}

export async function getWyndhamPageJsonLd() {
  const page = await loadWyndhamPage()
  const fallback = getSeoPageMeta(WYNDHAM_HOTELS_PATH)
  const description = page.metaDescription || fallback.description
  return withBreadcrumbJsonLd(WYNDHAM_HOTELS_PATH, [
    buildWebPageJsonLd({
      name: page.metaTitle || fallback.title,
      description,
      path: WYNDHAM_HOTELS_PATH,
    }),
    buildTravelAssistanceJsonLd({
      description,
      path: WYNDHAM_HOTELS_PATH,
      includeAddress: false,
    }),
  ])
}
