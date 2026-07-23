'use client'

import { useRouter } from 'next/navigation'
import { ADMIN_LOGIN_PATH } from '@/constants/routes'
import { ADMIN_COPY } from '@/modules/admin/constants'
import AdminGate from '@/modules/admin/components/AdminGate'
import AdminSecurityHome from '@/modules/admin/components/AdminSecurityHome'
import AdminShell from '@/modules/admin/components/AdminShell'
import { clearAdminSession } from '@/modules/admin/utils/session'

export default function AdminSecurityPage() {
  const router = useRouter()

  const handleSignOut = () => {
    clearAdminSession()
    router.replace(ADMIN_LOGIN_PATH)
  }

  return (
    <AdminGate>
      {(session) => (
        <main id="main-content">
          <AdminShell
            email={session.admin.email}
            onSignOut={handleSignOut}
            title={ADMIN_COPY.securityTitle}
            description={ADMIN_COPY.securityDescription}
          >
            <AdminSecurityHome token={session.token} />
          </AdminShell>
        </main>
      )}
    </AdminGate>
  )
}
