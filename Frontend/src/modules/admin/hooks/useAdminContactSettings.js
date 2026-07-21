'use client'

import { useCallback, useEffect, useState } from 'react'
import { ADMIN_COPY, ADMIN_ERROR_MESSAGES } from '@/modules/admin/constants'
import {
  fetchContactSettings,
  updateContactSettings,
} from '@/modules/admin/services/adminSettingsApi'
import { contactSettingsFormSchema } from '@/schemas/contactSettings'
import { ApiClientError } from '@/services/api/client'
import { formatNorthAmericanPhone } from '@/utils/northAmericanPhone'

const MAX_PHONES = 5

function mapError(error) {
  if (!(error instanceof ApiClientError)) return ADMIN_ERROR_MESSAGES.settingsGeneric
  if (error.status === 401) return ADMIN_ERROR_MESSAGES.unauthorized
  if (error.errorCode === 'NETWORK_ERROR') return ADMIN_ERROR_MESSAGES.network
  return error.message || ADMIN_ERROR_MESSAGES.settingsGeneric
}

function fieldErrorsFromZod(error) {
  const next = {}
  error.issues.forEach((issue) => {
    const path = issue.path
    if (path[0] === 'supportPhones' && typeof path[1] === 'number') {
      next[`phone-${path[1]}`] = issue.message
      return
    }
    if (path[0] === 'supportPhones') {
      next.phones = issue.message
      return
    }
    if (path[0] === 'reservationEmail') {
      next.email = issue.message
    }
  })
  return next
}

export function useAdminContactSettings(token) {
  const [email, setEmail] = useState('')
  const [phones, setPhones] = useState(['+1 '])
  const [fieldErrors, setFieldErrors] = useState({})
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
      setEmail(data.reservationEmail)
      setPhones(
        data.supportPhones.length > 0
          ? data.supportPhones.map((phone) => formatNorthAmericanPhone(phone))
          : ['+1 '],
      )
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

  const clearFeedback = () => {
    setFieldErrors({})
    setSuccessMessage('')
  }

  const setEmailValue = (value) => {
    setEmail(value)
    clearFeedback()
  }

  const setPhoneValue = (index, value) => {
    setPhones((current) => current.map((phone, i) => (i === index ? value : phone)))
    clearFeedback()
  }

  const addPhone = () => {
    if (phones.length >= MAX_PHONES) return
    setPhones((current) => [...current, '+1 '])
    clearFeedback()
  }

  const removePhone = (index) => {
    if (phones.length <= 1) return
    setPhones((current) => current.filter((_, i) => i !== index))
    clearFeedback()
  }

  const save = async (event) => {
    event.preventDefault()
    if (isSaving) return
    setSuccessMessage('')
    setError('')
    const parsed = contactSettingsFormSchema.safeParse({
      reservationEmail: email,
      supportPhones: phones,
    })
    if (!parsed.success) {
      setFieldErrors(fieldErrorsFromZod(parsed.error))
      return
    }
    setFieldErrors({})
    setIsSaving(true)
    try {
      const saved = await updateContactSettings(token, parsed.data)
      setEmail(saved.reservationEmail)
      setPhones(saved.supportPhones.map((phone) => formatNorthAmericanPhone(phone)))
      setSuccessMessage(ADMIN_COPY.settingsUpdateSuccess)
    } catch (err) {
      setError(mapError(err))
    } finally {
      setIsSaving(false)
    }
  }

  return {
    email,
    setEmail: setEmailValue,
    phones,
    setPhoneValue,
    addPhone,
    removePhone,
    canAddPhone: phones.length < MAX_PHONES,
    canRemovePhone: phones.length > 1,
    fieldErrors,
    isLoading,
    isSaving,
    error,
    successMessage,
    loaded,
    save,
    loadingLabel: ADMIN_COPY.settingsLoading,
  }
}
