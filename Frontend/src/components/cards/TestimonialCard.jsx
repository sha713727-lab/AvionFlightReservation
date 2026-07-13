import { FaStar } from 'react-icons/fa'
import { cn } from '@/utils/cn'

export default function TestimonialCard({ name, country, rating, review, avatar }) {
  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-2xl border border-border bg-card p-6 lg:p-8',
        'transition-all duration-300 hover:border-accent/15 hover:shadow-card-hover',
      )}
    >
      <div className="mb-5 flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: rating }).map((_, i) => (
          <FaStar key={i} className="h-3.5 w-3.5 text-accent" aria-hidden />
        ))}
      </div>
      <blockquote className="mb-6 flex-1 text-base font-normal leading-relaxed text-primary lg:text-lg">
        &ldquo;{review}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-section-alt text-xs font-medium text-primary"
          aria-hidden
        >
          {avatar}
        </div>
        <div>
          <p className="text-sm font-medium text-primary">{name}</p>
          <p className="text-xs text-text-secondary">{country}</p>
        </div>
      </div>
    </article>
  )
}
