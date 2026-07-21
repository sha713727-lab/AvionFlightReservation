'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { cn } from '@/utils/cn'

function isUploadPath(src) {
  return typeof src === 'string' && src.startsWith('/uploads/')
}

export default function DestinationPlaceCard({
  name,
  image,
  alt,
  tierTitle,
  points,
  featured = false,
  mediaUrl = null,
  mediaType = null,
}) {
  const [hasError, setHasError] = useState(false)
  const isVideo = mediaType === 'video' && Boolean(mediaUrl)
  const imageSrc = (mediaType === 'image' && mediaUrl ? mediaUrl : null) || image || mediaUrl || ''
  const useNativeImg = isUploadPath(imageSrc)

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-border bg-card shadow-card',
        'transition-transform duration-300 hover:-translate-y-2',
        featured ? 'min-h-[320px] sm:min-h-[380px] lg:min-h-[440px]' : 'min-h-[240px] sm:min-h-[280px]',
      )}
    >
      {isVideo ? (
        <video
          src={mediaUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : !hasError && imageSrc ? (
        useNativeImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={alt}
            onError={() => setHasError(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <Image
            src={imageSrc}
            alt={alt}
            fill
            sizes={
              featured
                ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
            }
            onError={() => setHasError(true)}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/35 to-transparent transition-opacity duration-500 group-hover:from-primary/95" />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <FadeIn direction="up">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/65">
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
        <p className="mt-2 text-sm text-white/80">
          {COPY.destinations.redeemFromLabel}{' '}
          <span className="font-semibold text-secondary">
            {points.toLocaleString()} {COPY.destinations.pointsLabel}
          </span>
        </p>
      </div>
    </article>
  )
}
