import AdminPlacesPage from '@/modules/admin/components/AdminPlacesPage'
import { getAdminPlacesMetadata } from '@/modules/admin/page-data'

export const metadata = getAdminPlacesMetadata()

export default function Page() {
  return <AdminPlacesPage />
}
