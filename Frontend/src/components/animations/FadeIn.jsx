'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/utils/cn'

const DIRECTION_CLASS = {
  up: 'translate-y-8',
  down: '-translate-y-8',
  left: '-translate-x-8',
  right: 'translate-x-8',
  scale: 'scale-[0.96]',
  fade: '',
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  once = true,
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(prefersReducedMotion)

  useEffect(() => {
    const node = ref.current
    if (!node || visible) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        if (once) observer.disconnect()
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once, visible])

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-out motion-reduce:transform-none motion-reduce:opacity-100',
        visible
          ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
          : cn(
              'opacity-0 motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100',
              DIRECTION_CLASS[direction] || DIRECTION_CLASS.up,
            ),
        className,
      )}
      style={visible || delay === 0 ? undefined : { transitionDelay: `${delay * 1000}ms` }}
    >
      {children}
    </div>
  )
}

export function StaggerContainer({ children, className = '' }) {
  return <div className={className}>{children}</div>
}

export function StaggerItem({ children, className = '' }) {
  return (
    <FadeIn direction="up" className={className}>
      {children}
    </FadeIn>
  )
}
