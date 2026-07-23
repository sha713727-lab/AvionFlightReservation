'use client'

import { useState } from 'react'
import Button from '@/components/buttons/Button'
import {
  ADMIN_COPY,
  ADMIN_FIELD_NAMES,
} from '@/modules/admin/constants'
import AdminPasswordField from '@/modules/admin/components/AdminPasswordField'
import AdminPinModal from '@/modules/admin/components/AdminPinModal'
import { useAdminLoginForm } from '@/modules/admin/hooks/useAdminLoginForm'
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

export default function AdminLoginForm() {
  const {
    values,
    errors,
    formError,
    isSubmitting,
    isSuccess,
    setField,
    handleSubmit,
    pinChallenge,
  } = useAdminLoginForm()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const isLocked = isSubmitting || isSuccess || pinChallenge.isOpen

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-primary">
            {ADMIN_COPY.emailLabel}
          </label>
          <input
            id="admin-email"
            name={ADMIN_FIELD_NAMES.email}
            type="email"
            autoComplete="username"
            inputMode="email"
            value={values.email}
            disabled={isLocked}
            placeholder={ADMIN_COPY.emailPlaceholder}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'admin-email-error' : undefined}
            className={inputClassName}
            onChange={(event) => setField(ADMIN_FIELD_NAMES.email, event.target.value)}
          />
          <FieldError id="admin-email-error" message={errors.email} />
        </div>

        <div>
          <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-primary">
            {ADMIN_COPY.passwordLabel}
          </label>
          <AdminPasswordField
            id="admin-password"
            name={ADMIN_FIELD_NAMES.password}
            value={values.password}
            disabled={isLocked}
            placeholder={ADMIN_COPY.passwordPlaceholder}
            invalid={Boolean(errors.password)}
            describedBy={errors.password ? 'admin-password-error' : undefined}
            visible={isPasswordVisible}
            onVisibleChange={setIsPasswordVisible}
            onChange={(event) => setField(ADMIN_FIELD_NAMES.password, event.target.value)}
          />
          <FieldError id="admin-password-error" message={errors.password} />
        </div>

        {formError ? (
          <p className="rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-sm text-error" role="alert">
            {formError}
          </p>
        ) : null}

        {isSuccess ? (
          <p className="rounded-xl border border-success/20 bg-success/5 px-4 py-3 text-sm text-success" role="status">
            {ADMIN_COPY.successMessage}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isLocked}
        >
          {isLocked ? ADMIN_COPY.submittingCta : ADMIN_COPY.submitCta}
        </Button>
      </form>

      <AdminPinModal
        isOpen={pinChallenge.isOpen}
        pin={pinChallenge.pin}
        setPin={pinChallenge.setPin}
        error={pinChallenge.error}
        isVerifying={pinChallenge.isVerifying}
        onVerify={pinChallenge.onVerify}
        onClose={pinChallenge.onClose}
      />
    </>
  )
}
