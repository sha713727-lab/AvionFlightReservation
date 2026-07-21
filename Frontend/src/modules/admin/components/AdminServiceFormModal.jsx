'use client'

import Button from '@/components/buttons/Button'
import Modal from '@/components/ui/Modal'
import { ADMIN_COPY } from '@/modules/admin/constants'
import AdminServiceFormFields from '@/modules/admin/components/AdminServiceFormFields'
import { useAdminServiceForm } from '@/modules/admin/hooks/useAdminServiceForm'

export default function AdminServiceFormModal({
  isOpen,
  service,
  options,
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
    setSlug,
    setFeature,
    addFeature,
    removeFeature,
    onSelectMediaFile,
    onClearMediaSelection,
    onRemoveExistingMedia,
    handleSubmit,
  } = useAdminServiceForm({
    service,
    onSubmit: async (payload, mediaOptions) => {
      await onSubmit(payload, mediaOptions)
      onClose()
    },
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={isSubmitting ? () => {} : onClose}
      title={service ? ADMIN_COPY.servicesEditTitle : ADMIN_COPY.servicesCreateTitle}
      className="max-h-[90vh] max-w-2xl overflow-y-auto"
      closeOnBackdrop={!isSubmitting}
    >
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <AdminServiceFormFields
          values={values}
          errors={errors}
          options={options}
          disabled={isSubmitting}
          service={service}
          mediaFile={mediaFile}
          removeMedia={removeMedia}
          setField={setField}
          setSlug={setSlug}
          setFeature={setFeature}
          addFeature={addFeature}
          removeFeature={removeFeature}
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
            {ADMIN_COPY.servicesCancelCta}
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="rounded-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? ADMIN_COPY.servicesSavingCta : ADMIN_COPY.servicesSaveCta}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
