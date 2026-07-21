'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ApiClientError } from '@/services/api/client'
import { ADMIN_LOGIN_PATH } from '@/constants/routes'
import { ADMIN_COPY, ADMIN_ERROR_MESSAGES } from '@/modules/admin/constants'
import { fetchAdminDashboardSummary } from '@/modules/admin/services/adminDashboard'
import { clearAdminSession } from '@/modules/admin/utils/session'

export function useAdminDashboard(token) {
  const router = useRouter()
  const [summary, setSummary] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      setError('')

      try {
        const data = await fetchAdminDashboardSummary(token)
        if (!cancelled) {
          setSummary(data)
        }
      } catch (err) {
        if (cancelled) return

        const unauthorized =
          err instanceof ApiClientError &&
          (err.status === 401 ||
            err.errorCode === 'AUTH_401' ||
            err.errorCode === 'AUTH_401_EXPIRED')

        if (unauthorized) {
          clearAdminSession()
          router.replace(ADMIN_LOGIN_PATH)
          return
        }

        setError(
          err instanceof ApiClientError
            ? `${err.message}${err.status ? ` [${err.status}/${err.errorCode}]` : ''}`
            : ADMIN_ERROR_MESSAGES.network,
        )
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [token, router])

  return {
    summary,
    isLoading,
    error,
    loadingLabel: ADMIN_COPY.loadingDashboard,
  }
}
