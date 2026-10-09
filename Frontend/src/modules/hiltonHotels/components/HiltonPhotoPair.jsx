'use client'

import { useEffect, useRef } from 'react'
import OptimizedImage from '@/components/media/OptimizedImage'
import styles from '@/modules/hiltonHotels/hiltonHotels.module.css'
import { objectPosition } from '@/modules/hiltonHotels/utils/mediaSlots'

export default function HiltonPhotoPair({ id, left, right, variant = 'a' }) {
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches || window.innerWidth < 768) return undefined

    const onScroll = () => {
      const leftEl = leftRef.current
      const rightEl = rightRef.current
      if (!leftEl || !rightEl) return
      const rect = leftEl.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, 1 - rect.top / window.innerHeight))
      leftEl.style.transform = `translateY(${(progress - 0.5) * 48}px)`
      rightEl.style.transform = `translateY(${(0.5 - progress) * 36}px)`
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!left?.mediaUrl && !right?.mediaUrl) return null

  return (
    <section id={id} className={styles.section} aria-label="Editorial photographs">
      <div
        className={`${styles.editorial} ${styles.photoPair} ${
          variant === 'b' ? styles.photoPairB : ''
        }`}
      >
        {left?.mediaUrl ? (
          <div ref={leftRef} className={styles.photoFrame}>
            <OptimizedImage
              src={left.mediaUrl}
              alt={left.alt || ''}
              fill
              sizes="(max-width: 768px) 100vw, 550px"
              style={{ objectFit: 'cover', objectPosition: objectPosition(left) }}
            />
          </div>
        ) : (
          <div />
        )}
        {right?.mediaUrl ? (
          <div ref={rightRef} className={`${styles.photoFrame} ${styles.photoOffset}`}>
            <OptimizedImage
              src={right.mediaUrl}
              alt={right.alt || ''}
              fill
              sizes="(max-width: 768px) 88vw, 440px"
              style={{ objectFit: 'cover', objectPosition: objectPosition(right) }}
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
