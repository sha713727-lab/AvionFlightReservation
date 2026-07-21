'use client'

import Button from '@/components/buttons/Button'
import Modal from '@/components/ui/Modal'
import { ADMIN_COPY } from '@/modules/admin/constants'
import AdminDestinationFormFields from '@/modules/admin/components/AdminDestinationFormFields'
import { useAdminDestinationForm } from '@/modules/admin/hooks/useAdminDestinationForm'

export default function AdminDestinationFormModal({
  isOpen,
  destination,
  onClose,
  onSubmit,
}) {
  const { values, errors, isSubmitting, setField, setSlug, handleSubmit } =
    useAdminDestinationForm({
      destination,
      onSubmit: async (payload) => {
        await onSubmit(payload)
        onClose()
      },
    })

  return (
    <Modal
      isOpen={isOpen}
      onClose={isSubmitting ? () => {} : onClose}
      title={
        destination ? ADMIN_COPY.destinationsEditTitle : ADMIN_COPY.destinationsCreateTitle
      }
      className="max-h-[90vh] max-w-xl overflow-y-auto"
      closeOnBackdrop={!isSubmitting}
    >
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <AdminDestinationFormFields
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
            {ADMIN_COPY.destinationsCancelCta}
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="rounded-xl"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? ADMIN_COPY.destinationsSavingCta
              : ADMIN_COPY.destinationsSaveCta}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
