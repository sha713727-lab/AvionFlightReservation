import { API_ENDPOINTS, CATALOG_REVALIDATE_SECONDS, getApiBaseUrl } from '@/constants/api'
import { apiGet } from '@/services/api/client'
import { serverHttpGetJson } from '@/services/api/serverHttpGet'
import { blueRewardsPageSchema } from '@/schemas/blueRewardsPage'
import { apiFailureSchema, apiSuccessSchema } from '@/schemas/catalog'
import { ApiClientError } from '@/services/api/client'
import { API_ERROR_MESSAGES } from '@/constants/api'
import { getFallbackBlueRewardsPage } from '@/modules/blueRewards/constants/fallbackPage'
import { withFallbackBlueRewardsMedia } from '@/modules/blueRewards/utils/withFallbackMedia'

export async function fetchBlueRewardsPageClient() {
  const page = await apiGet(API_ENDPOINTS.blueRewardsPage, blueRewardsPageSchema, {
    next: { revalidate: CATALOG_REVALIDATE_SECONDS },
  })
  return withFallbackBlueRewardsMedia(page)
}

export async function fetchBlueRewardsPageServer() {
  const baseUrl = getApiBaseUrl()
  if (!baseUrl) {
    return getFallbackBlueRewardsPage()
  }

  try {
    const url = new URL(API_ENDPOINTS.blueRewardsPage, baseUrl).toString()
    const response = await serverHttpGetJson(url)
    if (!response.ok) {
      return getFallbackBlueRewardsPage()
    }

    let payload
    try {
      payload = JSON.parse(response.body)
    } catch {
      return getFallbackBlueRewardsPage()
    }

    if (!payload || payload.success === false) {
      return getFallbackBlueRewardsPage()
    }

    const envelope = apiSuccessSchema.safeParse(payload)
    if (!envelope.success) {
      return getFallbackBlueRewardsPage()
    }

    const data = blueRewardsPageSchema.safeParse(envelope.data.data)
    if (!data.success) {
      return getFallbackBlueRewardsPage()
    }

    return withFallbackBlueRewardsMedia(data.data)
  } catch {
    return getFallbackBlueRewardsPage()
  }
}

export { ApiClientError, API_ERROR_MESSAGES, apiFailureSchema }
