import { API_ENDPOINTS, API_ERROR_MESSAGES, getApiBaseUrl } from '@/constants/api'
import { apiDelete, apiGet, apiPost, apiPut, ApiClientError } from '@/services/api/client'
import {
  adminPlaceListSchema,
  adminPlaceOptionsSchema,
  adminPlaceSchema,
} from '@/schemas/adminPlace'
import { apiFailureSchema, apiSuccessSchema } from '@/schemas/catalog'

export async function fetchAdminPlaces(token, tierId) {
  const path = tierId
    ? `${API_ENDPOINTS.adminPlaces}?tierId=${encodeURIComponent(tierId)}`
    : API_ENDPOINTS.adminPlaces
  return apiGet(path, adminPlaceListSchema, {
    token,
    cache: 'no-store',
  })
}

export async function fetchAdminPlaceOptions(token) {
  return apiGet(API_ENDPOINTS.adminPlaceOptions, adminPlaceOptionsSchema, {
    token,
    cache: 'no-store',
  })
}

export async function createAdminPlace(token, body) {
  return apiPost(API_ENDPOINTS.adminPlaces, body, adminPlaceSchema, { token })
}

export async function updateAdminPlace(token, id, body) {
  return apiPut(API_ENDPOINTS.adminPlaceById(id), body, adminPlaceSchema, { token })
}

export async function deleteAdminPlace(token, id, tierId) {
  const path = tierId
    ? `${API_ENDPOINTS.adminPlaceById(id)}?tierId=${encodeURIComponent(tierId)}`
    : API_ENDPOINTS.adminPlaceById(id)
  return apiDelete(path, adminPlaceListSchema, { token })
}

export async function moveAdminPlace(token, id, direction) {
  return apiPost(
    API_ENDPOINTS.adminPlaceMove(id),
    { direction },
    adminPlaceListSchema,
    { token },
  )
}

async function parseMediaResponse(response) {
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

  const data = adminPlaceSchema.safeParse(envelope.data.data)
  if (!data.success) {
    throw new ApiClientError(API_ERROR_MESSAGES.invalidResponse, response.status, 'SCHEMA_ERROR')
  }

  return data.data
}

export async function uploadAdminPlaceMedia(token, id, file) {
  const baseUrl = getApiBaseUrl()
  if (!baseUrl) {
    throw new ApiClientError(API_ERROR_MESSAGES.missingBaseUrl, 0, 'CONFIG_ERROR')
  }

  const formData = new FormData()
  formData.append('file', file)

  let response
  try {
    response = await fetch(new URL(API_ENDPOINTS.adminPlaceMedia(id), baseUrl), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: 'no-store',
    })
  } catch {
    throw new ApiClientError(API_ERROR_MESSAGES.network, 0, 'NETWORK_ERROR')
  }

  return parseMediaResponse(response)
}

export async function deleteAdminPlaceMedia(token, id) {
  return apiDelete(API_ENDPOINTS.adminPlaceMedia(id), adminPlaceSchema, { token })
}
