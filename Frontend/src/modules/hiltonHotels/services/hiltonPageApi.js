import { API_ENDPOINTS, CATALOG_REVALIDATE_SECONDS, getApiBaseUrl } from '@/constants/api'
import { apiGet } from '@/services/api/client'
import { serverHttpGetJson } from '@/services/api/serverHttpGet'
import { hiltonPageSchema } from '@/schemas/hiltonPage'
import { apiFailureSchema, apiSuccessSchema } from '@/schemas/catalog'
import { ApiClientError } from '@/services/api/client'
import { API_ERROR_MESSAGES } from '@/constants/api'
import { getFallbackHiltonPage } from '@/modules/hiltonHotels/constants/fallbackPage'

export async function fetchHiltonPageClient() {
  return apiGet(API_ENDPOINTS.hiltonPage, hiltonPageSchema, {
    next: { revalidate: CATALOG_REVALIDATE_SECONDS },
  })
}

export async function fetchHiltonPageServer() {
  const baseUrl = getApiBaseUrl()
  if (!baseUrl) {
    return getFallbackHiltonPage()
  }

  try {
    const url = new URL(API_ENDPOINTS.hiltonPage, baseUrl).toString()
    const response = await serverHttpGetJson(url)
    if (!response.ok) {
      return getFallbackHiltonPage()
    }

    let payload
    try {
      payload = JSON.parse(response.body)
    } catch {
      return getFallbackHiltonPage()
    }

    if (!payload || payload.success === false) {
      return getFallbackHiltonPage()
    }

    const envelope = apiSuccessSchema.safeParse(payload)
    if (!envelope.success) {
      return getFallbackHiltonPage()
    }

    const data = hiltonPageSchema.safeParse(envelope.data.data)
    if (!data.success) {
      return getFallbackHiltonPage()
    }

    return data.data
  } catch {
    return getFallbackHiltonPage()
  }
}

export { ApiClientError, API_ERROR_MESSAGES, apiFailureSchema }
