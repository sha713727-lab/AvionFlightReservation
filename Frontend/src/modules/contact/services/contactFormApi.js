import { API_ENDPOINTS } from '@/constants/api'
import { apiPost } from '@/services/api/client'
import { inquiryCreatedSchema } from '@/schemas/inquiryCreated'

/**
 * Persists a validated contact inquiry via the public API.
 */
export async function submitContactForm(values) {
  return apiPost(API_ENDPOINTS.inquiries, values, inquiryCreatedSchema)
}
