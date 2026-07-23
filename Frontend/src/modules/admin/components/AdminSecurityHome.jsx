'use client'

import Button from '@/components/buttons/Button'
import { ADMIN_COPY } from '@/modules/admin/constants'
import { useAdminPinChange } from '@/modules/admin/hooks/useAdminPinChange'
import { cn } from '@/utils/cn'

const inputClassName = cn(
  'w-full rounded-xl border border-border bg-section px-4 py-3 text-sm tracking-[0.2em] text-text',
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

function PinField({ id, label, value, error, disabled, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-primary">
        {label}
      </label>
      <input
        id={id}
        type="password"
        inputMode="numeric"
        autoComplete="off"
        maxLength={8}
        value={value}
        disabled={disabled}
        placeholder={ADMIN_COPY.pinPlaceholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClassName}
        onChange={(event) => onChange(event.target.value)}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  )
}

export default function AdminSecurityHome({ token }) {
  const { values, errors, formError, successMessage, isSaving, setField, save } =
    useAdminPinChange(token)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-lg font-semibold tracking-tight text-primary">
          {ADMIN_COPY.securityTitle}
        </h2>
        <p className="mt-1 text-sm text-text-secondary">{ADMIN_COPY.securityDescription}</p>
        <p className="mt-2 text-sm text-text-muted">{ADMIN_COPY.securityLoadHint}</p>
      </div>

      {formError ? (
        <p className="rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-sm text-error" role="alert">
          {formError}
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
        className="max-w-md space-y-5 rounded-2xl border border-border bg-section p-5 shadow-sm shadow-primary/5"
        onSubmit={save}
        noValidate
      >
        <PinField
          id="security-current-pin"
          label={ADMIN_COPY.securityCurrentPinLabel}
          value={values.currentPin}
          error={errors.currentPin}
          disabled={isSaving}
          onChange={(value) => setField('currentPin', value)}
        />
        <PinField
          id="security-new-pin"
          label={ADMIN_COPY.securityNewPinLabel}
          value={values.newPin}
          error={errors.newPin}
          disabled={isSaving}
          onChange={(value) => setField('newPin', value)}
        />
        <PinField
          id="security-confirm-pin"
          label={ADMIN_COPY.securityConfirmPinLabel}
          value={values.confirmPin}
          error={errors.confirmPin}
          disabled={isSaving}
          onChange={(value) => setField('confirmPin', value)}
        />
        <Button type="submit" variant="primary" size="lg" disabled={isSaving}>
          {isSaving ? ADMIN_COPY.securitySavingCta : ADMIN_COPY.securitySaveCta}
        </Button>
      </form>
    </div>
  )
}
