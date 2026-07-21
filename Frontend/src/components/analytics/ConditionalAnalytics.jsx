'use client'

import { usePathname } from 'next/navigation'
import { ADMIN_PATH } from '@/constants/routes'

export default function ConditionalAnalytics({ children }) {
  const pathname = usePathname()
  const isAdminRoute = pathname === ADMIN_PATH || pathname.startsWith(`${ADMIN_PATH}/`)
  const isProduction = process.env.NODE_ENV === 'production'

  if (!isProduction || isAdminRoute) {
    return null
  }

  return children
}
