import { API_ENDPOINTS } from '@/constants/api'
import { apiDelete, apiGet, apiPost, apiPut } from '@/services/api/client'
import {
  adminDestinationListSchema,
  adminDestinationSchema,
} from '@/schemas/adminDestination'

export async function fetchAdminDestinations(token) {
  return apiGet(API_ENDPOINTS.adminDestinations, adminDestinationListSchema, {
    token,
    cache: 'no-store',
  })
}

export async function createAdminDestination(token, body) {
  return apiPost(API_ENDPOINTS.adminDestinations, body, adminDestinationSchema, { token })
}

export async function updateAdminDestination(token, id, body) {
  return apiPut(API_ENDPOINTS.adminDestinationById(id), body, adminDestinationSchema, {
    token,
  })
}

export async function deleteAdminDestination(token, id) {
  return apiDelete(API_ENDPOINTS.adminDestinationById(id), adminDestinationListSchema, {
    token,
  })
}

export async function moveAdminDestination(token, id, direction) {
  return apiPost(
    API_ENDPOINTS.adminDestinationMove(id),
    { direction },
    adminDestinationListSchema,
    { token },
  )
}
