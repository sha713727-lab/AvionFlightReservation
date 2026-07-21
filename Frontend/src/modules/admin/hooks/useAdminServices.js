'use client'

import { useCallback, useEffect, useState } from 'react'
import { ADMIN_COPY, ADMIN_ERROR_MESSAGES } from '@/modules/admin/constants'
import {
  createAdminService,
  deleteAdminService,
  deleteAdminServiceMedia,
  fetchAdminServiceOptions,
  fetchAdminServices,
  moveAdminService,
  updateAdminService,
  uploadAdminServiceMedia,
} from '@/modules/admin/services/adminServicesApi'
import { ApiClientError } from '@/services/api/client'

function mapServicesError(error) {
  if (!(error instanceof ApiClientError)) {
    return ADMIN_ERROR_MESSAGES.servicesGeneric
  }
  if (error.status === 401) return ADMIN_ERROR_MESSAGES.unauthorized
  if (error.status === 409) return ADMIN_ERROR_MESSAGES.servicesConflict
  if (error.errorCode === 'NETWORK_ERROR') return ADMIN_ERROR_MESSAGES.network
  return error.message || ADMIN_ERROR_MESSAGES.servicesGeneric
}

function replaceItem(items, updated) {
  return items.map((item) => (item.id === updated.id ? updated : item))
}

export function useAdminServices(token) {
  const [items, setItems] = useState([])
  const [options, setOptions] = useState({ iconKeys: [], imageKeys: [] })
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
      const [list, lovs] = await Promise.all([
        fetchAdminServices(token),
        fetchAdminServiceOptions(token),
      ])
      setItems(list.items)
      setOptions(lovs)
    } catch (err) {
      setError(mapServicesError(err))
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

  const saveService = async (payload, editingId, mediaOptions = {}) => {
    clearFeedback()
    setPendingId(editingId || 'create')
    try {
      let saved
      if (editingId) {
        saved = await updateAdminService(token, editingId, payload)
      } else {
        saved = await createAdminService(token, payload)
      }

      if (mediaOptions.removeMedia) {
        saved = await deleteAdminServiceMedia(token, saved.id)
      } else if (mediaOptions.mediaFile) {
        saved = await uploadAdminServiceMedia(token, saved.id, mediaOptions.mediaFile)
      }

      if (editingId) {
        setItems((current) => replaceItem(current, saved))
        setSuccessMessage(
          mediaOptions.mediaFile || mediaOptions.removeMedia
            ? ADMIN_COPY.servicesMediaUploadSuccess
            : ADMIN_COPY.servicesUpdateSuccess,
        )
      } else {
        setItems((current) => [...current, saved].sort((a, b) => a.sortOrder - b.sortOrder))
        setSuccessMessage(ADMIN_COPY.servicesCreateSuccess)
      }

      return saved
    } catch (err) {
      setActionError(mapServicesError(err))
      throw err
    } finally {
      setPendingId('')
    }
  }

  const removeService = async (id) => {
    clearFeedback()
    setPendingId(id)
    try {
      const result = await deleteAdminService(token, id)
      setItems(result.items)
      setSuccessMessage(ADMIN_COPY.servicesDeleteSuccess)
    } catch (err) {
      setActionError(mapServicesError(err))
      throw err
    } finally {
      setPendingId('')
    }
  }

  const moveService = async (id, direction) => {
    clearFeedback()
    setPendingId(id)
    try {
      const result = await moveAdminService(token, id, direction)
      setItems(result.items)
    } catch (err) {
      setActionError(mapServicesError(err))
    } finally {
      setPendingId('')
    }
  }

  return {
    items,
    options,
    isLoading,
    error,
    actionError,
    successMessage,
    pendingId,
    loadingLabel: ADMIN_COPY.servicesLoading,
    reload: load,
    saveService,
    removeService,
    moveService,
    clearFeedback,
  }
}
