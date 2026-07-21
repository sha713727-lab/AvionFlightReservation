'use client'

import Button from '@/components/buttons/Button'
import Modal from '@/components/ui/Modal'
import { ADMIN_COPY } from '@/modules/admin/constants'
import AdminFaqFormFields from '@/modules/admin/components/AdminFaqFormFields'
import { useAdminFaqForm } from '@/modules/admin/hooks/useAdminFaqForm'

export default function AdminFaqFormModal({ isOpen, faq, onClose, onSubmit }) {
  const { values, errors, isSubmitting, setField, setSlug, handleSubmit } = useAdminFaqForm({
    faq,
    onSubmit: async (payload) => {
      await onSubmit(payload)
      onClose()
    },
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={isSubmitting ? () => {} : onClose}
      title={faq ? ADMIN_COPY.faqsEditTitle : ADMIN_COPY.faqsCreateTitle}
      className="max-h-[90vh] max-w-xl overflow-y-auto"
      closeOnBackdrop={!isSubmitting}
    >
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <AdminFaqFormFields
          values={values}
          errors={errors}
          disabled={isSubmitting}
          setField={setField}
          setSlug={setSlug}
        />
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            size="md"
            className="rounded-xl"
            disabled={isSubmitting}
            onClick={onClose}
          >
            {ADMIN_COPY.faqsCancelCta}
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="rounded-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? ADMIN_COPY.faqsSavingCta : ADMIN_COPY.faqsSaveCta}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
