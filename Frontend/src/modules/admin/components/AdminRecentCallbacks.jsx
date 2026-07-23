'use client'

import Link from 'next/link'
import { ADMIN_CALLBACKS_PATH } from '@/constants/routes'
import { ADMIN_COPY } from '@/modules/admin/constants'
import { cn } from '@/utils/cn'

const STATUS_STYLES = {
  new: 'bg-accent/15 text-accent',
  contacted: 'bg-secondary/20 text-primary',
  closed: 'bg-success/15 text-success',
}

function formatDateTime(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function AdminRecentCallbacks({ items }) {
  return (
    <section className="rounded-2xl border border-border bg-section p-5 shadow-sm shadow-primary/5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-primary">
          {ADMIN_COPY.recentCallbacksTitle}
        </h2>
        <Link
          href={ADMIN_CALLBACKS_PATH}
          className="text-sm font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {ADMIN_COPY.viewCallbacksCta}
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 text-sm text-text-secondary">{ADMIN_COPY.emptyCallbacks}</p>
      ) : (
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-border bg-section-alt px-4 py-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-primary">{item.name}</p>
                <span
                  className={cn(
                    'rounded-lg px-2 py-0.5 text-xs font-medium capitalize',
                    STATUS_STYLES[item.status] || STATUS_STYLES.new,
                  )}
                >
                  {ADMIN_COPY.callbackStatusLabels[item.status] || item.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-text-secondary">{item.phone}</p>
              <p className="mt-1 text-xs text-text-muted">
                {ADMIN_COPY.callbacksSubmittedLabel}: {formatDateTime(item.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
