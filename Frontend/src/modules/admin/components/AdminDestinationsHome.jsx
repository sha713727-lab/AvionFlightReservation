'use client'

import { useState } from 'react'
import Button from '@/components/buttons/Button'
import { ADMIN_COPY } from '@/modules/admin/constants'
import AdminDestinationDeleteModal from '@/modules/admin/components/AdminDestinationDeleteModal'
import AdminDestinationFormModal from '@/modules/admin/components/AdminDestinationFormModal'
import AdminDestinationRow from '@/modules/admin/components/AdminDestinationRow'
import { useAdminDestinations } from '@/modules/admin/hooks/useAdminDestinations'

export default function AdminDestinationsHome({ token }) {
  const {
    items,
    isLoading,
    error,
    actionError,
    successMessage,
    pendingId,
    loadingLabel,
    saveDestination,
    removeDestination,
    moveDestination,
    clearFeedback,
  } = useAdminDestinations(token)

  const [editorOpen, setEditorOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [deletingItem, setDeletingItem] = useState(null)

  const openCreate = () => {
    clearFeedback()
    setEditingItem(null)
    setEditorOpen(true)
  }

  const openEdit = (destination) => {
    clearFeedback()
    setEditingItem(destination)
    setEditorOpen(true)
  }

  const handleSave = async (payload) => {
    await saveDestination(payload, editingItem?.id)
  }

  const handleDelete = async () => {
    if (!deletingItem) return
    await removeDestination(deletingItem.id)
    setDeletingItem(null)
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
        {error || ADMIN_COPY.destinationsLoadError}
      </p>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-primary">
            {ADMIN_COPY.destinationsTitle}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            {ADMIN_COPY.destinationsDescription}
          </p>
        </div>
        <Button
          type="button"
          variant="primary"
          size="md"
          className="rounded-xl self-start"
          onClick={openCreate}
        >
          {ADMIN_COPY.destinationsAddCta}
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
          {ADMIN_COPY.destinationsEmpty}
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((destination, index) => (
            <AdminDestinationRow
              key={destination.id}
              destination={destination}
              isFirst={index === 0}
              isLast={index === items.length - 1}
              isPending={pendingId === destination.id}
              onEdit={() => openEdit(destination)}
              onDelete={() => setDeletingItem(destination)}
              onMoveUp={() => moveDestination(destination.id, 'up')}
              onMoveDown={() => moveDestination(destination.id, 'down')}
            />
          ))}
        </ul>
      )}

      <AdminDestinationFormModal
        isOpen={editorOpen}
        destination={editingItem}
        onClose={() => setEditorOpen(false)}
        onSubmit={handleSave}
      />

      <AdminDestinationDeleteModal
        isOpen={Boolean(deletingItem)}
        destination={deletingItem}
        isDeleting={pendingId === deletingItem?.id}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
