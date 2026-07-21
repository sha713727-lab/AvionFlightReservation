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

export default function AdminPlaceFormFields({
  values,
  errors,
  tiers,
  disabled,
  place,
  mediaFile,
  removeMedia,
  setField,
  onSelectMediaFile,
  onClearMediaSelection,
  onRemoveExistingMedia,
}) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="place-name" className="mb-2 block text-sm font-medium text-primary">
          {ADMIN_COPY.fieldPlaceName}
        </label>
        <input
          id="place-name"
          value={values.name}
          disabled={disabled}
          placeholder={ADMIN_COPY.fieldPlaceNamePlaceholder}
          className={inputClassName}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'place-name-error' : undefined}
          onChange={(event) => setField('name', event.target.value)}
        />
        <FieldError id="place-name-error" message={errors.name} />
      </div>

      <div>
        <label htmlFor="place-tier" className="mb-2 block text-sm font-medium text-primary">
          {ADMIN_COPY.fieldPlaceTier}
        </label>
        <select
          id="place-tier"
          value={values.tierId}
          disabled={disabled}
          className={inputClassName}
          aria-invalid={Boolean(errors.tierId)}
          aria-describedby={errors.tierId ? 'place-tier-error' : undefined}
          onChange={(event) => setField('tierId', event.target.value)}
        >
          <option value="">{ADMIN_COPY.fieldPlaceTierPlaceholder}</option>
          {tiers.map((tier) => (
            <option key={tier.id} value={tier.id}>
              {tier.title}
              {!tier.isActive ? ` (${ADMIN_COPY.placesInactive})` : ''}
            </option>
          ))}
        </select>
        <FieldError id="place-tier-error" message={errors.tierId} />
      </div>

      <div>
        <label htmlFor="place-alt" className="mb-2 block text-sm font-medium text-primary">
          {ADMIN_COPY.fieldPlaceAlt}
        </label>
        <input
          id="place-alt"
          value={values.alt}
          disabled={disabled}
          placeholder={ADMIN_COPY.fieldPlaceAltPlaceholder}
          className={inputClassName}
          aria-invalid={Boolean(errors.alt)}
          aria-describedby={errors.alt ? 'place-alt-error' : undefined}
          onChange={(event) => setField('alt', event.target.value)}
        />
        <FieldError id="place-alt-error" message={errors.alt} />
      </div>

      <AdminServiceMediaField
        existingMediaUrl={place?.mediaUrl}
        existingMediaType={place?.mediaType}
        mediaFile={mediaFile}
        removeMedia={removeMedia}
        disabled={disabled}
        label={ADMIN_COPY.fieldPlaceMedia}
        hint={ADMIN_COPY.fieldPlaceMediaHint}
        onSelectFile={onSelectMediaFile}
        onClearSelection={onClearMediaSelection}
        onRemoveExisting={onRemoveExistingMedia}
      />
      <FieldError id="place-media-error" message={errors.media} />

      <div>
        <label htmlFor="place-image-url" className="mb-2 block text-sm font-medium text-primary">
          {ADMIN_COPY.fieldPlaceImageUrl}
        </label>
        <input
          id="place-image-url"
          type="url"
          value={values.imageUrl}
          disabled={disabled}
          placeholder={ADMIN_COPY.fieldPlaceImageUrlPlaceholder}
          className={inputClassName}
          aria-invalid={Boolean(errors.imageUrl)}
          aria-describedby={
            errors.imageUrl ? 'place-image-url-error' : 'place-image-url-hint'
          }
          onChange={(event) => setField('imageUrl', event.target.value)}
        />
        <p id="place-image-url-hint" className="mt-1.5 text-xs text-text-muted">
          {ADMIN_COPY.fieldPlaceImageUrlHint}
        </p>
        <FieldError id="place-image-url-error" message={errors.imageUrl} />
      </div>

      <label className="flex items-center gap-3 text-sm text-primary">
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
