'use client'

import Button from '@/components/buttons/Button'
import { COPY } from '@/constants/copy'
import { CALLBACK_FIELD_NAMES } from '@/modules/callback/constants'
import { useCallbackRequestForm } from '@/modules/callback/hooks/useCallbackRequestForm'
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

export default function CallbackRequestForm({ onSuccess }) {
  const { values, errors, isSubmitting, setField, handleSubmit } = useCallbackRequestForm({
    onSuccess,
  })

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <p className="text-sm leading-relaxed text-text-secondary">
        {COPY.callbackModal.formDescription}
      </p>

      <div>
        <label
          htmlFor="callback-name"
          className="mb-2 block text-sm font-medium text-primary"
        >
          {COPY.callbackModal.nameLabel}
        </label>
        <input
          id="callback-name"
          name={CALLBACK_FIELD_NAMES.name}
          type="text"
          autoComplete="name"
          value={values.name}
          disabled={isSubmitting}
          placeholder={COPY.callbackModal.namePlaceholder}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'callback-name-error' : undefined}
          className={inputClassName}
          onChange={(event) => setField(CALLBACK_FIELD_NAMES.name, event.target.value)}
        />
        <FieldError id="callback-name-error" message={errors.name} />
      </div>

      <div>
        <label
          htmlFor="callback-phone"
          className="mb-2 block text-sm font-medium text-primary"
        >
          {COPY.callbackModal.phoneLabel}
        </label>
        <input
          id="callback-phone"
          name={CALLBACK_FIELD_NAMES.phone}
          type="tel"
          autoComplete="tel"
          value={values.phone}
          disabled={isSubmitting}
          placeholder={COPY.callbackModal.phonePlaceholder}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'callback-phone-error' : undefined}
          className={inputClassName}
          onChange={(event) => setField(CALLBACK_FIELD_NAMES.phone, event.target.value)}
        />
        <FieldError id="callback-phone-error" message={errors.phone} />
      </div>

      <div>
        <label
          htmlFor="callback-datetime"
          className="mb-2 block text-sm font-medium text-primary"
        >
          {COPY.callbackModal.datetimeLabel}
        </label>
        <input
          id="callback-datetime"
          name={CALLBACK_FIELD_NAMES.preferredAt}
          type="datetime-local"
          value={values.preferredAt}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.preferredAt)}
          aria-describedby={errors.preferredAt ? 'callback-datetime-error' : undefined}
          className={inputClassName}
          onChange={(event) => setField(CALLBACK_FIELD_NAMES.preferredAt, event.target.value)}
        />
        <FieldError id="callback-datetime-error" message={errors.preferredAt} />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? COPY.callbackModal.submittingCta : COPY.callbackModal.submitCta}
      </Button>
    </form>
  )
}
