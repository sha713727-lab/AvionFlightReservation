import AdminFaqsPage from '@/modules/admin/components/AdminFaqsPage'
import { getAdminFaqsMetadata } from '@/modules/admin/page-data'

export const metadata = getAdminFaqsMetadata()

export default function Page() {
  return <AdminFaqsPage />
}
