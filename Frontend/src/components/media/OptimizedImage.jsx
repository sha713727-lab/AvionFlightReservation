import Image from 'next/image'
import { cn } from '@/utils/cn'

/**
 * Next.js Image wrapper with CLS-safe sizing and lazy/eager loading rules.
 * Hero/LCP images: pass priority (sets loading="eager" + fetchPriority="high").
 * All other images: loading="lazy".
 * Formats: next/image serves AVIF/WebP when configured in next.config.js.
 */
export default function OptimizedImage({
  src,
  alt,
  className,
  sizes,
  priority = false,
  fill = false,
  width,
  height,
  quality = 75,
  placeholder,
  blurDataURL,
  onError,
}) {
  if (!src) return null

  if (typeof alt !== 'string') {
    throw new Error('OptimizedImage requires an alt string (use "" for decorative images)')
  }

  if (!fill && (width == null || height == null)) {
    throw new Error('OptimizedImage requires width and height when fill is false')
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      quality={quality}
      priority={priority}
      fetchPriority={priority ? 'high' : 'auto'}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      onError={onError}
      className={cn('max-w-full', className)}
    />
  )
}
