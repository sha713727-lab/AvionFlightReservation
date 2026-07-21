import AdminServicesPage from '@/modules/admin/components/AdminServicesPage'
import { getAdminServicesMetadata } from '@/modules/admin/page-data'

export const metadata = getAdminServicesMetadata()

export default function Page() {
  return <AdminServicesPage />
}
