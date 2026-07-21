'use client'

import Button from '@/components/buttons/Button'
import Modal from '@/components/ui/Modal'
import { ADMIN_COPY } from '@/modules/admin/constants'
import AdminPlaceFormFields from '@/modules/admin/components/AdminPlaceFormFields'
import { useAdminPlaceForm } from '@/modules/admin/hooks/useAdminPlaceForm'

export default function AdminPlaceFormModal({
  isOpen,
  place,
  tiers,
  defaultTierId,
  onClose,
  onSubmit,
}) {
  const {
    values,
    errors,
    isSubmitting,
    mediaFile,
    removeMedia,
    setField,
    onSelectMediaFile,
    onClearMediaSelection,
    onRemoveExistingMedia,
    handleSubmit,
  } = useAdminPlaceForm({
    place,
    defaultTierId,
    onSubmit: async (payload, mediaOptions) => {
      await onSubmit(payload, mediaOptions)
      onClose()
    },
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={isSubmitting ? () => {} : onClose}
      title={place ? ADMIN_COPY.placesEditTitle : ADMIN_COPY.placesCreateTitle}
      className="max-h-[90vh] max-w-xl overflow-y-auto"
      closeOnBackdrop={!isSubmitting}
    >
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <AdminPlaceFormFields
          values={values}
          errors={errors}
          tiers={tiers}
          disabled={isSubmitting}
          place={place}
          mediaFile={mediaFile}
          removeMedia={removeMedia}
          setField={setField}
          onSelectMediaFile={onSelectMediaFile}
          onClearMediaSelection={onClearMediaSelection}
          onRemoveExistingMedia={onRemoveExistingMedia}
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
            {ADMIN_COPY.placesCancelCta}
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="rounded-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? ADMIN_COPY.placesSavingCta : ADMIN_COPY.placesSaveCta}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
