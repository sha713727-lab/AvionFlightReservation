'use client'

import { useState } from 'react'
import Button from '@/components/buttons/Button'
import { ADMIN_COPY } from '@/modules/admin/constants'
import AdminServiceDeleteModal from '@/modules/admin/components/AdminServiceDeleteModal'
import AdminServiceFormModal from '@/modules/admin/components/AdminServiceFormModal'
import AdminServiceRow from '@/modules/admin/components/AdminServiceRow'
import { useAdminServices } from '@/modules/admin/hooks/useAdminServices'

export default function AdminServicesHome({ token }) {
  const {
    items,
    options,
    isLoading,
    error,
    actionError,
    successMessage,
    pendingId,
    loadingLabel,
    saveService,
    removeService,
    moveService,
    clearFeedback,
  } = useAdminServices(token)

  const [editorOpen, setEditorOpen] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [deletingService, setDeletingService] = useState(null)

  const openCreate = () => {
    clearFeedback()
    setEditingService(null)
    setEditorOpen(true)
  }

  const openEdit = (service) => {
    clearFeedback()
    setEditingService(service)
    setEditorOpen(true)
  }

  const handleSave = async (payload, mediaOptions) => {
    await saveService(payload, editingService?.id, mediaOptions)
  }

  const handleDelete = async () => {
    if (!deletingService) return
    await removeService(deletingService.id)
    setDeletingService(null)
  }

  if (isLoading) {
    return (
      <p className="text-sm text-text-secondary" role="status">
        {loadingLabel}
      </p>
    )
  }

  if (error) {
    return (
      <p className="rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-sm text-error" role="alert">
        {error || ADMIN_COPY.servicesLoadError}
      </p>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-primary">
            {ADMIN_COPY.servicesTitle}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">{ADMIN_COPY.servicesDescription}</p>
        </div>
        <Button
          type="button"
          variant="primary"
          size="md"
          className="rounded-xl self-start"
          onClick={openCreate}
        >
          {ADMIN_COPY.servicesAddCta}
        </Button>
      </div>

      {actionError ? (
        <p className="rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-sm text-error" role="alert">
          {actionError}
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

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-section px-4 py-10 text-center text-sm text-text-secondary">
          {ADMIN_COPY.servicesEmpty}
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((service, index) => (
            <AdminServiceRow
              key={service.id}
              service={service}
              isFirst={index === 0}
              isLast={index === items.length - 1}
              isPending={pendingId === service.id}
              onEdit={() => openEdit(service)}
              onDelete={() => setDeletingService(service)}
              onMoveUp={() => moveService(service.id, 'up')}
              onMoveDown={() => moveService(service.id, 'down')}
            />
          ))}
        </ul>
      )}

      <AdminServiceFormModal
        isOpen={editorOpen}
        service={editingService}
        options={options}
        onClose={() => setEditorOpen(false)}
        onSubmit={handleSave}
      />

      <AdminServiceDeleteModal
        isOpen={Boolean(deletingService)}
        service={deletingService}
        isDeleting={pendingId === deletingService?.id}
        onClose={() => setDeletingService(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
