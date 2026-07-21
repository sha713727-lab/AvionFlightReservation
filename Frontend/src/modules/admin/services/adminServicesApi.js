import { API_ENDPOINTS, API_ERROR_MESSAGES, getApiBaseUrl } from '@/constants/api'
import { apiDelete, apiGet, apiPost, apiPut, ApiClientError } from '@/services/api/client'
import {
  adminServiceListSchema,
  adminServiceOptionsSchema,
  adminServiceSchema,
} from '@/schemas/adminService'
import { apiFailureSchema, apiSuccessSchema } from '@/schemas/catalog'

export async function fetchAdminServices(token) {
  return apiGet(API_ENDPOINTS.adminServices, adminServiceListSchema, {
    token,
    cache: 'no-store',
  })
}

export async function fetchAdminServiceOptions(token) {
  return apiGet(API_ENDPOINTS.adminServiceOptions, adminServiceOptionsSchema, {
    token,
    cache: 'no-store',
  })
}

export async function createAdminService(token, body) {
  return apiPost(API_ENDPOINTS.adminServices, body, adminServiceSchema, { token })
}

export async function updateAdminService(token, id, body) {
  return apiPut(API_ENDPOINTS.adminServiceById(id), body, adminServiceSchema, { token })
}

export async function deleteAdminService(token, id) {
  return apiDelete(API_ENDPOINTS.adminServiceById(id), adminServiceListSchema, { token })
}

export async function moveAdminService(token, id, direction) {
  return apiPost(
    API_ENDPOINTS.adminServiceMove(id),
    { direction },
    adminServiceListSchema,
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

  const data = adminServiceSchema.safeParse(envelope.data.data)
  if (!data.success) {
    throw new ApiClientError(API_ERROR_MESSAGES.invalidResponse, response.status, 'SCHEMA_ERROR')
  }

  return data.data
}

export async function uploadAdminServiceMedia(token, id, file) {
  const baseUrl = getApiBaseUrl()
  if (!baseUrl) {
    throw new ApiClientError(API_ERROR_MESSAGES.missingBaseUrl, 0, 'CONFIG_ERROR')
  }

  const formData = new FormData()
  formData.append('file', file)

  let response
  try {
    response = await fetch(new URL(API_ENDPOINTS.adminServiceMedia(id), baseUrl), {
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

export async function deleteAdminServiceMedia(token, id) {
  return apiDelete(API_ENDPOINTS.adminServiceMedia(id), adminServiceSchema, { token })
}
