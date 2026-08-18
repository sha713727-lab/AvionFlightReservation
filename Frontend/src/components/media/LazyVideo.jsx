'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/utils/cn'

export default function LazyVideo({
  src,
  label,
  className,
}) {
  const videoRef = useRef(null)

  useEffect(() => {
    const node = videoRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          node.pause()
          return
        }

        node.play().catch(() => {
          // Autoplay can be blocked; the video remains muted and paused.
        })
      },
      { rootMargin: '200px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [src])

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      title={label}
      className={cn('absolute inset-0 h-full w-full object-cover object-center', className)}
    />
  )
}
