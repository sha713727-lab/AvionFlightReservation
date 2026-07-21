'use client'

import { useState } from 'react'
import Button from '@/components/buttons/Button'
import { ADMIN_COPY } from '@/modules/admin/constants'
import AdminFaqDeleteModal from '@/modules/admin/components/AdminFaqDeleteModal'
import AdminFaqFormModal from '@/modules/admin/components/AdminFaqFormModal'
import AdminFaqRow from '@/modules/admin/components/AdminFaqRow'
import { useAdminFaqs } from '@/modules/admin/hooks/useAdminFaqs'

export default function AdminFaqsHome({ token }) {
  const {
    items,
    isLoading,
    error,
    actionError,
    successMessage,
    pendingId,
    loadingLabel,
    saveFaq,
    removeFaq,
    moveFaq,
    clearFeedback,
  } = useAdminFaqs(token)

  const [editorOpen, setEditorOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [deletingItem, setDeletingItem] = useState(null)

  const openCreate = () => {
    clearFeedback()
    setEditingItem(null)
    setEditorOpen(true)
  }

  const openEdit = (faq) => {
    clearFeedback()
    setEditingItem(faq)
    setEditorOpen(true)
  }

  const handleSave = async (payload) => {
    await saveFaq(payload, editingItem?.id)
  }

  const handleDelete = async () => {
    if (!deletingItem) return
    await removeFaq(deletingItem.id)
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
        {error || ADMIN_COPY.faqsLoadError}
      </p>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-primary">
            {ADMIN_COPY.faqsTitle}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">{ADMIN_COPY.faqsDescription}</p>
        </div>
        <Button
          type="button"
          variant="primary"
          size="md"
          className="rounded-xl self-start"
          onClick={openCreate}
        >
          {ADMIN_COPY.faqsAddCta}
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
          {ADMIN_COPY.faqsEmpty}
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((faq, index) => (
            <AdminFaqRow
              key={faq.id}
              faq={faq}
              isFirst={index === 0}
              isLast={index === items.length - 1}
              isPending={pendingId === faq.id}
              onEdit={() => openEdit(faq)}
              onDelete={() => setDeletingItem(faq)}
              onMoveUp={() => moveFaq(faq.id, 'up')}
              onMoveDown={() => moveFaq(faq.id, 'down')}
            />
          ))}
        </ul>
      )}

      <AdminFaqFormModal
        isOpen={editorOpen}
        faq={editingItem}
        onClose={() => setEditorOpen(false)}
        onSubmit={handleSave}
      />

      <AdminFaqDeleteModal
        isOpen={Boolean(deletingItem)}
        faq={deletingItem}
        isDeleting={pendingId === deletingItem?.id}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
