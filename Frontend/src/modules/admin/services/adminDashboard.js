import { API_ENDPOINTS } from '@/constants/api'
import { apiGet } from '@/services/api/client'
import { adminDashboardSummarySchema } from '@/schemas/adminDashboard'

export async function fetchAdminDashboardSummary(token) {
  return apiGet(API_ENDPOINTS.adminDashboardSummary, adminDashboardSummarySchema, {
    token,
    cache: 'no-store',
  })
}
