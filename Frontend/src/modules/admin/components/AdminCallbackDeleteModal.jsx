'use client'

import Button from '@/components/buttons/Button'
import Modal from '@/components/ui/Modal'
import { ADMIN_COPY } from '@/modules/admin/constants'

export default function AdminCallbackDeleteModal({
  item,
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}) {
  if (!item) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={isDeleting ? () => {} : onClose}
      title={ADMIN_COPY.callbacksDeleteTitle}
      closeOnBackdrop={!isDeleting}
    >
      <p className="text-sm text-text-secondary">{ADMIN_COPY.callbacksDeleteBody}</p>
      <p className="mt-3 rounded-xl bg-section-alt px-3 py-2 text-sm font-medium text-primary">
        {item.name} · {item.phone}
      </p>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          size="md"
          className="rounded-xl"
          disabled={isDeleting}
          onClick={onClose}
        >
          {ADMIN_COPY.callbacksCancelCta}
        </Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          className="rounded-xl bg-error hover:bg-error"
          disabled={isDeleting}
          onClick={onConfirm}
        >
          {isDeleting ? ADMIN_COPY.callbacksDeletingCta : ADMIN_COPY.callbacksDeleteConfirm}
        </Button>
      </div>
    </Modal>
  )
}
