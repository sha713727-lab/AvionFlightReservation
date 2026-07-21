'use client'

import { useEffect, useState } from 'react'
import { ADMIN_PLACE_VALIDATION, adminPlaceFormSchema } from '@/schemas/adminPlace'
import { createEmptyPlaceForm, placeToFormValues } from '@/modules/admin/utils/catalogForm'

function fieldErrorsFromZod(error) {
  const next = {}
  error.issues.forEach((issue) => {
    const key = issue.path[0]
    if (typeof key === 'string' && !next[key]) next[key] = issue.message
  })
  return next
}

export function useAdminPlaceForm({ place, defaultTierId, onSubmit }) {
  const [values, setValues] = useState(() =>
    place ? placeToFormValues(place) : createEmptyPlaceForm(defaultTierId),
  )
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mediaFile, setMediaFile] = useState(null)
  const [removeMedia, setRemoveMedia] = useState(false)

  useEffect(() => {
    setValues(place ? placeToFormValues(place) : createEmptyPlaceForm(defaultTierId))
    setErrors({})
    setMediaFile(null)
    setRemoveMedia(false)
  }, [place, defaultTierId])

  const setField = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
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

    const parsed = adminPlaceFormSchema.safeParse(values)
    if (!parsed.success) {
      setErrors(fieldErrorsFromZod(parsed.error))
      return
    }

    const hasExistingMedia = Boolean(place?.mediaUrl) && !removeMedia
    const hasMedia = Boolean(mediaFile) || hasExistingMedia
    const hasImageUrl = Boolean(parsed.data.imageUrl)
    if (!hasMedia && !hasImageUrl) {
      setErrors((current) => ({
        ...current,
        media: ADMIN_PLACE_VALIDATION.mediaRequired,
      }))
      return
    }

    setIsSubmitting(true)
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
    onSelectMediaFile,
    onClearMediaSelection,
    onRemoveExistingMedia,
    handleSubmit,
  }
}
