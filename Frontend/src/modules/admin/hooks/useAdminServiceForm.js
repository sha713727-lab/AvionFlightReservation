'use client'

import { useEffect, useState } from 'react'
import { adminServiceFormSchema } from '@/schemas/adminService'
import {
  createEmptyServiceForm,
  serviceToFormValues,
  slugifyTitle,
} from '@/modules/admin/utils/serviceForm'

function fieldErrorsFromZod(error) {
  const next = {}
  error.issues.forEach((issue) => {
    const key = issue.path[0]
    if (typeof key === 'string' && !next[key]) {
      next[key] = issue.message
    }
  })
  return next
}

export function useAdminServiceForm({ service, onSubmit }) {
  const [values, setValues] = useState(() =>
    service ? serviceToFormValues(service) : createEmptyServiceForm(),
  )
  const [errors, setErrors] = useState({})
  const [slugTouched, setSlugTouched] = useState(Boolean(service))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mediaFile, setMediaFile] = useState(null)
  const [removeMedia, setRemoveMedia] = useState(false)

  useEffect(() => {
    setValues(service ? serviceToFormValues(service) : createEmptyServiceForm())
    setErrors({})
    setSlugTouched(Boolean(service))
    setMediaFile(null)
    setRemoveMedia(false)
  }, [service])

  const setField = (name, value) => {
    setValues((current) => {
      const next = { ...current, [name]: value }
      if (name === 'title' && !slugTouched) {
        next.slug = slugifyTitle(value)
      }
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

  const setFeature = (index, value) => {
    setValues((current) => {
      const features = [...current.features]
      features[index] = value
      return { ...current, features }
    })
    setErrors((current) => {
      if (!current.features) return current
      const next = { ...current }
      delete next.features
      return next
    })
  }

  const addFeature = () => {
    setValues((current) => {
      if (current.features.length >= 12) return current
      return { ...current, features: [...current.features, ''] }
    })
  }

  const removeFeature = (index) => {
    setValues((current) => {
      if (current.features.length <= 1) return current
      return {
        ...current,
        features: current.features.filter((_, featureIndex) => featureIndex !== index),
      }
    })
  }

  const onSelectMediaFile = (file, errorMessage) => {
    if (errorMessage) {
      setErrors((current) => ({ ...current, media: errorMessage }))
      return
    }
    setMediaFile(file)
    setRemoveMedia(false)
    setErrors((current) => {
      if (!current.media) return current
      const next = { ...current }
      delete next.media
      return next
    })
  }

  const onClearMediaSelection = () => {
    setMediaFile(null)
  }

  const onRemoveExistingMedia = () => {
    setMediaFile(null)
    setRemoveMedia(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    const parsed = adminServiceFormSchema.safeParse({
      ...values,
      features: values.features.map((item) => item.trim()).filter(Boolean),
    })

    if (!parsed.success) {
      setErrors(fieldErrorsFromZod(parsed.error))
      return
    }

    setIsSubmitting(true)
    setErrors({})
    try {
      await onSubmit(parsed.data, { mediaFile, removeMedia })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    values,
    errors,
    isSubmitting,
    mediaFile,
    removeMedia,
    setField,
    setSlug,
    setFeature,
    addFeature,
    removeFeature,
    onSelectMediaFile,
    onClearMediaSelection,
    onRemoveExistingMedia,
    handleSubmit,
  }
}
