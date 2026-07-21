'use client'

import { useEffect, useState } from 'react'
import { adminDestinationFormSchema } from '@/schemas/adminDestination'
import {
  createEmptyDestinationForm,
  destinationToFormValues,
} from '@/modules/admin/utils/catalogForm'
import { slugifyTitle } from '@/modules/admin/utils/serviceForm'

function fieldErrorsFromZod(error) {
  const next = {}
  error.issues.forEach((issue) => {
    const key = issue.path[0]
    if (typeof key === 'string' && !next[key]) next[key] = issue.message
  })
  return next
}

export function useAdminDestinationForm({ destination, onSubmit }) {
  const [values, setValues] = useState(() =>
    destination ? destinationToFormValues(destination) : createEmptyDestinationForm(),
  )
  const [errors, setErrors] = useState({})
  const [slugTouched, setSlugTouched] = useState(Boolean(destination))
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setValues(destination ? destinationToFormValues(destination) : createEmptyDestinationForm())
    setErrors({})
    setSlugTouched(Boolean(destination))
  }, [destination])

  const setField = (name, value) => {
    setValues((current) => {
      const next = { ...current, [name]: value }
      if (name === 'title' && !slugTouched) next.slug = slugifyTitle(value)
      return next
    })
    setErrors((current) => {
      if (!current[name] && name !== 'title') return current
      const next = { ...current }
      delete next[name]
      if (name === 'title') delete next.slug
      return next
    })
  }

  const setSlug = (value) => {
    setSlugTouched(true)
    setField('slug', slugifyTitle(value))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const parsed = adminDestinationFormSchema.safeParse(values)
    if (!parsed.success) {
      setErrors(fieldErrorsFromZod(parsed.error))
      return
    }
    setIsSubmitting(true)
    try {
      await onSubmit(parsed.data)
    } finally {
      setIsSubmitting(false)
    }
  }

  return { values, errors, isSubmitting, setField, setSlug, handleSubmit }
}
