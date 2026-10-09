import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { HILTON_HOTELS_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import {
  buildFaqPageJsonLd,
  buildPageMetadata,
  buildTravelAssistanceJsonLd,
  buildWebPageJsonLd,
} from '@/utils/seo'
import { fetchHiltonPageServer } from '@/modules/hiltonHotels/services/hiltonPageApi'

export async function loadHiltonPage() {
  return fetchHiltonPageServer()
}

export async function getHiltonPageMetadata() {
  const page = await loadHiltonPage()
  const fallback = getSeoPageMeta(HILTON_HOTELS_PATH)
  return buildPageMetadata({
    title: page.metaTitle || fallback.title,
    description: page.metaDescription || fallback.description,
    path: HILTON_HOTELS_PATH,
    keywords: fallback.keywords,
  })
}

export async function getHiltonPageJsonLd() {
  const page = await loadHiltonPage()
  const fallback = getSeoPageMeta(HILTON_HOTELS_PATH)
  const description = page.metaDescription || fallback.description
  const faqs = page.faqs.filter((item) => item.isEnabled)
  return withBreadcrumbJsonLd(HILTON_HOTELS_PATH, [
    buildWebPageJsonLd({
      name: page.metaTitle || fallback.title,
      description,
      path: HILTON_HOTELS_PATH,
    }),
    buildTravelAssistanceJsonLd({ description }),
    ...(faqs.length ? [buildFaqPageJsonLd(faqs)] : []),
  ])
}
