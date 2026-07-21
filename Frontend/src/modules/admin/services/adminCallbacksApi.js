import { API_ENDPOINTS } from '@/constants/api'
import { apiDelete, apiGet, apiPut } from '@/services/api/client'
import { adminCallbackListSchema, adminCallbackSchema } from '@/schemas/adminCallback'

export async function fetchAdminCallbacks(token, status) {
  const path = status
    ? `${API_ENDPOINTS.adminCallbacks}?status=${encodeURIComponent(status)}`
    : API_ENDPOINTS.adminCallbacks
  return apiGet(path, adminCallbackListSchema, {
    token,
    cache: 'no-store',
  })
}

export async function updateAdminCallbackStatus(token, id, status) {
  return apiPut(
    API_ENDPOINTS.adminCallbackStatus(id),
    { status },
    adminCallbackSchema,
    { token },
  )
}

export async function deleteAdminCallback(token, id) {
  return apiDelete(API_ENDPOINTS.adminCallbackById(id), adminCallbackListSchema, { token })
}
