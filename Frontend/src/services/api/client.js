import { getApiBaseUrl, API_ERROR_MESSAGES } from '@/constants/api'
import { apiFailureSchema, apiSuccessSchema } from '@/schemas/catalog'

export class ApiClientError extends Error {
  constructor(message, status, errorCode, errors = []) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.errorCode = errorCode
    this.errors = errors
  }
}

function buildUrl(path, query) {
  const baseUrl = getApiBaseUrl()

  if (!baseUrl) {
    throw new ApiClientError(API_ERROR_MESSAGES.missingBaseUrl, 0, 'CONFIG_ERROR')
  }

  const url = new URL(path, baseUrl)

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, String(value))
    })
  }

  return url
}

function parseSuccessPayload(payload, schema, status) {
  if (!payload || payload.success === false) {
    const failure = apiFailureSchema.safeParse(payload)
    if (failure.success) {
      throw new ApiClientError(
        failure.data.message,
        status,
        failure.data.errorCode,
        failure.data.errors,
      )
    }

    throw new ApiClientError(API_ERROR_MESSAGES.requestFailed, status, 'REQUEST_FAILED')
  }

  const envelope = apiSuccessSchema.safeParse(payload)
  if (!envelope.success) {
    throw new ApiClientError(API_ERROR_MESSAGES.invalidResponse, status, 'SCHEMA_ERROR')
  }

  const data = schema.safeParse(envelope.data.data)
  if (!data.success) {
    throw new ApiClientError(API_ERROR_MESSAGES.invalidResponse, status, 'SCHEMA_ERROR')
  }

  return data.data
}

async function apiGetOnServer(url, schema) {
  const { serverHttpGetJson } = await import('@/services/api/serverHttpGet')
  const response = await serverHttpGetJson(url.toString())

  let payload
  try {
    payload = JSON.parse(response.body)
  } catch {
    throw new ApiClientError(API_ERROR_MESSAGES.invalidResponse, response.status, 'PARSE_ERROR')
  }

  if (!response.ok) {
    return parseSuccessPayload(payload, schema, response.status)
  }

  return parseSuccessPayload(payload, schema, response.status)
}

async function apiGetOnBrowser(url, schema, options) {
  let response

  try {
    response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      next: options.next,
      cache: options.cache,
    })
  } catch {
    throw new ApiClientError(API_ERROR_MESSAGES.network, 0, 'NETWORK_ERROR')
  }

  let payload
  try {
    payload = await response.json()
  } catch {
    throw new ApiClientError(API_ERROR_MESSAGES.invalidResponse, response.status, 'PARSE_ERROR')
  }

  if (!response.ok) {
    return parseSuccessPayload(payload, schema, response.status)
  }

  return parseSuccessPayload(payload, schema, response.status)
}

export async function apiGet(path, schema, options = {}) {
  const url = buildUrl(path, options.query)

  try {
    if (typeof window === 'undefined') {
      return await apiGetOnServer(url, schema)
    }

    return await apiGetOnBrowser(url, schema, options)
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error
    }

    throw new ApiClientError(API_ERROR_MESSAGES.network, 0, 'NETWORK_ERROR')
  }
}
