'use client'

import Button from '@/components/buttons/Button'
import Modal from '@/components/ui/Modal'
import { ADMIN_COPY } from '@/modules/admin/constants'

export default function AdminInquiryDeleteModal({
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
      title={ADMIN_COPY.inquiriesDeleteTitle}
      closeOnBackdrop={!isDeleting}
    >
      <p className="text-sm text-text-secondary">{ADMIN_COPY.inquiriesDeleteBody}</p>
      <p className="mt-3 rounded-xl bg-section-alt px-3 py-2 text-sm font-medium text-primary">
        {item.referenceCode} · {item.name} · {item.email}
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
          {ADMIN_COPY.inquiriesCancelCta}
        </Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          className="rounded-xl bg-error hover:bg-error"
          disabled={isDeleting}
          onClick={onConfirm}
        >
          {isDeleting ? ADMIN_COPY.inquiriesDeletingCta : ADMIN_COPY.inquiriesDeleteConfirm}
        </Button>
      </div>
    </Modal>
  )
}
