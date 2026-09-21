import { API_V1_PREFIX } from '@/constants/api'
import { adminInquiryListSchema, adminInquirySchema } from '@/schemas/adminInquiry'
import { apiDelete, apiGet, apiPut } from '@/services/api/client'

/** Keep as strings so HMR/bundling cannot leave endpoint keys undefined. */
const ADMIN_INQUIRIES_PATH = `${API_V1_PREFIX}/admin/inquiries`
const adminInquiryByIdPath = (id) => `${ADMIN_INQUIRIES_PATH}/${id}`
const adminInquiryStatusPath = (id) => `${ADMIN_INQUIRIES_PATH}/${id}/status`

export async function fetchAdminInquiries(token, status) {
  const path = status
    ? `${ADMIN_INQUIRIES_PATH}?status=${encodeURIComponent(status)}`
    : ADMIN_INQUIRIES_PATH
  return apiGet(path, adminInquiryListSchema, {
    token,
    cache: 'no-store',
  })
}

export async function updateAdminInquiryStatus(token, id, status) {
  return apiPut(
    adminInquiryStatusPath(id),
    { status },
    adminInquirySchema,
    { token },
  )
}

export async function deleteAdminInquiry(token, id) {
  return apiDelete(adminInquiryByIdPath(id), adminInquiryListSchema, { token })
}
