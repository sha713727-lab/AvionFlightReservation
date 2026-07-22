'use client'

import Image from 'next/image'
import { cn } from '@/utils/cn'
import { isUploadMediaPath } from '@/utils/mediaUrl'

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
}) {
  const isVideo = mediaType === 'video' && Boolean(mediaUrl)
  const imageSrc = image || mediaUrl || ''
  const useNativeImg = isUploadMediaPath(imageSrc)

  return (
    <div
      className={cn('relative w-full overflow-hidden bg-section-alt', className)}
      style={{ aspectRatio: aspect }}
    >
      {isVideo ? (
        <video
          src={mediaUrl}
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="auto"
          aria-label={imageAlt || title}
          className={cn(
            'absolute inset-0 h-full w-full object-cover object-center',
            imageClassName,
          )}
        />
      ) : useNativeImg ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className={cn(
            'absolute inset-0 h-full w-full object-cover object-center',
            imageClassName,
          )}
        />
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes={sizes}
          className={cn('object-cover object-center', imageClassName)}
        />
      ) : null}
    </div>
  )
}
