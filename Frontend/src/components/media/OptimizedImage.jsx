import Image from 'next/image'
import { cn } from '@/utils/cn'

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
  onError,
}) {
  if (!src) return null

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
      loading={priority ? undefined : 'lazy'}
      decoding="async"
      onError={onError}
      className={cn(className)}
    />
  )
}
