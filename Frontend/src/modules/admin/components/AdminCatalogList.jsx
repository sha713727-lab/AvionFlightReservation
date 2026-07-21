import { ADMIN_COPY } from '@/modules/admin/constants'

function formatUpdatedAt(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export default function AdminCatalogList({ title, items, emptyLabel }) {
  return (
    <section className="rounded-2xl border border-border bg-section shadow-sm shadow-primary/5">
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-primary">
          {title}
        </h2>
        <span className="text-xs font-medium text-text-muted">{ADMIN_COPY.viewAllLabel}</span>
      </div>

      {items.length === 0 ? (
        <p className="px-5 py-8 text-sm text-text-secondary">{emptyLabel}</p>
      ) : (
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li key={item.id} className="flex items-start justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-primary">{item.title}</p>
                <p className="mt-1 truncate text-xs text-text-muted">{item.slug}</p>
              </div>
              <p className="shrink-0 text-xs text-text-secondary">
                {ADMIN_COPY.updatedLabel} {formatUpdatedAt(item.updatedAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
