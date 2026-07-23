'use client'

import { useState } from 'react'
import { ADMIN_COPY } from '@/modules/admin/constants'
import AdminCallbackDeleteModal from '@/modules/admin/components/AdminCallbackDeleteModal'
import AdminCallbackRow from '@/modules/admin/components/AdminCallbackRow'
import { useAdminCallbacks } from '@/modules/admin/hooks/useAdminCallbacks'
import { cn } from '@/utils/cn'

const selectClassName = cn(
  'w-full max-w-xs rounded-xl border border-border bg-section px-4 py-3 text-sm text-text',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
)

const refreshClassName = cn(
  'rounded-xl border border-border bg-section px-4 py-3 text-sm font-medium text-primary',
  'transition-colors hover:border-accent/40',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  'disabled:cursor-not-allowed disabled:opacity-40',
)

export default function AdminCallbacksHome({ token }) {
  const {
    items,
    statusFilter,
    setStatusFilter,
    isLoading,
    error,
    actionError,
    successMessage,
    pendingId,
    loadingLabel,
    changeStatus,
    removeCallback,
    refresh,
    clearFeedback,
  } = useAdminCallbacks(token)

  const [deletingItem, setDeletingItem] = useState(null)

  const handleDelete = async () => {
    if (!deletingItem) return
    await removeCallback(deletingItem.id)
    setDeletingItem(null)
  }

  if (isLoading && items.length === 0) {
    return (
      <p className="text-sm text-text-secondary" role="status">
        {loadingLabel}
      </p>
    )
  }

  if (error && items.length === 0) {
    return (
      <div className="space-y-4">
        <p className="rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-sm text-error" role="alert">
          {error || ADMIN_COPY.callbacksLoadError}
        </p>
        <button type="button" className={refreshClassName} onClick={() => void refresh()}>
          {ADMIN_COPY.callbacksRefreshCta}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-primary">
            {ADMIN_COPY.callbacksTitle}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">{ADMIN_COPY.callbacksDescription}</p>
        </div>
        <button
          type="button"
          className={refreshClassName}
          disabled={isLoading || Boolean(pendingId)}
          onClick={() => {
            clearFeedback()
            void refresh()
          }}
        >
          {ADMIN_COPY.callbacksRefreshCta}
        </button>
      </div>

      <div>
        <label htmlFor="callbacks-status-filter" className="mb-2 block text-sm font-medium text-primary">
          {ADMIN_COPY.callbacksFilterLabel}
        </label>
        <select
          id="callbacks-status-filter"
          value={statusFilter}
          className={selectClassName}
          onChange={(event) => {
            clearFeedback()
            setStatusFilter(event.target.value)
          }}
        >
          <option value="">{ADMIN_COPY.callbacksFilterAll}</option>
          <option value="new">{ADMIN_COPY.callbackStatusLabels.new}</option>
          <option value="contacted">{ADMIN_COPY.callbackStatusLabels.contacted}</option>
          <option value="closed">{ADMIN_COPY.callbackStatusLabels.closed}</option>
        </select>
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
          {ADMIN_COPY.callbacksEmpty}
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <AdminCallbackRow
              key={item.id}
              item={item}
              isPending={pendingId === item.id}
              onStatusChange={(status) => changeStatus(item.id, status)}
              onDelete={() => {
                clearFeedback()
                setDeletingItem(item)
              }}
            />
          ))}
        </ul>
      )}

      <AdminCallbackDeleteModal
        isOpen={Boolean(deletingItem)}
        item={deletingItem}
        isDeleting={pendingId === deletingItem?.id}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
