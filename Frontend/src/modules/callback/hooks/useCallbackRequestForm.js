'use client'

import { useState } from 'react'
import { CALLBACK_FIELD_NAMES } from '@/modules/callback/constants'
import { callbackRequestSchema } from '@/schemas/callbackRequest'

const EMPTY_VALUES = {
  [CALLBACK_FIELD_NAMES.name]: '',
  [CALLBACK_FIELD_NAMES.phone]: '',
  [CALLBACK_FIELD_NAMES.preferredAt]: '',
}

export function useCallbackRequestForm({ onSuccess }) {
  const [values, setValues] = useState(EMPTY_VALUES)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const handleSubmit = (event) => {
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
    onSuccess(result.data)
  }

  return {
    values,
    errors,
    isSubmitting,
    setField,
    handleSubmit,
  }
}
