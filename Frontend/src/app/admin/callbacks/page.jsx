import AdminCallbacksPage from '@/modules/admin/components/AdminCallbacksPage'
import { getAdminCallbacksMetadata } from '@/modules/admin/page-data'

export const metadata = getAdminCallbacksMetadata()

export default function Page() {
  return <AdminCallbacksPage />
}
