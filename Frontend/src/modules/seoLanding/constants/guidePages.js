import {
  GUIDE_HUB,
  GUIDE_PAGES,
} from '@/modules/seoLanding/constants/guidePagesEntries'

export { GUIDE_HUB, GUIDE_PAGES }

export function getGuidePageBySlug(slug) {
  return GUIDE_PAGES.find((page) => page.slug === slug)
}
