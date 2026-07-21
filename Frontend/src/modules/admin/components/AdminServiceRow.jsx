'use client'

import {
  HiOutlineArrowDown,
  HiOutlineArrowUp,
  HiOutlinePencil,
  HiOutlineTrash,
} from 'react-icons/hi'
import { ADMIN_COPY } from '@/modules/admin/constants'
import { formatDisplayOrder } from '@/modules/admin/utils/serviceForm'
import { cn } from '@/utils/cn'

export default function AdminServiceRow({
  service,
  isFirst,
  isLast,
  isPending,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  return (
    <li className="rounded-2xl border border-border bg-section p-4 shadow-sm shadow-primary/5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg bg-accent/10 px-2 text-sm font-semibold text-accent">
              {formatDisplayOrder(service.sortOrder)}
            </span>
            <h3 className="truncate font-heading text-base font-semibold text-primary">
              {service.title}
            </h3>
            <span
              className={cn(
                'rounded-lg px-2 py-1 text-xs font-medium',
                service.isActive ? 'bg-success/15 text-success' : 'bg-text-muted/15 text-text-muted',
              )}
            >
              {service.isActive ? ADMIN_COPY.servicesActive : ADMIN_COPY.servicesInactive}
            </span>
          </div>
          <p className="mt-2 text-sm text-text-secondary">{service.tagline}</p>
          <p className="mt-1 text-xs text-text-muted">/{service.slug}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={isPending || isFirst}
            aria-label={ADMIN_COPY.servicesMoveUp}
            className={actionClassName}
            onClick={onMoveUp}
          >
            <HiOutlineArrowUp className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            disabled={isPending || isLast}
            aria-label={ADMIN_COPY.servicesMoveDown}
            className={actionClassName}
            onClick={onMoveDown}
          >
            <HiOutlineArrowDown className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            disabled={isPending}
            className={cn(actionClassName, 'px-3')}
            onClick={onEdit}
          >
            <HiOutlinePencil className="h-4 w-4" aria-hidden />
            {ADMIN_COPY.servicesEditCta}
          </button>
          <button
            type="button"
            disabled={isPending}
            className={cn(actionClassName, 'px-3 text-error hover:border-error hover:text-error')}
            onClick={onDelete}
          >
            <HiOutlineTrash className="h-4 w-4" aria-hidden />
            {ADMIN_COPY.servicesDeleteCta}
          </button>
        </div>
      </div>
    </li>
  )
}

const actionClassName = cn(
  'inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-section px-2.5 py-2 text-sm font-medium text-primary',
  'transition-colors hover:border-accent hover:text-accent',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  'disabled:cursor-not-allowed disabled:opacity-40',
)
