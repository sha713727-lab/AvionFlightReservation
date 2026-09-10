'use client'

import { useState } from 'react'
import {
  CONTACT_FORM_FIELD_NAMES,
  CONTACT_FORM_MESSAGES,
} from '@/modules/contact/constants'
import { submitContactForm } from '@/modules/contact/services/contactFormApi'
import { contactFormSchema } from '@/schemas/contactForm'

const EMPTY_VALUES = {
  [CONTACT_FORM_FIELD_NAMES.name]: '',
  [CONTACT_FORM_FIELD_NAMES.email]: '',
  [CONTACT_FORM_FIELD_NAMES.phone]: '+1 ',
  [CONTACT_FORM_FIELD_NAMES.subject]: '',
  [CONTACT_FORM_FIELD_NAMES.message]: '',
}

export function useContactForm() {
  const [values, setValues] = useState(EMPTY_VALUES)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const setField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    setFormError('')
    setIsSuccess(false)
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

    const result = contactFormSchema.safeParse(values)
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
      submitContactForm(result.data)
      setValues(EMPTY_VALUES)
      setIsSuccess(true)
    } catch {
      setFormError(CONTACT_FORM_MESSAGES.submitFailed)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    values,
    errors,
    formError,
    isSubmitting,
    isSuccess,
    setField,
    handleSubmit,
  }
}
