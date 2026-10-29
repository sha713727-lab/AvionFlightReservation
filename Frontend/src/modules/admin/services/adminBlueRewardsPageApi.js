import { API_ENDPOINTS, API_ERROR_MESSAGES, getApiBaseUrl } from '@/constants/api'
import { apiDelete, apiGet, apiPost, apiPut, ApiClientError } from '@/services/api/client'
import { blueRewardsPageSchema } from '@/schemas/blueRewardsPage'
import { apiFailureSchema, apiSuccessSchema } from '@/schemas/catalog'

export async function fetchAdminBlueRewardsPage(token) {
  return apiGet(API_ENDPOINTS.adminBlueRewardsPage, blueRewardsPageSchema, {
    token,
    cache: 'no-store',
  })
}

export async function updateAdminBlueRewardsPage(token, body) {
  return apiPut(API_ENDPOINTS.adminBlueRewardsPage, body, blueRewardsPageSchema, { token })
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

  const data = blueRewardsPageSchema.safeParse(envelope.data.data)
  if (!data.success) {
    const detail = data.error.issues[0]
    const hint = detail
      ? `${detail.path.join('.') || 'data'}: ${detail.message}`
      : API_ERROR_MESSAGES.invalidResponse
    throw new ApiClientError(hint, response.status, 'SCHEMA_ERROR')
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

export async function uploadBlueRewardsSlotMedia(token, slotKey, file) {
  return uploadMedia(token, API_ENDPOINTS.adminBlueRewardsSlotMedia(slotKey), file)
}

export async function removeBlueRewardsSlotMedia(token, slotKey) {
  return apiDelete(API_ENDPOINTS.adminBlueRewardsSlotMedia(slotKey), blueRewardsPageSchema, { token })
}

export async function createBlueRewardsPrinciple(token, body) {
  return apiPost(API_ENDPOINTS.adminBlueRewardsPrinciples, body, blueRewardsPageSchema, { token })
}

export async function updateBlueRewardsPrinciple(token, id, body) {
  return apiPut(API_ENDPOINTS.adminBlueRewardsPrincipleById(id), body, blueRewardsPageSchema, { token })
}

export async function deleteBlueRewardsPrinciple(token, id) {
  return apiDelete(API_ENDPOINTS.adminBlueRewardsPrincipleById(id), blueRewardsPageSchema, { token })
}

export async function moveBlueRewardsPrinciple(token, id, direction) {
  return apiPost(API_ENDPOINTS.adminBlueRewardsPrincipleMove(id), { direction }, blueRewardsPageSchema, {
    token,
  })
}

export async function createBlueRewardsRailCard(token, body) {
  return apiPost(API_ENDPOINTS.adminBlueRewardsRailCards, body, blueRewardsPageSchema, { token })
}

export async function updateBlueRewardsRailCard(token, id, body) {
  return apiPut(API_ENDPOINTS.adminBlueRewardsRailCardById(id), body, blueRewardsPageSchema, { token })
}

export async function deleteBlueRewardsRailCard(token, id) {
  return apiDelete(API_ENDPOINTS.adminBlueRewardsRailCardById(id), blueRewardsPageSchema, { token })
}

export async function moveBlueRewardsRailCard(token, id, direction) {
  return apiPost(API_ENDPOINTS.adminBlueRewardsRailCardMove(id), { direction }, blueRewardsPageSchema, {
    token,
  })
}

export async function uploadBlueRewardsRailMedia(token, id, file) {
  return uploadMedia(token, API_ENDPOINTS.adminBlueRewardsRailCardMedia(id), file)
}

export async function createBlueRewardsProperty(token, body) {
  return apiPost(API_ENDPOINTS.adminBlueRewardsProperties, body, blueRewardsPageSchema, { token })
}

export async function updateBlueRewardsProperty(token, id, body) {
  return apiPut(API_ENDPOINTS.adminBlueRewardsPropertyById(id), body, blueRewardsPageSchema, { token })
}

export async function deleteBlueRewardsProperty(token, id) {
  return apiDelete(API_ENDPOINTS.adminBlueRewardsPropertyById(id), blueRewardsPageSchema, { token })
}

export async function moveBlueRewardsProperty(token, id, direction) {
  return apiPost(API_ENDPOINTS.adminBlueRewardsPropertyMove(id), { direction }, blueRewardsPageSchema, {
    token,
  })
}

export async function uploadBlueRewardsPropertyMedia(token, id, file) {
  return uploadMedia(token, API_ENDPOINTS.adminBlueRewardsPropertyMedia(id), file)
}

export async function createBlueRewardsLogo(token, body) {
  return apiPost(API_ENDPOINTS.adminBlueRewardsLogos, body, blueRewardsPageSchema, { token })
}

export async function updateBlueRewardsLogo(token, id, body) {
  return apiPut(API_ENDPOINTS.adminBlueRewardsLogoById(id), body, blueRewardsPageSchema, { token })
}

export async function deleteBlueRewardsLogo(token, id) {
  return apiDelete(API_ENDPOINTS.adminBlueRewardsLogoById(id), blueRewardsPageSchema, { token })
}

export async function moveBlueRewardsLogo(token, id, direction) {
  return apiPost(API_ENDPOINTS.adminBlueRewardsLogoMove(id), { direction }, blueRewardsPageSchema, {
    token,
  })
}

export async function uploadBlueRewardsLogoMedia(token, id, file) {
  return uploadMedia(token, API_ENDPOINTS.adminBlueRewardsLogoMedia(id), file)
}

export async function createBlueRewardsFaq(token, body) {
  return apiPost(API_ENDPOINTS.adminBlueRewardsFaqs, body, blueRewardsPageSchema, { token })
}

export async function updateBlueRewardsFaq(token, id, body) {
  return apiPut(API_ENDPOINTS.adminBlueRewardsFaqById(id), body, blueRewardsPageSchema, { token })
}

export async function deleteBlueRewardsFaq(token, id) {
  return apiDelete(API_ENDPOINTS.adminBlueRewardsFaqById(id), blueRewardsPageSchema, { token })
}

export async function moveBlueRewardsFaq(token, id, direction) {
  return apiPost(API_ENDPOINTS.adminBlueRewardsFaqMove(id), { direction }, blueRewardsPageSchema, {
    token,
  })
}
