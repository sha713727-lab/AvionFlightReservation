'use client'

import { usePathname } from 'next/navigation'
import FlightPathEffect from '@/components/effects/FlightPathEffect'
import { ADMIN_PATH } from '@/constants/routes'

export default function ConditionalFlightPathEffect() {
  const pathname = usePathname()
  const isAdminRoute = pathname === ADMIN_PATH || pathname.startsWith(`${ADMIN_PATH}/`)

  if (isAdminRoute) {
    return null
  }

  return <FlightPathEffect />
}
