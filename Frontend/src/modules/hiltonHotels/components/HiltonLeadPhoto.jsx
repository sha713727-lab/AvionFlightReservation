'use client'

import { useEffect, useRef, useState } from 'react'
import OptimizedImage from '@/components/media/OptimizedImage'
import styles from '@/modules/hiltonHotels/hiltonHotels.module.css'
import { objectPosition } from '@/modules/hiltonHotels/utils/mediaSlots'

export default function HiltonLeadPhoto({ slot }) {
  const frameRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return undefined
    if (reducedMotion || window.innerWidth < 768) {
      frame.style.width = '100%'
      return undefined
    }

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        const rect = frame.getBoundingClientRect()
        const viewport = window.innerHeight || 1
        const progress = 1 - Math.min(1, Math.max(0, (rect.top - viewport * 0.25) / (viewport * 0.7)))
        frame.style.width = `${(0.82 + progress * 0.18) * 100}%`
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  if (!slot?.mediaUrl) return null

  return (
    <section id="Hilton-lead" className={styles.section} aria-label="Lead photograph">
      <div className={styles.wide}>
        <div
          ref={frameRef}
          className={styles.leadFrame}
          style={{ width: '100%', marginInline: 'auto' }}
        >
          <div className={styles.leadInner}>
            <OptimizedImage
              src={slot.mediaUrl}
              alt={slot.alt || 'Hotel stay visual'}
              fill
              sizes="(max-width: 768px) 100vw, 1600px"
              style={{ objectFit: 'cover', objectPosition: objectPosition(slot) }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
