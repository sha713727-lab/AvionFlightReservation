'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { ADMIN_PATH } from '@/constants/routes'

const FloatingActions = dynamic(() => import('@/components/layout/FloatingActions'), {
  ssr: false,
})

/** Loads the floating call button after hydration; skipped on admin routes. */
export default function ConditionalFloatingActions() {
  const pathname = usePathname()
  const isAdminRoute = pathname === ADMIN_PATH || pathname.startsWith(`${ADMIN_PATH}/`)

  if (isAdminRoute) {
    return null
  }

  return <FloatingActions />
}
