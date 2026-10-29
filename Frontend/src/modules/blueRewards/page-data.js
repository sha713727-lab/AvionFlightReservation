import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { BLUE_REWARDS_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import {
  buildFaqPageJsonLd,
  buildPageMetadata,
  buildTravelAssistanceJsonLd,
  buildWebPageJsonLd,
} from '@/utils/seo'
import { fetchBlueRewardsPageServer } from '@/modules/blueRewards/services/blueRewardsPageApi'

export async function loadBlueRewardsPage() {
  return fetchBlueRewardsPageServer()
}

export async function getBlueRewardsPageMetadata() {
  const page = await loadBlueRewardsPage()
  const fallback = getSeoPageMeta(BLUE_REWARDS_PATH)
  return buildPageMetadata({
    title: page.metaTitle || fallback.title,
    description: page.metaDescription || fallback.description,
    path: BLUE_REWARDS_PATH,
    keywords: fallback.keywords,
  })
}

export async function getBlueRewardsPageJsonLd() {
  const page = await loadBlueRewardsPage()
  const fallback = getSeoPageMeta(BLUE_REWARDS_PATH)
  const description = page.metaDescription || fallback.description
  const faqs = page.faqs.filter((item) => item.isEnabled)
  return withBreadcrumbJsonLd(BLUE_REWARDS_PATH, [
    buildWebPageJsonLd({
      name: page.metaTitle || fallback.title,
      description,
      path: BLUE_REWARDS_PATH,
    }),
    buildTravelAssistanceJsonLd({ description }),
    ...(faqs.length ? [buildFaqPageJsonLd(faqs)] : []),
  ])
}
