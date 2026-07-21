import { getAdminLoginMetadata } from '@/modules/admin/page-data'
import AdminLoginPage from '@/modules/admin/components/AdminLoginPage'

export const metadata = getAdminLoginMetadata()

export default function Page() {
  return <AdminLoginPage />
}
