'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import CallbackRequestModal from '@/modules/callback/components/CallbackRequestModal'

const LEGACY_SESSION_KEY = 'avion-callback-modal-done'

export default function CallbackRequestProvider({ children }) {
  const pathname = usePathname()

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
      <CallbackRequestModal key={pathname} />
    </>
  )
}
