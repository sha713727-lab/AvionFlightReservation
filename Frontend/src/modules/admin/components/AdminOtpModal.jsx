'use client'

import { useCallback } from 'react'
import Button from '@/components/buttons/Button'
import Modal from '@/components/ui/Modal'
import { ADMIN_COPY } from '@/modules/admin/constants'
import { cn } from '@/utils/cn'

const inputClassName = cn(
  'w-full rounded-xl border border-border bg-section px-4 py-3 text-center text-lg font-semibold tracking-[0.35em] text-text',
  'placeholder:text-text-muted placeholder:tracking-[0.35em] transition-colors',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  'disabled:cursor-not-allowed disabled:opacity-60',
)

export default function AdminOtpModal({
  isOpen,
  code,
  setCode,
  error,
  destinationHint,
  isVerifying,
  isResending,
  resendSeconds,
  onVerify,
  onResend,
  onClose,
}) {
  const isBusy = isVerifying || isResending

  const handleClose = useCallback(() => {
    if (isBusy) return
    onClose()
  }, [isBusy, onClose])

  const handleCodeChange = useCallback(
    (event) => {
      setCode(event.target.value)
    },
    [setCode],
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={ADMIN_COPY.otpTitle}
      closeOnBackdrop={!isBusy}
      className="max-w-md"
    >
      <form className="space-y-5" onSubmit={onVerify} noValidate>
        <p className="text-sm leading-relaxed text-text-secondary">
          {ADMIN_COPY.otpDescription}{' '}
          <span className="font-medium text-primary">{destinationHint}</span>.
        </p>

        <div>
          <label htmlFor="admin-otp-code" className="mb-2 block text-sm font-medium text-primary">
            {ADMIN_COPY.otpLabel}
          </label>
          <input
            id="admin-otp-code"
            name="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            enterKeyHint="done"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            maxLength={6}
            value={code}
            disabled={isBusy}
            placeholder={ADMIN_COPY.otpPlaceholder}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'admin-otp-error' : undefined}
            className={inputClassName}
            onChange={handleCodeChange}
          />
          {error ? (
            <p id="admin-otp-error" className="mt-1.5 text-sm text-error" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isBusy || code.length !== 6}
        >
          {isVerifying ? ADMIN_COPY.otpSubmittingCta : ADMIN_COPY.otpSubmitCta}
        </Button>

        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-text-muted">{ADMIN_COPY.otpSentMessage}</p>
          <button
            type="button"
            disabled={isBusy || resendSeconds > 0}
            onClick={onResend}
            className={cn(
              'text-sm font-medium text-accent transition-colors',
              'hover:text-accent-hover disabled:cursor-not-allowed disabled:text-text-muted',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
            )}
          >
            {isResending
              ? ADMIN_COPY.otpResendingCta
              : resendSeconds > 0
                ? `${ADMIN_COPY.otpResendWait} ${resendSeconds}s`
                : ADMIN_COPY.otpResendCta}
          </button>
        </div>
      </form>
    </Modal>
  )
}
