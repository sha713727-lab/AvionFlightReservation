import AdminContactPage from '@/modules/admin/components/AdminContactPage'
import { getAdminContactMetadata } from '@/modules/admin/page-data'

export const metadata = getAdminContactMetadata()

export default function Page() {
  return <AdminContactPage />
}
