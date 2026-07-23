import AdminSecurityPage from '@/modules/admin/components/AdminSecurityPage'
import { getAdminSecurityMetadata } from '@/modules/admin/page-data'

export const metadata = getAdminSecurityMetadata()

export default function Page() {
  return <AdminSecurityPage />
}
