'use client'

import { useEffect, useState } from 'react'
import { adminFaqFormSchema } from '@/schemas/adminFaq'
import { slugifyTitle } from '@/modules/admin/utils/serviceForm'

function fieldErrorsFromZod(error) {
  const next = {}
  error.issues.forEach((issue) => {
    const key = issue.path[0]
    if (typeof key === 'string' && !next[key]) next[key] = issue.message
  })
  return next
}

function emptyForm() {
  return { slug: '', question: '', answer: '', isActive: true }
}

function toFormValues(faq) {
  return {
    slug: faq.slug,
    question: faq.question,
    answer: faq.answer,
    isActive: faq.isActive,
  }
}

export function useAdminFaqForm({ faq, onSubmit }) {
  const [values, setValues] = useState(() => (faq ? toFormValues(faq) : emptyForm()))
  const [errors, setErrors] = useState({})
  const [slugTouched, setSlugTouched] = useState(Boolean(faq))
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setValues(faq ? toFormValues(faq) : emptyForm())
    setErrors({})
    setSlugTouched(Boolean(faq))
  }, [faq])

  const setField = (name, value) => {
    setValues((current) => {
      const next = { ...current, [name]: value }
      if (name === 'question' && !slugTouched) next.slug = slugifyTitle(value)
      return next
    })
    setErrors((current) => {
      if (!current[name] && name !== 'question') return current
      const next = { ...current }
      delete next[name]
      if (name === 'question') delete next.slug
      return next
    })
  }

  const setSlug = (value) => {
    setSlugTouched(true)
    setField('slug', slugifyTitle(value))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const parsed = adminFaqFormSchema.safeParse(values)
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
