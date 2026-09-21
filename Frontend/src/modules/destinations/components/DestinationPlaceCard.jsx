'use client'

import { useState } from 'react'
import { FadeIn } from '@/components/animations/FadeIn'
import LazyVideo from '@/components/media/LazyVideo'
import OptimizedImage from '@/components/media/OptimizedImage'
import { cn } from '@/utils/cn'

export default function DestinationPlaceCard({
  name,
  image,
  alt,
  tierTitle,
  featured = false,
  mediaUrl = null,
  mediaType = null,
}) {
  const [hasError, setHasError] = useState(false)
  const isVideo = mediaType === 'video' && Boolean(mediaUrl)
  const imageSrc = (mediaType === 'image' && mediaUrl ? mediaUrl : null) || image || mediaUrl || ''
  const resolvedAlt =
    (alt && alt.trim()) || `${name} flight destination for phone booking`

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-border bg-card shadow-card',
        'transition-transform duration-300 hover:-translate-y-2',
        featured ? 'min-h-[320px] sm:min-h-[380px] lg:min-h-[440px]' : 'min-h-[240px] sm:min-h-[280px]',
      )}
    >
      {isVideo ? (
        <LazyVideo
          src={mediaUrl}
          label={resolvedAlt}
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : !hasError && imageSrc ? (
        <OptimizedImage
          src={imageSrc}
          alt={resolvedAlt}
          fill
          quality={70}
          sizes={
            featured
              ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
          }
          onError={() => setHasError(true)}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/35 to-transparent transition-opacity duration-500 group-hover:from-primary/95" />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <FadeIn direction="up">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/80">
            {tierTitle}
          </p>
        </FadeIn>
        <h3
          className={cn(
            'mt-2 font-heading font-semibold tracking-tight text-white',
            featured ? 'text-3xl sm:text-4xl' : 'text-2xl',
          )}
        >
          {name}
        </h3>
      </div>
    </article>
  )
}
