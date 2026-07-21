'use client'

import { ADMIN_COPY } from '@/modules/admin/constants'
import AdminServiceMediaField from '@/modules/admin/components/AdminServiceMediaField'
import { cn } from '@/utils/cn'

const inputClassName = cn(
  'w-full rounded-xl border border-border bg-section px-4 py-3 text-sm text-text',
  'placeholder:text-text-muted transition-colors',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  'disabled:cursor-not-allowed disabled:opacity-60',
)

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 text-sm text-error" role="alert">
      {message}
    </p>
  )
}

export default function AdminServiceFormFields({
  values,
  errors,
  options,
  disabled,
  service,
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
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="service-title" className="mb-2 block text-sm font-medium text-primary">
            {ADMIN_COPY.fieldTitle}
          </label>
          <input
            id="service-title"
            value={values.title}
            disabled={disabled}
            placeholder={ADMIN_COPY.fieldTitlePlaceholder}
            className={inputClassName}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'service-title-error' : undefined}
            onChange={(event) => setField('title', event.target.value)}
          />
          <FieldError id="service-title-error" message={errors.title} />
        </div>
        <div>
          <label htmlFor="service-slug" className="mb-2 block text-sm font-medium text-primary">
            {ADMIN_COPY.fieldSlug}
          </label>
          <input
            id="service-slug"
            value={values.slug}
            disabled={disabled}
            placeholder={ADMIN_COPY.fieldSlugPlaceholder}
            className={inputClassName}
            aria-invalid={Boolean(errors.slug)}
            aria-describedby={errors.slug ? 'service-slug-error' : undefined}
            onChange={(event) => setSlug(event.target.value)}
          />
          <FieldError id="service-slug-error" message={errors.slug} />
        </div>
      </div>

      <div>
        <label htmlFor="service-tagline" className="mb-2 block text-sm font-medium text-primary">
          {ADMIN_COPY.fieldTagline}
        </label>
        <input
          id="service-tagline"
          value={values.tagline}
          disabled={disabled}
          placeholder={ADMIN_COPY.fieldTaglinePlaceholder}
          className={inputClassName}
          aria-invalid={Boolean(errors.tagline)}
          onChange={(event) => setField('tagline', event.target.value)}
        />
        <FieldError message={errors.tagline} />
      </div>

      <div>
        <label htmlFor="service-description" className="mb-2 block text-sm font-medium text-primary">
          {ADMIN_COPY.fieldDescription}
        </label>
        <textarea
          id="service-description"
          rows={4}
          value={values.description}
          disabled={disabled}
          placeholder={ADMIN_COPY.fieldDescriptionPlaceholder}
          className={inputClassName}
          aria-invalid={Boolean(errors.description)}
          onChange={(event) => setField('description', event.target.value)}
        />
        <FieldError message={errors.description} />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-primary">{ADMIN_COPY.fieldFeatures}</p>
        <div className="space-y-2">
          {values.features.map((feature, index) => (
            <div key={`feature-${index}`} className="flex gap-2">
              <input
                value={feature}
                disabled={disabled}
                placeholder={ADMIN_COPY.fieldFeaturePlaceholder}
                className={inputClassName}
                onChange={(event) => setFeature(index, event.target.value)}
              />
              <button
                type="button"
                disabled={disabled || values.features.length <= 1}
                className="shrink-0 rounded-xl border border-border px-3 text-sm text-text-secondary hover:text-error disabled:opacity-40"
                onClick={() => removeFeature(index)}
              >
                {ADMIN_COPY.fieldRemoveFeature}
              </button>
            </div>
          ))}
        </div>
        <FieldError message={errors.features} />
        <button
          type="button"
          disabled={disabled || values.features.length >= 12}
          className="mt-2 text-sm font-medium text-accent hover:underline disabled:opacity-40"
          onClick={addFeature}
        >
          {ADMIN_COPY.fieldAddFeature}
        </button>
      </div>

      <AdminServiceMediaField
        existingMediaUrl={service?.mediaUrl}
        existingMediaType={service?.mediaType}
        mediaFile={mediaFile}
        removeMedia={removeMedia}
        disabled={disabled}
        onSelectFile={onSelectMediaFile}
        onClearSelection={onClearMediaSelection}
        onRemoveExisting={onRemoveExistingMedia}
      />
      <FieldError message={errors.media} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="service-icon" className="mb-2 block text-sm font-medium text-primary">
            {ADMIN_COPY.fieldIcon}
          </label>
          <select
            id="service-icon"
            value={values.iconKey}
            disabled={disabled}
            className={inputClassName}
            onChange={(event) => setField('iconKey', event.target.value)}
          >
            {options.iconKeys.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <FieldError message={errors.iconKey} />
        </div>
        <div>
          <label htmlFor="service-image" className="mb-2 block text-sm font-medium text-primary">
            {ADMIN_COPY.fieldImage}
          </label>
          <select
            id="service-image"
            value={values.imageKey}
            disabled={disabled}
            className={inputClassName}
            onChange={(event) => setField('imageKey', event.target.value)}
          >
            {options.imageKeys.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-text-muted">{ADMIN_COPY.fieldImageHint}</p>
          <FieldError message={errors.imageKey} />
        </div>
      </div>

      <div>
        <label htmlFor="service-image-alt" className="mb-2 block text-sm font-medium text-primary">
          {ADMIN_COPY.fieldImageAlt}
        </label>
        <input
          id="service-image-alt"
          value={values.imageAlt}
          disabled={disabled}
          placeholder={ADMIN_COPY.fieldImageAltPlaceholder}
          className={inputClassName}
          onChange={(event) => setField('imageAlt', event.target.value)}
        />
        <FieldError message={errors.imageAlt} />
      </div>

      <label className="inline-flex items-center gap-3 text-sm font-medium text-primary">
        <input
          type="checkbox"
          checked={values.isActive}
          disabled={disabled}
          className="h-4 w-4 rounded border-border text-accent focus-visible:outline-accent"
          onChange={(event) => setField('isActive', event.target.checked)}
        />
        {ADMIN_COPY.fieldActive}
      </label>
    </div>
  )
}
