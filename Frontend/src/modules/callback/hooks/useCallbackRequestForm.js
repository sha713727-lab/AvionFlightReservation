'use client'

import { useState } from 'react'
import { CALLBACK_FIELD_NAMES, CALLBACK_VALIDATION_MESSAGES } from '@/modules/callback/constants'
import { submitCallbackRequest } from '@/modules/callback/services/callbackApi'
import { callbackRequestSchema } from '@/schemas/callbackRequest'
import { ApiClientError } from '@/services/api/client'

const EMPTY_VALUES = {
  [CALLBACK_FIELD_NAMES.name]: '',
  [CALLBACK_FIELD_NAMES.phone]: '+1 ',
  [CALLBACK_FIELD_NAMES.preferredAt]: '',
}

function mapFieldErrors(error) {
  if (!(error instanceof ApiClientError) || !Array.isArray(error.errors)) return {}
  const next = {}
  for (const entry of error.errors) {
    const field = entry?.field
    const message = entry?.message
    if (typeof field === 'string' && typeof message === 'string' && !next[field]) {
      next[field] = message
    }
  }
  return next
}

function mapSubmitError(error) {
  if (!(error instanceof ApiClientError)) {
    return CALLBACK_VALIDATION_MESSAGES.submitFailed
  }
  if (error.errorCode === 'NETWORK_ERROR') {
    return CALLBACK_VALIDATION_MESSAGES.network
  }
  return error.message || CALLBACK_VALIDATION_MESSAGES.submitFailed
}

export function useCallbackRequestForm({ onSuccess }) {
  const [values, setValues] = useState(EMPTY_VALUES)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    setFormError('')
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    const result = callbackRequestSchema.safeParse(values)
    if (!result.success) {
      const nextErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0]
        if (typeof key === 'string' && !nextErrors[key]) {
          nextErrors[key] = issue.message
        }
      }
      setErrors(nextErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})
    setFormError('')
    try {
      await submitCallbackRequest(result.data)
      setValues(EMPTY_VALUES)
      onSuccess(result.data)
    } catch (error) {
      const fieldErrors = mapFieldErrors(error)
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors)
      }
      setFormError(mapSubmitError(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    values,
    errors,
    formError,
    isSubmitting,
    setField,
    handleSubmit,
  }
}
