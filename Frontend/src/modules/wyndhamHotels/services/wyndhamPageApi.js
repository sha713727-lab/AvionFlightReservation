import { API_ENDPOINTS, CATALOG_REVALIDATE_SECONDS, getApiBaseUrl } from '@/constants/api'
import { apiGet } from '@/services/api/client'
import { serverHttpGetJson } from '@/services/api/serverHttpGet'
import { wyndhamPageSchema } from '@/schemas/wyndhamPage'
import { apiFailureSchema, apiSuccessSchema } from '@/schemas/catalog'
import { ApiClientError } from '@/services/api/client'
import { API_ERROR_MESSAGES } from '@/constants/api'
import { getFallbackWyndhamPage } from '@/modules/wyndhamHotels/constants/fallbackPage'

export async function fetchWyndhamPageClient() {
  return apiGet(API_ENDPOINTS.wyndhamPage, wyndhamPageSchema, {
    next: { revalidate: CATALOG_REVALIDATE_SECONDS },
  })
}

export async function fetchWyndhamPageServer() {
  const baseUrl = getApiBaseUrl()
  if (!baseUrl) {
    return getFallbackWyndhamPage()
  }

  try {
    const url = new URL(API_ENDPOINTS.wyndhamPage, baseUrl).toString()
    const response = await serverHttpGetJson(url)
    if (!response.ok) {
      return getFallbackWyndhamPage()
    }

    let payload
    try {
      payload = JSON.parse(response.body)
    } catch {
      return getFallbackWyndhamPage()
    }

    if (!payload || payload.success === false) {
      return getFallbackWyndhamPage()
    }

    const envelope = apiSuccessSchema.safeParse(payload)
    if (!envelope.success) {
      return getFallbackWyndhamPage()
    }

    const data = wyndhamPageSchema.safeParse(envelope.data.data)
    if (!data.success) {
      return getFallbackWyndhamPage()
    }

    return data.data
  } catch {
    return getFallbackWyndhamPage()
  }
}

export { ApiClientError, API_ERROR_MESSAGES, apiFailureSchema }
