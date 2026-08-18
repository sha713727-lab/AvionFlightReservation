'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { ADMIN_PATH } from '@/constants/routes'

const FlightPathEffect = dynamic(() => import('@/components/effects/FlightPathEffect'), {
  ssr: false,
})

export default function ConditionalFlightPathEffect() {
  const pathname = usePathname()
  const [enabled, setEnabled] = useState(false)
  const isAdminRoute = pathname === ADMIN_PATH || pathname.startsWith(`${ADMIN_PATH}/`)

  useEffect(() => {
    if (isAdminRoute) return undefined

    const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches
    const desktop = window.matchMedia('(min-width: 768px)').matches
    if (!motionOk || !desktop) return undefined

    const enable = () => setEnabled(true)
    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(enable, { timeout: 2500 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timer = window.setTimeout(enable, 1200)
    return () => window.clearTimeout(timer)
  }, [isAdminRoute])

  if (isAdminRoute || !enabled) {
    return null
  }

  return <FlightPathEffect />
}
