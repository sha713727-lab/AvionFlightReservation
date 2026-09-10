import { cn } from '@/utils/cn'
import { COPY } from '@/constants/copy'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < rating
        return (
          <span
            key={`star-${index}`}
            className={cn('text-base leading-none', filled ? 'text-accent' : 'text-border')}
            aria-hidden
          >
            ★
          </span>
        )
      })}
    </div>
  )
}

/**
 * Customer review card.
 * Content is expected to be placeholder until replaced with real reviews.
 */
export default function TestimonialCard({ name, rating, text, dateIso, dateLabel, verified }) {
  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-2xl border border-border bg-card p-6 lg:p-7',
        'transition-colors duration-300 hover:border-accent/20',
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <StarRating rating={rating} />
        {verified ? (
          <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-2.5 py-1 text-xs font-medium text-accent">
            {COPY.testimonials.verifiedBadge}
          </span>
        ) : null}
      </div>

      <p className="mt-4 flex-1 text-base leading-relaxed text-text-secondary">{text}</p>

      <footer className="mt-6 flex flex-wrap items-end justify-between gap-2 border-t border-border/80 pt-4">
        <div>
          <p className="font-semibold tracking-tight text-primary">{name}</p>
          <p className="mt-1 text-xs text-text-muted">
            <time dateTime={dateIso}>{dateLabel}</time>
          </p>
        </div>
      </footer>
    </article>
  )
}
