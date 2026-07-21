'use client'

import { useCallback, useEffect, useState } from 'react'
import { ADMIN_COPY, ADMIN_ERROR_MESSAGES } from '@/modules/admin/constants'
import {
  deleteAdminCallback,
  fetchAdminCallbacks,
  updateAdminCallbackStatus,
} from '@/modules/admin/services/adminCallbacksApi'
import { ApiClientError } from '@/services/api/client'

function mapError(error) {
  if (!(error instanceof ApiClientError)) return ADMIN_ERROR_MESSAGES.callbacksGeneric
  if (error.status === 401) return ADMIN_ERROR_MESSAGES.unauthorized
  if (error.errorCode === 'NETWORK_ERROR') return ADMIN_ERROR_MESSAGES.network
  return error.message || ADMIN_ERROR_MESSAGES.callbacksGeneric
}

function replaceItem(items, updated) {
  return items.map((item) => (item.id === updated.id ? updated : item))
}

export function useAdminCallbacks(token) {
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
      setItems(list.items)
    } catch (err) {
      setError(mapError(err))
      setItems([])
    } finally {
      setIsLoading(false)
    }
  }, [token, statusFilter])

  useEffect(() => {
    void load()
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
    clearFeedback,
  }
}
