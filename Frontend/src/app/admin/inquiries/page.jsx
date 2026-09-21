import AdminInquiriesPage from '@/modules/admin/components/AdminInquiriesPage'
import { getAdminInquiriesMetadata } from '@/modules/admin/page-data'

export const metadata = getAdminInquiriesMetadata()

export default function Page() {
  return <AdminInquiriesPage />
}
