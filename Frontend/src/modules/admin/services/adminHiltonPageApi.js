import { API_ENDPOINTS, API_ERROR_MESSAGES, getApiBaseUrl } from '@/constants/api'
import { apiDelete, apiGet, apiPost, apiPut, ApiClientError } from '@/services/api/client'
import { hiltonPageSchema } from '@/schemas/hiltonPage'
import { apiFailureSchema, apiSuccessSchema } from '@/schemas/catalog'

export async function fetchAdminHiltonPage(token) {
  return apiGet(API_ENDPOINTS.adminHiltonPage, hiltonPageSchema, {
    token,
    cache: 'no-store',
  })
}

export async function updateAdminHiltonPage(token, body) {
  return apiPut(API_ENDPOINTS.adminHiltonPage, body, hiltonPageSchema, { token })
}

async function parsePageResponse(response) {
  let payload
  try {
    payload = await response.json()
  } catch {
    throw new ApiClientError(API_ERROR_MESSAGES.invalidResponse, response.status, 'PARSE_ERROR')
  }

  if (!payload || payload.success === false) {
    const failure = apiFailureSchema.safeParse(payload)
    if (failure.success) {
      throw new ApiClientError(
        failure.data.message,
        response.status,
        failure.data.errorCode,
        failure.data.errors,
      )
    }
    throw new ApiClientError(API_ERROR_MESSAGES.requestFailed, response.status, 'REQUEST_FAILED')
  }

  const envelope = apiSuccessSchema.safeParse(payload)
  if (!envelope.success) {
    throw new ApiClientError(API_ERROR_MESSAGES.invalidResponse, response.status, 'ENVELOPE_ERROR')
  }

  const data = hiltonPageSchema.safeParse(envelope.data.data)
  if (!data.success) {
    throw new ApiClientError(API_ERROR_MESSAGES.invalidResponse, response.status, 'SCHEMA_ERROR')
  }

  return data.data
}

async function uploadMedia(token, path, file) {
  const baseUrl = getApiBaseUrl()
  if (!baseUrl) {
    throw new ApiClientError(API_ERROR_MESSAGES.missingBaseUrl, 0, 'CONFIG_ERROR')
  }

  const formData = new FormData()
  formData.append('file', file)

  let response
  try {
    response = await fetch(new URL(path, baseUrl), {
      method: 'POST',
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      body: formData,
      cache: 'no-store',
    })
  } catch {
    throw new ApiClientError(API_ERROR_MESSAGES.network, 0, 'NETWORK_ERROR')
  }

  return parsePageResponse(response)
}

export async function uploadHiltonSlotMedia(token, slotKey, file) {
  return uploadMedia(token, API_ENDPOINTS.adminHiltonSlotMedia(slotKey), file)
}

export async function removeHiltonSlotMedia(token, slotKey) {
  return apiDelete(API_ENDPOINTS.adminHiltonSlotMedia(slotKey), hiltonPageSchema, { token })
}

export async function createHiltonPrinciple(token, body) {
  return apiPost(API_ENDPOINTS.adminHiltonPrinciples, body, hiltonPageSchema, { token })
}

export async function updateHiltonPrinciple(token, id, body) {
  return apiPut(API_ENDPOINTS.adminHiltonPrincipleById(id), body, hiltonPageSchema, { token })
}

export async function deleteHiltonPrinciple(token, id) {
  return apiDelete(API_ENDPOINTS.adminHiltonPrincipleById(id), hiltonPageSchema, { token })
}

export async function moveHiltonPrinciple(token, id, direction) {
  return apiPost(API_ENDPOINTS.adminHiltonPrincipleMove(id), { direction }, hiltonPageSchema, {
    token,
  })
}

export async function createHiltonRailCard(token, body) {
  return apiPost(API_ENDPOINTS.adminHiltonRailCards, body, hiltonPageSchema, { token })
}

export async function updateHiltonRailCard(token, id, body) {
  return apiPut(API_ENDPOINTS.adminHiltonRailCardById(id), body, hiltonPageSchema, { token })
}

export async function deleteHiltonRailCard(token, id) {
  return apiDelete(API_ENDPOINTS.adminHiltonRailCardById(id), hiltonPageSchema, { token })
}

export async function moveHiltonRailCard(token, id, direction) {
  return apiPost(API_ENDPOINTS.adminHiltonRailCardMove(id), { direction }, hiltonPageSchema, {
    token,
  })
}

export async function uploadHiltonRailMedia(token, id, file) {
  return uploadMedia(token, API_ENDPOINTS.adminHiltonRailCardMedia(id), file)
}

export async function createHiltonProperty(token, body) {
  return apiPost(API_ENDPOINTS.adminHiltonProperties, body, hiltonPageSchema, { token })
}

export async function updateHiltonProperty(token, id, body) {
  return apiPut(API_ENDPOINTS.adminHiltonPropertyById(id), body, hiltonPageSchema, { token })
}

export async function deleteHiltonProperty(token, id) {
  return apiDelete(API_ENDPOINTS.adminHiltonPropertyById(id), hiltonPageSchema, { token })
}

export async function moveHiltonProperty(token, id, direction) {
  return apiPost(API_ENDPOINTS.adminHiltonPropertyMove(id), { direction }, hiltonPageSchema, {
    token,
  })
}

export async function uploadHiltonPropertyMedia(token, id, file) {
  return uploadMedia(token, API_ENDPOINTS.adminHiltonPropertyMedia(id), file)
}

export async function createHiltonLogo(token, body) {
  return apiPost(API_ENDPOINTS.adminHiltonLogos, body, hiltonPageSchema, { token })
}

export async function updateHiltonLogo(token, id, body) {
  return apiPut(API_ENDPOINTS.adminHiltonLogoById(id), body, hiltonPageSchema, { token })
}

export async function deleteHiltonLogo(token, id) {
  return apiDelete(API_ENDPOINTS.adminHiltonLogoById(id), hiltonPageSchema, { token })
}

export async function moveHiltonLogo(token, id, direction) {
  return apiPost(API_ENDPOINTS.adminHiltonLogoMove(id), { direction }, hiltonPageSchema, {
    token,
  })
}

export async function uploadHiltonLogoMedia(token, id, file) {
  return uploadMedia(token, API_ENDPOINTS.adminHiltonLogoMedia(id), file)
}

export async function createHiltonFaq(token, body) {
  return apiPost(API_ENDPOINTS.adminHiltonFaqs, body, hiltonPageSchema, { token })
}

export async function updateHiltonFaq(token, id, body) {
  return apiPut(API_ENDPOINTS.adminHiltonFaqById(id), body, hiltonPageSchema, { token })
}

export async function deleteHiltonFaq(token, id) {
  return apiDelete(API_ENDPOINTS.adminHiltonFaqById(id), hiltonPageSchema, { token })
}

export async function moveHiltonFaq(token, id, direction) {
  return apiPost(API_ENDPOINTS.adminHiltonFaqMove(id), { direction }, hiltonPageSchema, {
    token,
  })
}
