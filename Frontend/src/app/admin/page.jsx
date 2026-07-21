import { getAdminDashboardMetadata } from '@/modules/admin/page-data'
import AdminDashboardPage from '@/modules/admin/components/AdminDashboardPage'

export const metadata = getAdminDashboardMetadata()

export default function Page() {
  return <AdminDashboardPage />
}
