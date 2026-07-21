'use client'

import { useCallback, useEffect, useState } from 'react'
import { ADMIN_COPY, ADMIN_ERROR_MESSAGES } from '@/modules/admin/constants'
import {
  createAdminDestination,
  deleteAdminDestination,
  fetchAdminDestinations,
  moveAdminDestination,
  updateAdminDestination,
} from '@/modules/admin/services/adminDestinationsApi'
import { ApiClientError } from '@/services/api/client'

function mapError(error) {
  if (!(error instanceof ApiClientError)) return ADMIN_ERROR_MESSAGES.destinationsGeneric
  if (error.status === 401) return ADMIN_ERROR_MESSAGES.unauthorized
  if (error.status === 409) return ADMIN_ERROR_MESSAGES.destinationsConflict
  if (error.errorCode === 'NETWORK_ERROR') return ADMIN_ERROR_MESSAGES.network
  return error.message || ADMIN_ERROR_MESSAGES.destinationsGeneric
}

function replaceItem(items, updated) {
  return items.map((item) => (item.id === updated.id ? updated : item))
}

export function useAdminDestinations(token) {
  const [items, setItems] = useState([])
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
      const list = await fetchAdminDestinations(token)
      setItems(list.items)
    } catch (err) {
      setError(mapError(err))
      setItems([])
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    void load()
  }, [load])

  const clearFeedback = () => {
    setActionError('')
    setSuccessMessage('')
  }

  const saveDestination = async (payload, editingId) => {
    clearFeedback()
    setPendingId(editingId || 'create')
    try {
      const saved = editingId
        ? await updateAdminDestination(token, editingId, payload)
        : await createAdminDestination(token, payload)

      if (editingId) {
        setItems((current) => replaceItem(current, saved))
        setSuccessMessage(ADMIN_COPY.destinationsUpdateSuccess)
      } else {
        setItems((current) => [...current, saved].sort((a, b) => a.sortOrder - b.sortOrder))
        setSuccessMessage(ADMIN_COPY.destinationsCreateSuccess)
      }
      return saved
    } catch (err) {
      setActionError(mapError(err))
      throw err
    } finally {
      setPendingId('')
    }
  }

  const removeDestination = async (id) => {
    clearFeedback()
    setPendingId(id)
    try {
      const result = await deleteAdminDestination(token, id)
      setItems(result.items)
      setSuccessMessage(ADMIN_COPY.destinationsDeleteSuccess)
    } catch (err) {
      setActionError(mapError(err))
      throw err
    } finally {
      setPendingId('')
    }
  }

  const moveDestination = async (id, direction) => {
    clearFeedback()
    setPendingId(id)
    try {
      const result = await moveAdminDestination(token, id, direction)
      setItems(result.items)
    } catch (err) {
      setActionError(mapError(err))
    } finally {
      setPendingId('')
    }
  }

  return {
    items,
    isLoading,
    error,
    actionError,
    successMessage,
    pendingId,
    loadingLabel: ADMIN_COPY.destinationsLoading,
    saveDestination,
    removeDestination,
    moveDestination,
    clearFeedback,
  }
}
