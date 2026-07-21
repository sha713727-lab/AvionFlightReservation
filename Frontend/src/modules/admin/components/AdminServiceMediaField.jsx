'use client'

import { useEffect, useId, useMemo, useState } from 'react'
import { ADMIN_COPY } from '@/modules/admin/constants'
import { cn } from '@/utils/cn'

const ACCEPTED =
  'image/jpeg,image/png,image/webp,video/mp4,video/webm'

function isAllowedFile(file) {
  return ACCEPTED.split(',').includes(file.type)
}

export default function AdminServiceMediaField({
  existingMediaUrl,
  existingMediaType,
  mediaFile,
  removeMedia,
  disabled,
  onSelectFile,
  onClearSelection,
  onRemoveExisting,
  label = ADMIN_COPY.fieldMedia,
  hint = ADMIN_COPY.fieldMediaHint,
}) {
  const inputId = useId()
  const [localPreviewUrl, setLocalPreviewUrl] = useState('')

  useEffect(() => {
    if (!mediaFile) {
      setLocalPreviewUrl('')
      return undefined
    }
    const url = URL.createObjectURL(mediaFile)
    setLocalPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [mediaFile])

  const previewUrl = useMemo(() => {
    if (removeMedia) return ''
    if (localPreviewUrl) return localPreviewUrl
    return existingMediaUrl || ''
  }, [removeMedia, localPreviewUrl, existingMediaUrl])

  const previewType = useMemo(() => {
    if (removeMedia) return null
    if (mediaFile) {
      return mediaFile.type.startsWith('video/') ? 'video' : 'image'
    }
    return existingMediaType
  }, [removeMedia, mediaFile, existingMediaType])

  const handleChange = (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!isAllowedFile(file)) {
      onSelectFile(null, ADMIN_COPY.fieldMediaInvalid)
      return
    }
    onSelectFile(file, '')
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-medium text-primary">{label}</p>
        <p className="mt-1 text-xs text-text-muted">{hint}</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-section-alt">
        {previewUrl && previewType === 'video' ? (
          <video
            key={previewUrl}
            src={previewUrl}
            controls
            playsInline
            preload="metadata"
            className="aspect-[16/11] w-full object-cover"
          />
        ) : null}
        {previewUrl && previewType === 'image' ? (
          <img
            src={previewUrl}
            alt=""
            className="aspect-[16/11] w-full object-cover"
          />
        ) : null}
        {!previewUrl ? (
          <div className="flex aspect-[16/11] items-center justify-center px-4 text-center text-sm text-text-secondary">
            {ADMIN_COPY.fieldMediaEmpty}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <label
          htmlFor={inputId}
          className={cn(
            'inline-flex cursor-pointer items-center justify-center rounded-xl border border-border bg-section px-3 py-2 text-sm font-medium text-primary',
            'hover:border-accent hover:text-accent',
            'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent',
            disabled && 'pointer-events-none opacity-40',
          )}
        >
          {previewUrl ? ADMIN_COPY.fieldMediaReplace : ADMIN_COPY.fieldMediaChoose}
          <input
            id={inputId}
            type="file"
            accept={ACCEPTED}
            disabled={disabled}
            className="sr-only"
            onChange={handleChange}
          />
        </label>

        {mediaFile ? (
          <button
            type="button"
            disabled={disabled}
            className="rounded-xl border border-border px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary disabled:opacity-40"
            onClick={onClearSelection}
          >
            {ADMIN_COPY.servicesCancelCta}
          </button>
        ) : null}

        {(existingMediaUrl || mediaFile) && !removeMedia ? (
          <button
            type="button"
            disabled={disabled}
            className="rounded-xl border border-border px-3 py-2 text-sm font-medium text-error hover:border-error disabled:opacity-40"
            onClick={onRemoveExisting}
          >
            {ADMIN_COPY.fieldMediaRemove}
          </button>
        ) : null}
      </div>
    </div>
  )
}
