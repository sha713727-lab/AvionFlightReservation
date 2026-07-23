import { API_V1_PREFIX } from '@/constants/api'
import { adminCallbackListSchema, adminCallbackSchema } from '@/schemas/adminCallback'
import { apiDelete, apiGet, apiPut } from '@/services/api/client'

/** Keep as strings so HMR/bundling cannot leave endpoint keys undefined. */
const ADMIN_CALLBACKS_PATH = `${API_V1_PREFIX}/admin/callbacks`
const adminCallbackByIdPath = (id) => `${ADMIN_CALLBACKS_PATH}/${id}`
const adminCallbackStatusPath = (id) => `${ADMIN_CALLBACKS_PATH}/${id}/status`

export async function fetchAdminCallbacks(token, status) {
  const path = status
    ? `${ADMIN_CALLBACKS_PATH}?status=${encodeURIComponent(status)}`
    : ADMIN_CALLBACKS_PATH
  return apiGet(path, adminCallbackListSchema, {
    token,
    cache: 'no-store',
  })
}

export async function updateAdminCallbackStatus(token, id, status) {
  return apiPut(
    adminCallbackStatusPath(id),
    { status },
    adminCallbackSchema,
    { token },
  )
}

export async function deleteAdminCallback(token, id) {
  return apiDelete(adminCallbackByIdPath(id), adminCallbackListSchema, { token })
}
