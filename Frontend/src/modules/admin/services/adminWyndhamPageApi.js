import { API_ENDPOINTS, API_ERROR_MESSAGES, getApiBaseUrl } from '@/constants/api'
import { apiDelete, apiGet, apiPost, apiPut, ApiClientError } from '@/services/api/client'
import { wyndhamPageSchema } from '@/schemas/wyndhamPage'
import { apiFailureSchema, apiSuccessSchema } from '@/schemas/catalog'

export async function fetchAdminWyndhamPage(token) {
  return apiGet(API_ENDPOINTS.adminWyndhamPage, wyndhamPageSchema, {
    token,
    cache: 'no-store',
  })
}

export async function updateAdminWyndhamPage(token, body) {
  return apiPut(API_ENDPOINTS.adminWyndhamPage, body, wyndhamPageSchema, { token })
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

  const data = wyndhamPageSchema.safeParse(envelope.data.data)
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

export async function uploadWyndhamSlotMedia(token, slotKey, file) {
  return uploadMedia(token, API_ENDPOINTS.adminWyndhamSlotMedia(slotKey), file)
}

export async function removeWyndhamSlotMedia(token, slotKey) {
  return apiDelete(API_ENDPOINTS.adminWyndhamSlotMedia(slotKey), wyndhamPageSchema, { token })
}

export async function createWyndhamPrinciple(token, body) {
  return apiPost(API_ENDPOINTS.adminWyndhamPrinciples, body, wyndhamPageSchema, { token })
}

export async function updateWyndhamPrinciple(token, id, body) {
  return apiPut(API_ENDPOINTS.adminWyndhamPrincipleById(id), body, wyndhamPageSchema, { token })
}

export async function deleteWyndhamPrinciple(token, id) {
  return apiDelete(API_ENDPOINTS.adminWyndhamPrincipleById(id), wyndhamPageSchema, { token })
}

export async function moveWyndhamPrinciple(token, id, direction) {
  return apiPost(API_ENDPOINTS.adminWyndhamPrincipleMove(id), { direction }, wyndhamPageSchema, {
    token,
  })
}

export async function createWyndhamRailCard(token, body) {
  return apiPost(API_ENDPOINTS.adminWyndhamRailCards, body, wyndhamPageSchema, { token })
}

export async function updateWyndhamRailCard(token, id, body) {
  return apiPut(API_ENDPOINTS.adminWyndhamRailCardById(id), body, wyndhamPageSchema, { token })
}

export async function deleteWyndhamRailCard(token, id) {
  return apiDelete(API_ENDPOINTS.adminWyndhamRailCardById(id), wyndhamPageSchema, { token })
}

export async function moveWyndhamRailCard(token, id, direction) {
  return apiPost(API_ENDPOINTS.adminWyndhamRailCardMove(id), { direction }, wyndhamPageSchema, {
    token,
  })
}

export async function uploadWyndhamRailMedia(token, id, file) {
  return uploadMedia(token, API_ENDPOINTS.adminWyndhamRailCardMedia(id), file)
}

export async function createWyndhamProperty(token, body) {
  return apiPost(API_ENDPOINTS.adminWyndhamProperties, body, wyndhamPageSchema, { token })
}

export async function updateWyndhamProperty(token, id, body) {
  return apiPut(API_ENDPOINTS.adminWyndhamPropertyById(id), body, wyndhamPageSchema, { token })
}

export async function deleteWyndhamProperty(token, id) {
  return apiDelete(API_ENDPOINTS.adminWyndhamPropertyById(id), wyndhamPageSchema, { token })
}

export async function moveWyndhamProperty(token, id, direction) {
  return apiPost(API_ENDPOINTS.adminWyndhamPropertyMove(id), { direction }, wyndhamPageSchema, {
    token,
  })
}

export async function uploadWyndhamPropertyMedia(token, id, file) {
  return uploadMedia(token, API_ENDPOINTS.adminWyndhamPropertyMedia(id), file)
}

export async function createWyndhamLogo(token, body) {
  return apiPost(API_ENDPOINTS.adminWyndhamLogos, body, wyndhamPageSchema, { token })
}

export async function updateWyndhamLogo(token, id, body) {
  return apiPut(API_ENDPOINTS.adminWyndhamLogoById(id), body, wyndhamPageSchema, { token })
}

export async function deleteWyndhamLogo(token, id) {
  return apiDelete(API_ENDPOINTS.adminWyndhamLogoById(id), wyndhamPageSchema, { token })
}

export async function moveWyndhamLogo(token, id, direction) {
  return apiPost(API_ENDPOINTS.adminWyndhamLogoMove(id), { direction }, wyndhamPageSchema, {
    token,
  })
}

export async function uploadWyndhamLogoMedia(token, id, file) {
  return uploadMedia(token, API_ENDPOINTS.adminWyndhamLogoMedia(id), file)
}

export async function createWyndhamFaq(token, body) {
  return apiPost(API_ENDPOINTS.adminWyndhamFaqs, body, wyndhamPageSchema, { token })
}

export async function updateWyndhamFaq(token, id, body) {
  return apiPut(API_ENDPOINTS.adminWyndhamFaqById(id), body, wyndhamPageSchema, { token })
}

export async function deleteWyndhamFaq(token, id) {
  return apiDelete(API_ENDPOINTS.adminWyndhamFaqById(id), wyndhamPageSchema, { token })
}

export async function moveWyndhamFaq(token, id, direction) {
  return apiPost(API_ENDPOINTS.adminWyndhamFaqMove(id), { direction }, wyndhamPageSchema, {
    token,
  })
}
