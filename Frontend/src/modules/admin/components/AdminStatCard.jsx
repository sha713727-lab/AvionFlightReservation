export default function AdminStatCard({ label, value, hint, icon: Icon, tone = 'accent' }) {
  const tones = {
    accent: 'bg-accent/10 text-accent',
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/15 text-secondary',
    success: 'bg-success/10 text-success',
  }

  return (
    <article className="rounded-2xl border border-border bg-section p-5 shadow-sm shadow-primary/5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
            {label}
          </p>
          <p className="mt-3 font-heading text-3xl font-semibold tracking-tight text-primary">
            {value}
          </p>
          {hint ? <p className="mt-2 text-sm text-text-secondary">{hint}</p> : null}
        </div>
        {Icon ? (
          <span
            className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tones[tone] || tones.accent}`}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </span>
        ) : null}
      </div>
    </article>
  )
}
