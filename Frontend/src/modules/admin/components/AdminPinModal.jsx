'use client'

import Button from '@/components/buttons/Button'
import Modal from '@/components/ui/Modal'
import { ADMIN_COPY } from '@/modules/admin/constants'
import { cn } from '@/utils/cn'

const inputClassName = cn(
  'w-full rounded-xl border border-border bg-section px-4 py-3 text-center text-lg tracking-[0.35em] text-text',
  'placeholder:text-text-muted placeholder:tracking-[0.35em] transition-colors',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  'disabled:cursor-not-allowed disabled:opacity-60',
)

export default function AdminPinModal({
  isOpen,
  pin,
  setPin,
  error,
  isVerifying,
  onVerify,
  onClose,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={ADMIN_COPY.pinTitle} closeOnBackdrop={!isVerifying}>
      <form className="space-y-5" onSubmit={onVerify} noValidate>
        <p className="text-sm leading-relaxed text-text-secondary">{ADMIN_COPY.pinDescription}</p>

        <div>
          <label htmlFor="admin-pin" className="mb-2 block text-sm font-medium text-primary">
            {ADMIN_COPY.pinLabel}
          </label>
          <input
            id="admin-pin"
            name="pin"
            type="password"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={8}
            value={pin}
            disabled={isVerifying}
            placeholder={ADMIN_COPY.pinPlaceholder}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'admin-pin-error' : undefined}
            className={inputClassName}
            onChange={(event) => setPin(event.target.value)}
          />
          {error ? (
            <p id="admin-pin-error" className="mt-1.5 text-sm text-error" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isVerifying}>
          {isVerifying ? ADMIN_COPY.pinSubmittingCta : ADMIN_COPY.pinSubmitCta}
        </Button>
      </form>
    </Modal>
  )
}
