import { API_ENDPOINTS } from '@/constants/api'
import { apiPost } from '@/services/api/client'
import {
  adminLoginResultSchema,
  adminOtpChallengeSchema,
} from '@/schemas/adminLogin'

export async function loginAdmin(credentials) {
  return apiPost(API_ENDPOINTS.adminLogin, credentials, adminOtpChallengeSchema)
}

export async function verifyAdminOtp(payload) {
  return apiPost(API_ENDPOINTS.adminOtpVerify, payload, adminLoginResultSchema)
}

export async function resendAdminOtp(payload) {
  return apiPost(API_ENDPOINTS.adminOtpResend, payload, adminOtpChallengeSchema)
}
