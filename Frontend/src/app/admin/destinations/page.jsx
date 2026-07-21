import AdminDestinationsPage from '@/modules/admin/components/AdminDestinationsPage'
import { getAdminDestinationsMetadata } from '@/modules/admin/page-data'

export const metadata = getAdminDestinationsMetadata()

export default function Page() {
  return <AdminDestinationsPage />
}
