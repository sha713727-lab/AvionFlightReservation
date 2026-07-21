import { API_ENDPOINTS } from '@/constants/api'
import { apiDelete, apiGet, apiPost, apiPut } from '@/services/api/client'
import { adminFaqListSchema, adminFaqSchema } from '@/schemas/adminFaq'

export async function fetchAdminFaqs(token) {
  return apiGet(API_ENDPOINTS.adminFaqs, adminFaqListSchema, {
    token,
    cache: 'no-store',
  })
}

export async function createAdminFaq(token, body) {
  return apiPost(API_ENDPOINTS.adminFaqs, body, adminFaqSchema, { token })
}

export async function updateAdminFaq(token, id, body) {
  return apiPut(API_ENDPOINTS.adminFaqById(id), body, adminFaqSchema, { token })
}

export async function deleteAdminFaq(token, id) {
  return apiDelete(API_ENDPOINTS.adminFaqById(id), adminFaqListSchema, { token })
}

export async function moveAdminFaq(token, id, direction) {
  return apiPost(
    API_ENDPOINTS.adminFaqMove(id),
    { direction },
    adminFaqListSchema,
    { token },
  )
}
