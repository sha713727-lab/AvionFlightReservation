'use client'

import { usePathname } from 'next/navigation'
import { ADMIN_PATH } from '@/constants/routes'

/**
 * Public pages load full measurement tags.
 * Admin loads GTM only so CRM outcome events can fire without Ads conversion tags.
 */
export default function ConditionalAnalytics({ children, includeAdmin = false }) {
  const pathname = usePathname()
  const isAdminRoute = pathname === ADMIN_PATH || pathname.startsWith(`${ADMIN_PATH}/`)
  const isProduction = process.env.NODE_ENV === 'production'

  if (!isProduction) {
    return null
  }

  if (isAdminRoute && !includeAdmin) {
    return null
  }

  return children
}
