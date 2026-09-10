import { SERVICE_PAGES_GROUP_A } from '@/modules/seoLanding/constants/servicePagesGroupA'
import { SERVICE_PAGES_GROUP_B } from '@/modules/seoLanding/constants/servicePagesGroupB'

export const SERVICE_PAGES = [...SERVICE_PAGES_GROUP_A, ...SERVICE_PAGES_GROUP_B]

export function getServicePageBySlug(slug) {
  return SERVICE_PAGES.find((page) => page.slug === slug)
}
