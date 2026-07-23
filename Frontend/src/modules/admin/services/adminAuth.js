import { API_V1_PREFIX } from '@/constants/api'
import { apiPost, apiPut } from '@/services/api/client'
import {
  adminLoginResultSchema,
  adminPinChallengeSchema,
  adminPinChangeResultSchema,
} from '@/schemas/adminLogin'

const ADMIN_LOGIN_PATH = `${API_V1_PREFIX}/admin/auth/login`
const ADMIN_PIN_VERIFY_PATH = `${API_V1_PREFIX}/admin/auth/pin/verify`
const ADMIN_PIN_CHANGE_PATH = `${API_V1_PREFIX}/admin/auth/pin`

export async function loginAdmin(credentials) {
  return apiPost(ADMIN_LOGIN_PATH, credentials, adminPinChallengeSchema)
}

export async function verifyAdminPin(payload) {
  return apiPost(ADMIN_PIN_VERIFY_PATH, payload, adminLoginResultSchema)
}

export async function changeAdminPin(token, payload) {
  return apiPut(ADMIN_PIN_CHANGE_PATH, payload, adminPinChangeResultSchema, { token })
}
