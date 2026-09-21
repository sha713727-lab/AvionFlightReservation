'use client'

import { useState } from 'react'
import { ADMIN_COPY } from '@/modules/admin/constants'
import AdminInquiryDeleteModal from '@/modules/admin/components/AdminInquiryDeleteModal'
import AdminInquiryRow from '@/modules/admin/components/AdminInquiryRow'
import { useAdminInquiries } from '@/modules/admin/hooks/useAdminInquiries'
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

export default function AdminInquiriesHome({ token }) {
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
    removeInquiry,
    refresh,
    clearFeedback,
  } = useAdminInquiries(token)

  const [deletingItem, setDeletingItem] = useState(null)

  const handleDelete = async () => {
    if (!deletingItem) return
    await removeInquiry(deletingItem.id)
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
          {error || ADMIN_COPY.inquiriesLoadError}
        </p>
        <button type="button" className={refreshClassName} onClick={() => void refresh()}>
          {ADMIN_COPY.inquiriesRefreshCta}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-primary">
            {ADMIN_COPY.inquiriesTitle}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">{ADMIN_COPY.inquiriesDescription}</p>
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
          {ADMIN_COPY.inquiriesRefreshCta}
        </button>
      </div>

      <div>
        <label htmlFor="inquiries-status-filter" className="mb-2 block text-sm font-medium text-primary">
          {ADMIN_COPY.inquiriesFilterLabel}
        </label>
        <select
          id="inquiries-status-filter"
          value={statusFilter}
          className={selectClassName}
          onChange={(event) => {
            clearFeedback()
            setStatusFilter(event.target.value)
          }}
        >
          <option value="">{ADMIN_COPY.inquiriesFilterAll}</option>
          <option value="new">{ADMIN_COPY.inquiryStatusLabels.new}</option>
          <option value="contacted">{ADMIN_COPY.inquiryStatusLabels.contacted}</option>
          <option value="qualified">{ADMIN_COPY.inquiryStatusLabels.qualified}</option>
          <option value="quote_accepted">
            {ADMIN_COPY.inquiryStatusLabels.quote_accepted}
          </option>
          <option value="completed">{ADMIN_COPY.inquiryStatusLabels.completed}</option>
          <option value="misdial">{ADMIN_COPY.inquiryStatusLabels.misdial}</option>
          <option value="closed">{ADMIN_COPY.inquiryStatusLabels.closed}</option>
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
          {ADMIN_COPY.inquiriesEmpty}
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <AdminInquiryRow
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

      <AdminInquiryDeleteModal
        isOpen={Boolean(deletingItem)}
        item={deletingItem}
        isDeleting={pendingId === deletingItem?.id}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
