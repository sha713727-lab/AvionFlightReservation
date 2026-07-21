'use client'

import { HiOutlineTrash } from 'react-icons/hi'
import { ADMIN_COPY } from '@/modules/admin/constants'
import { cn } from '@/utils/cn'

const STATUS_STYLES = {
  new: 'bg-accent/15 text-accent',
  contacted: 'bg-secondary/20 text-primary',
  closed: 'bg-success/15 text-success',
}

const selectClassName = cn(
  'rounded-xl border border-border bg-section px-3 py-2 text-sm text-text',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  'disabled:cursor-not-allowed disabled:opacity-40',
)

function formatDateTime(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function AdminCallbackRow({
  item,
  isPending,
  onStatusChange,
  onDelete,
}) {
  return (
    <li className="rounded-2xl border border-border bg-section p-4 shadow-sm shadow-primary/5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-heading text-base font-semibold text-primary">
              {item.name}
            </h3>
            <span
              className={cn(
                'rounded-lg px-2 py-1 text-xs font-medium capitalize',
                STATUS_STYLES[item.status] || STATUS_STYLES.new,
              )}
            >
              {ADMIN_COPY.callbackStatusLabels[item.status] || item.status}
            </span>
          </div>
          <p className="text-sm text-text-secondary">
            <a
              href={`tel:${item.phone.replace(/\s+/g, '')}`}
              className="font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {item.phone}
            </a>
          </p>
          <p className="text-sm text-text-secondary">
            {ADMIN_COPY.callbacksPreferredLabel}: {formatDateTime(item.preferredAt)}
          </p>
          <p className="text-xs text-text-muted">
            {ADMIN_COPY.callbacksSubmittedLabel}: {formatDateTime(item.createdAt)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor={`callback-status-${item.id}`}>
            {ADMIN_COPY.callbacksStatusLabel}
          </label>
          <select
            id={`callback-status-${item.id}`}
            value={item.status}
            disabled={isPending}
            className={selectClassName}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            <option value="new">{ADMIN_COPY.callbackStatusLabels.new}</option>
            <option value="contacted">{ADMIN_COPY.callbackStatusLabels.contacted}</option>
            <option value="closed">{ADMIN_COPY.callbackStatusLabels.closed}</option>
          </select>
          <button
            type="button"
            disabled={isPending}
            className={cn(
              'inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-section px-3 py-2 text-sm font-medium text-error',
              'transition-colors hover:border-error',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
              'disabled:cursor-not-allowed disabled:opacity-40',
            )}
            onClick={onDelete}
          >
            <HiOutlineTrash className="h-4 w-4" aria-hidden />
            {ADMIN_COPY.callbacksDeleteCta}
          </button>
        </div>
      </div>
    </li>
  )
}
