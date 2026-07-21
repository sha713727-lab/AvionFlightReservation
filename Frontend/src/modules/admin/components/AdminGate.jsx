'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ADMIN_LOGIN_PATH } from '@/constants/routes'
import { ADMIN_COPY } from '@/modules/admin/constants'
import { readAdminSession } from '@/modules/admin/utils/session'

export default function AdminGate({ children }) {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const current = readAdminSession()
    if (!current) {
      router.replace(ADMIN_LOGIN_PATH)
      return
    }
    setSession(current)
    setReady(true)
  }, [router])

  if (!ready) {
    return (
      <main
        id="main-content"
        className="flex min-h-dvh items-center justify-center bg-background px-4"
      >
        <p className="text-sm text-text-secondary" role="status">
          {ADMIN_COPY.redirecting}
        </p>
      </main>
    )
  }

  return typeof children === 'function' ? children(session) : children
}
