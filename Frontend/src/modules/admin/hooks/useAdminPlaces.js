'use client'

import { useCallback, useEffect, useState } from 'react'
import { ADMIN_COPY, ADMIN_ERROR_MESSAGES } from '@/modules/admin/constants'
import {
  createAdminPlace,
  deleteAdminPlace,
  deleteAdminPlaceMedia,
  fetchAdminPlaceOptions,
  fetchAdminPlaces,
  moveAdminPlace,
  updateAdminPlace,
  uploadAdminPlaceMedia,
} from '@/modules/admin/services/adminPlacesApi'
import { ApiClientError } from '@/services/api/client'

function mapError(error) {
  if (!(error instanceof ApiClientError)) return ADMIN_ERROR_MESSAGES.placesGeneric
  if (error.status === 401) return ADMIN_ERROR_MESSAGES.unauthorized
  if (error.errorCode === 'NETWORK_ERROR') return ADMIN_ERROR_MESSAGES.network
  return error.message || ADMIN_ERROR_MESSAGES.placesGeneric
}

function replaceItem(items, updated) {
  return items.map((item) => (item.id === updated.id ? updated : item))
}

export function useAdminPlaces(token) {
  const [items, setItems] = useState([])
  const [tiers, setTiers] = useState([])
  const [tierFilter, setTierFilter] = useState('')
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
      const [list, options] = await Promise.all([
        fetchAdminPlaces(token, tierFilter || undefined),
        fetchAdminPlaceOptions(token),
      ])
      setItems(list.items)
      setTiers(options.tiers)
    } catch (err) {
      setError(mapError(err))
      setItems([])
    } finally {
      setIsLoading(false)
    }
  }, [token, tierFilter])

  useEffect(() => {
    void load()
  }, [load])

  const clearFeedback = () => {
    setActionError('')
    setSuccessMessage('')
  }

  const savePlace = async (payload, editingId, mediaOptions = {}) => {
    clearFeedback()
    setPendingId(editingId || 'create')
    try {
      let saved = editingId
        ? await updateAdminPlace(token, editingId, payload)
        : await createAdminPlace(token, payload)

      if (mediaOptions.removeMedia) {
        saved = await deleteAdminPlaceMedia(token, saved.id)
      } else if (mediaOptions.mediaFile) {
        saved = await uploadAdminPlaceMedia(token, saved.id, mediaOptions.mediaFile)
      }

      if (tierFilter && saved.tierId !== tierFilter) {
        setItems((current) => current.filter((item) => item.id !== saved.id))
      } else if (editingId) {
        setItems((current) => replaceItem(current, saved))
      } else {
        setItems((current) => [...current, saved].sort((a, b) => a.sortOrder - b.sortOrder))
      }

      setSuccessMessage(
        mediaOptions.mediaFile || mediaOptions.removeMedia
          ? ADMIN_COPY.placesMediaUploadSuccess
          : editingId
            ? ADMIN_COPY.placesUpdateSuccess
            : ADMIN_COPY.placesCreateSuccess,
      )
      return saved
    } catch (err) {
      setActionError(mapError(err))
      throw err
    } finally {
      setPendingId('')
    }
  }

  const removePlace = async (id) => {
    clearFeedback()
    setPendingId(id)
    try {
      const result = await deleteAdminPlace(token, id, tierFilter || undefined)
      setItems(result.items)
      setSuccessMessage(ADMIN_COPY.placesDeleteSuccess)
    } catch (err) {
      setActionError(mapError(err))
      throw err
    } finally {
      setPendingId('')
    }
  }

  const movePlace = async (id, direction) => {
    clearFeedback()
    setPendingId(id)
    try {
      const result = await moveAdminPlace(token, id, direction)
      setItems(
        tierFilter
          ? result.items.filter((item) => item.tierId === tierFilter)
          : result.items,
      )
    } catch (err) {
      setActionError(mapError(err))
    } finally {
      setPendingId('')
    }
  }

  return {
    items,
    tiers,
    tierFilter,
    setTierFilter,
    isLoading,
    error,
    actionError,
    successMessage,
    pendingId,
    loadingLabel: ADMIN_COPY.placesLoading,
    savePlace,
    removePlace,
    movePlace,
    clearFeedback,
  }
}
