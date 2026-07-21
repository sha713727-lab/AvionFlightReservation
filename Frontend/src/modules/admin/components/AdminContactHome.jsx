'use client'

import Button from '@/components/buttons/Button'
import NorthAmericanPhoneInput from '@/components/forms/NorthAmericanPhoneInput'
import { ADMIN_COPY } from '@/modules/admin/constants'
import { useAdminContactSettings } from '@/modules/admin/hooks/useAdminContactSettings'
import { cn } from '@/utils/cn'

const inputClassName = cn(
  'w-full rounded-xl border border-border bg-section px-4 py-3 text-sm text-text',
  'placeholder:text-text-muted transition-colors',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  'disabled:cursor-not-allowed disabled:opacity-60',
)

export default function AdminContactHome({ token }) {
  const {
    email,
    setEmail,
    phones,
    setPhoneValue,
    addPhone,
    removePhone,
    canAddPhone,
    canRemovePhone,
    fieldErrors,
    isLoading,
    isSaving,
    error,
    successMessage,
    loaded,
    save,
    loadingLabel,
  } = useAdminContactSettings(token)

  if (isLoading) {
    return (
      <p className="text-sm text-text-secondary" role="status">
        {loadingLabel}
      </p>
    )
  }

  if (error && !loaded) {
    return (
      <p className="rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-sm text-error" role="alert">
        {error || ADMIN_COPY.settingsLoadError}
      </p>
    )
  }

  return (
    <div className="space-y-6">
      {error ? (
        <p className="rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}

      {successMessage ? (
        <p
          className="rounded-xl border border-success/20 bg-success/5 px-4 py-3 text-sm text-success"
          role="status"
        >
          {successMessage}
        </p>
      ) : null}

      <form
        className="max-w-xl space-y-6 rounded-2xl border border-border bg-section p-5 shadow-sm shadow-primary/5"
        onSubmit={save}
        noValidate
      >
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-primary">
            {ADMIN_COPY.settingsEmailLabel}
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={email}
            disabled={isSaving}
            placeholder={ADMIN_COPY.settingsEmailPlaceholder}
            className={inputClassName}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? 'contact-email-error' : 'contact-email-hint'}
            onChange={(event) => setEmail(event.target.value)}
          />
          <p id="contact-email-hint" className="mt-1.5 text-xs text-text-muted">
            {ADMIN_COPY.settingsEmailHint}
          </p>
          {fieldErrors.email ? (
            <p id="contact-email-error" className="mt-1.5 text-sm text-error" role="alert">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-primary">{ADMIN_COPY.settingsPhonesLabel}</p>
              <p className="mt-1 text-xs text-text-muted">{ADMIN_COPY.settingsPhonesHint}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-xl shrink-0"
              disabled={isSaving || !canAddPhone}
              onClick={addPhone}
            >
              {ADMIN_COPY.settingsAddPhoneCta}
            </Button>
          </div>

          {fieldErrors.phones ? (
            <p className="text-sm text-error" role="alert">
              {fieldErrors.phones}
            </p>
          ) : null}

          <ul className="space-y-3">
            {phones.map((phone, index) => {
              const errorKey = `phone-${index}`
              const errorId = `contact-phone-${index}-error`
              return (
                <li key={`phone-${index}`} className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <label htmlFor={`contact-phone-${index}`} className="sr-only">
                      {ADMIN_COPY.settingsPhoneLabel} {index + 1}
                    </label>
                    <NorthAmericanPhoneInput
                      id={`contact-phone-${index}`}
                      value={phone}
                      disabled={isSaving}
                      placeholder={ADMIN_COPY.settingsPhonePlaceholder}
                      aria-invalid={Boolean(fieldErrors[errorKey])}
                      aria-describedby={fieldErrors[errorKey] ? errorId : undefined}
                      className={inputClassName}
                      onChange={(nextPhone) => setPhoneValue(index, nextPhone)}
                    />
                    {fieldErrors[errorKey] ? (
                      <p id={errorId} className="mt-1.5 text-sm text-error" role="alert">
                        {fieldErrors[errorKey]}
                      </p>
                    ) : null}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-xl shrink-0 text-error hover:border-error hover:text-error"
                    disabled={isSaving || !canRemovePhone}
                    onClick={() => removePhone(index)}
                  >
                    {ADMIN_COPY.settingsRemovePhoneCta}
                  </Button>
                </li>
              )
            })}
          </ul>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="rounded-xl"
          disabled={isSaving}
        >
          {isSaving ? ADMIN_COPY.settingsSavingCta : ADMIN_COPY.settingsSaveCta}
        </Button>
      </form>
    </div>
  )
}
