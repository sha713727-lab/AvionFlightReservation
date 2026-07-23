'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ADMIN_LOGIN_PATH } from '@/constants/routes'
import { ADMIN_COPY, ADMIN_ERROR_MESSAGES } from '@/modules/admin/constants'
import {
  deleteAdminCallback,
  fetchAdminCallbacks,
  updateAdminCallbackStatus,
} from '@/modules/admin/services/adminCallbacksApi'
import { clearAdminSession } from '@/modules/admin/utils/session'
import { ApiClientError } from '@/services/api/client'

function isUnauthorized(error) {
  return (
    error instanceof ApiClientError &&
    (error.status === 401 ||
      error.errorCode === 'AUTH_401' ||
      error.errorCode === 'AUTH_401_EXPIRED' ||
      error.errorCode === 'AUTH_INVALID')
  )
}

function mapError(error) {
  if (!(error instanceof ApiClientError)) return ADMIN_ERROR_MESSAGES.callbacksGeneric
  if (error.status === 401 || isUnauthorized(error)) return ADMIN_ERROR_MESSAGES.unauthorized
  if (error.errorCode === 'NETWORK_ERROR') return ADMIN_ERROR_MESSAGES.network
  return error.message || ADMIN_ERROR_MESSAGES.callbacksGeneric
}

function replaceItem(items, updated) {
  return items.map((item) => (item.id === updated.id ? updated : item))
}

export function useAdminCallbacks(token) {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionError, setActionError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [pendingId, setPendingId] = useState('')

  const load = useCallback(async () => {
    if (!token) return
    setIsLoading(true)
    setError('')
    try {
      const list = await fetchAdminCallbacks(token, statusFilter || undefined)
      setItems(Array.isArray(list?.items) ? list.items : [])
    } catch (err) {
      if (isUnauthorized(err)) {
        clearAdminSession()
        router.replace(ADMIN_LOGIN_PATH)
        return
      }
      setError(mapError(err))
      setItems([])
    } finally {
      setIsLoading(false)
    }
  }, [token, statusFilter, router])

  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    const onFocus = () => {
      void load()
    }
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [load])

  const clearFeedback = () => {
    setActionError('')
    setSuccessMessage('')
  }

  const changeStatus = async (id, status) => {
    clearFeedback()
    setPendingId(id)
    try {
      const updated = await updateAdminCallbackStatus(token, id, status)
      if (statusFilter && updated.status !== statusFilter) {
        setItems((current) => current.filter((item) => item.id !== id))
      } else {
        setItems((current) => replaceItem(current, updated))
      }
      setSuccessMessage(ADMIN_COPY.callbacksUpdateSuccess)
    } catch (err) {
      if (isUnauthorized(err)) {
        clearAdminSession()
        router.replace(ADMIN_LOGIN_PATH)
        return
      }
      setActionError(mapError(err))
    } finally {
      setPendingId('')
    }
  }

  const removeCallback = async (id) => {
    clearFeedback()
    setPendingId(id)
    try {
      const result = await deleteAdminCallback(token, id)
      setItems(
        statusFilter
          ? result.items.filter((item) => item.status === statusFilter)
          : result.items,
      )
      setSuccessMessage(ADMIN_COPY.callbacksDeleteSuccess)
    } catch (err) {
      if (isUnauthorized(err)) {
        clearAdminSession()
        router.replace(ADMIN_LOGIN_PATH)
        return
      }
      setActionError(mapError(err))
      throw err
    } finally {
      setPendingId('')
    }
  }

  return {
    items,
    statusFilter,
    setStatusFilter,
    isLoading,
    error,
    actionError,
    successMessage,
    pendingId,
    loadingLabel: ADMIN_COPY.callbacksLoading,
    changeStatus,
    removeCallback,
    refresh: load,
    clearFeedback,
  }
}
