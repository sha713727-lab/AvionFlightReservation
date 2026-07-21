'use client'

import { ADMIN_COPY } from '@/modules/admin/constants'
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

export default function AdminDestinationFormFields({
  values,
  errors,
  disabled,
  setField,
  setSlug,
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="destination-title" className="mb-2 block text-sm font-medium text-primary">
            {ADMIN_COPY.fieldTitle}
          </label>
          <input
            id="destination-title"
            value={values.title}
            disabled={disabled}
            placeholder={ADMIN_COPY.fieldDestinationTitlePlaceholder}
            className={inputClassName}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'destination-title-error' : undefined}
            onChange={(event) => setField('title', event.target.value)}
          />
          <FieldError id="destination-title-error" message={errors.title} />
        </div>
        <div>
          <label htmlFor="destination-slug" className="mb-2 block text-sm font-medium text-primary">
            {ADMIN_COPY.fieldSlug}
          </label>
          <input
            id="destination-slug"
            value={values.slug}
            disabled={disabled}
            placeholder={ADMIN_COPY.fieldDestinationSlugPlaceholder}
            className={inputClassName}
            aria-invalid={Boolean(errors.slug)}
            aria-describedby={errors.slug ? 'destination-slug-error' : undefined}
            onChange={(event) => setSlug(event.target.value)}
          />
          <FieldError id="destination-slug-error" message={errors.slug} />
        </div>
      </div>

      <div>
        <label htmlFor="destination-points" className="mb-2 block text-sm font-medium text-primary">
          {ADMIN_COPY.fieldPoints}
        </label>
        <input
          id="destination-points"
          type="number"
          min={0}
          max={10_000_000}
          step={1}
          value={values.points}
          disabled={disabled}
          placeholder={ADMIN_COPY.fieldPointsPlaceholder}
          className={inputClassName}
          aria-invalid={Boolean(errors.points)}
          aria-describedby={errors.points ? 'destination-points-error' : undefined}
          onChange={(event) => setField('points', event.target.value)}
        />
        <FieldError id="destination-points-error" message={errors.points} />
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
