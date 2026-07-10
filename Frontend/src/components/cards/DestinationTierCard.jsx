import { useState } from 'react'
import { COPY } from '@/constants/copy'
import { cn } from '@/utils/cn'

function DestinationImage({ name, image, alt }) {
  const [hasError, setHasError] = useState(false)

  return (
    <div className="relative h-full w-full">
      {!hasError ? (
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-end bg-gradient-to-br from-primary to-accent/90 p-4">
          <span className="text-base font-medium text-white">{name}</span>
        </div>
      )}
      {!hasError && (
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/15 to-transparent" />
      )}
      <p className="absolute bottom-3 left-3 text-base font-semibold text-white">{name}</p>
    </div>
  )
}

export default function DestinationTierCard({ points, title, places }) {
  return (
    <article
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card',
        'transition-colors duration-300 hover:border-accent/15 hover:shadow-card-hover',
      )}
    >
      <div className="border-b border-border px-5 py-5 lg:px-6 lg:py-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
          {COPY.destinations.redeemFrom}
        </p>
        <p className="mt-2 text-xl font-semibold tracking-tight text-accent lg:text-2xl">
          {points.toLocaleString()}
          <span className="ml-1.5 text-base font-medium text-accent/80">points</span>
        </p>
        <h3 className="mt-2 text-base font-semibold text-primary lg:text-lg">{title}</h3>
      </div>

      <div className="flex flex-1 flex-col p-4 pt-4 lg:p-5 lg:pt-5">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
          {COPY.destinations.potentialDestinations}
        </p>
        <div className="grid grid-cols-2 gap-4">
          {places.map((place) => (
            <div key={place.name} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-section-alt">
              <DestinationImage {...place} />
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
