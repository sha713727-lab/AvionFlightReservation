'use client'

import { useRouter } from 'next/navigation'
import { ADMIN_LOGIN_PATH } from '@/constants/routes'
import { ADMIN_COPY } from '@/modules/admin/constants'
import AdminContactHome from '@/modules/admin/components/AdminContactHome'
import AdminGate from '@/modules/admin/components/AdminGate'
import AdminShell from '@/modules/admin/components/AdminShell'
import { clearAdminSession } from '@/modules/admin/utils/session'

export default function AdminContactPage() {
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
            title={ADMIN_COPY.settingsTitle}
            description={ADMIN_COPY.settingsDescription}
          >
            <AdminContactHome token={session.token} />
          </AdminShell>
        </main>
      )}
    </AdminGate>
  )
}
