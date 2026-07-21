'use client'

import { useRouter } from 'next/navigation'
import { ADMIN_LOGIN_PATH } from '@/constants/routes'
import { ADMIN_COPY } from '@/modules/admin/constants'
import AdminGate from '@/modules/admin/components/AdminGate'
import AdminPlacesHome from '@/modules/admin/components/AdminPlacesHome'
import AdminShell from '@/modules/admin/components/AdminShell'
import { clearAdminSession } from '@/modules/admin/utils/session'

export default function AdminPlacesPage() {
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
            title={ADMIN_COPY.placesTitle}
            description={ADMIN_COPY.placesDescription}
          >
            <AdminPlacesHome token={session.token} />
          </AdminShell>
        </main>
      )}
    </AdminGate>
  )
}
