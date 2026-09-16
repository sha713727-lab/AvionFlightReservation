'use client'

import { useCallback, useEffect, useState } from 'react'
import { ADMIN_COPY, ADMIN_ERROR_MESSAGES } from '@/modules/admin/constants'
import {
  fetchContactSettings,
  updateContactSettings,
} from '@/modules/admin/services/adminSettingsApi'
import { ApiClientError } from '@/services/api/client'

function mapError(error) {
  if (!(error instanceof ApiClientError)) return ADMIN_ERROR_MESSAGES.settingsGeneric
  if (error.status === 401) return ADMIN_ERROR_MESSAGES.unauthorized
  if (error.errorCode === 'NETWORK_ERROR') return ADMIN_ERROR_MESSAGES.network
  return error.message || ADMIN_ERROR_MESSAGES.settingsGeneric
}

/**
 * Loads/saves SiteSettings.callbacksEnabled for the admin Callbacks page toggle.
 * Preserves contact email/phones on each save.
 */
export function useAdminCallbacksEnabled(token) {
  const [enabled, setEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loaded, setLoaded] = useState(false)

  const load = useCallback(async () => {
    if (!token) return
    setIsLoading(true)
    setError('')
    try {
      const data = await fetchContactSettings(token)
      setEnabled(Boolean(data.callbacksEnabled))
      setLoaded(true)
    } catch (err) {
      setError(mapError(err))
      setLoaded(false)
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    void load()
  }, [load])

  const setEnabledValue = async (nextEnabled) => {
    if (!token || isSaving) return
    setSuccessMessage('')
    setError('')
    setIsSaving(true)
    try {
      const current = await fetchContactSettings(token)
      const saved = await updateContactSettings(token, {
        reservationEmail: current.reservationEmail,
        supportPhones: current.supportPhones,
        callbacksEnabled: nextEnabled,
      })
      setEnabled(Boolean(saved.callbacksEnabled))
      setSuccessMessage(
        saved.callbacksEnabled
          ? ADMIN_COPY.callbacksEnabledOnSuccess
          : ADMIN_COPY.callbacksEnabledOffSuccess,
      )
    } catch (err) {
      setError(mapError(err))
    } finally {
      setIsSaving(false)
    }
  }

  return {
    enabled,
    setEnabled: setEnabledValue,
    isLoading,
    isSaving,
    error,
    successMessage,
    loaded,
    loadingLabel: ADMIN_COPY.callbacksEnabledLoading,
  }
}
