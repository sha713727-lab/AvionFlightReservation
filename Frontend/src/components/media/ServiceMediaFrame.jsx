'use client'

import OptimizedImage from '@/components/media/OptimizedImage'
import LazyVideo from '@/components/media/LazyVideo'
import { cn } from '@/utils/cn'

export default function ServiceMediaFrame({
  mediaType = 'image',
  image,
  mediaUrl,
  imageAlt,
  title,
  aspect = '16 / 11',
  className,
  imageClassName,
  sizes = '(max-width: 1024px) 100vw, 50vw',
  priority = false,
}) {
  const isVideo = mediaType === 'video' && Boolean(mediaUrl)
  const imageSrc = image || mediaUrl || ''
  const label =
    (imageAlt && imageAlt.trim()) ||
    (title ? `${title} travel service support by phone` : 'Travel service support by phone')

  return (
    <div
      className={cn('relative w-full overflow-hidden bg-section-alt', className)}
      style={{ aspectRatio: aspect }}
    >
      {isVideo ? (
        <LazyVideo src={mediaUrl} label={label} className={imageClassName} />
      ) : imageSrc ? (
        <OptimizedImage
          src={imageSrc}
          alt={label}
          fill
          sizes={sizes}
          quality={70}
          priority={priority}
          className={cn('object-cover object-center', imageClassName)}
        />
      ) : null}
    </div>
  )
}
