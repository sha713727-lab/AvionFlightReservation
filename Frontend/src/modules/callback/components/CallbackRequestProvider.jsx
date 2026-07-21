'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import CallbackRequestModal from '@/modules/callback/components/CallbackRequestModal'
import { ADMIN_PATH } from '@/constants/routes'

const LEGACY_SESSION_KEY = 'avion-callback-modal-done'

export default function CallbackRequestProvider({ children }) {
  const pathname = usePathname()
  const isAdminRoute = pathname === ADMIN_PATH || pathname.startsWith(`${ADMIN_PATH}/`)

  useEffect(() => {
    try {
      sessionStorage.removeItem(LEGACY_SESSION_KEY)
    } catch {
      // Ignore storage access failures.
    }
  }, [])

  return (
    <>
      {children}
      {isAdminRoute ? null : <CallbackRequestModal key={pathname} />}
    </>
  )
}
