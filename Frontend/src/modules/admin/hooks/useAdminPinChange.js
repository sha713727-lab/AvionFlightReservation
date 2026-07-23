'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ApiClientError } from '@/services/api/client'
import { ADMIN_ERROR_MESSAGES, ADMIN_COPY } from '@/modules/admin/constants'
import { changeAdminPin } from '@/modules/admin/services/adminAuth'
import { clearAdminSession } from '@/modules/admin/utils/session'
import { ADMIN_LOGIN_PATH } from '@/constants/routes'
import { adminPinChangeSchema } from '@/schemas/adminLogin'

const EMPTY = {
  currentPin: '',
  newPin: '',
  confirmPin: '',
}

function mapError(error) {
  if (!(error instanceof ApiClientError)) return ADMIN_ERROR_MESSAGES.pinChangeGeneric
  if (error.status === 401 || error.errorCode === 'AUTH_401' || error.errorCode === 'AUTH_PIN_401') {
    if (error.errorCode === 'AUTH_PIN_401') return ADMIN_ERROR_MESSAGES.pinInvalid
    return ADMIN_ERROR_MESSAGES.unauthorized
  }
  if (error.errorCode === 'NETWORK_ERROR') return ADMIN_ERROR_MESSAGES.network
  return error.message || ADMIN_ERROR_MESSAGES.pinChangeGeneric
}

export function useAdminPinChange(token) {
  const router = useRouter()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const setField = (field, raw) => {
    const value = String(raw ?? '').replace(/\D/g, '').slice(0, 8)
    setValues((current) => ({ ...current, [field]: value }))
    setFormError('')
    setSuccessMessage('')
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const save = async (event) => {
    event.preventDefault()
    if (isSaving) return

    const parsed = adminPinChangeSchema.safeParse(values)
    if (!parsed.success) {
      const nextErrors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (typeof key === 'string' && !nextErrors[key]) {
          nextErrors[key] = issue.message
        }
      }
      setErrors(nextErrors)
      return
    }

    setIsSaving(true)
    setErrors({})
    setFormError('')
    setSuccessMessage('')

    try {
      await changeAdminPin(token, parsed.data)
      setValues(EMPTY)
      setSuccessMessage(ADMIN_COPY.securitySuccess)
    } catch (error) {
      if (
        error instanceof ApiClientError &&
        (error.status === 401 ||
          error.errorCode === 'AUTH_401' ||
          error.errorCode === 'AUTH_401_EXPIRED')
      ) {
        clearAdminSession()
        router.replace(ADMIN_LOGIN_PATH)
        return
      }
      setFormError(mapError(error))
    } finally {
      setIsSaving(false)
    }
  }

  return {
    values,
    errors,
    formError,
    successMessage,
    isSaving,
    setField,
    save,
  }
}
