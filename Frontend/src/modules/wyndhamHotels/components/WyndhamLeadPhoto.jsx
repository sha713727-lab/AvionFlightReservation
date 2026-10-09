'use client'

import { useEffect, useRef, useState } from 'react'
import OptimizedImage from '@/components/media/OptimizedImage'
import styles from '@/modules/wyndhamHotels/wyndhamHotels.module.css'
import { objectPosition } from '@/modules/wyndhamHotels/utils/mediaSlots'

export default function WyndhamLeadPhoto({ slot }) {
  const frameRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reducedMotion || window.innerWidth < 768) {
      setScale(1)
      return undefined
    }

    const frame = frameRef.current
    if (!frame) return undefined

    const onScroll = () => {
      const rect = frame.getBoundingClientRect()
      const viewport = window.innerHeight || 1
      const progress = 1 - Math.min(1, Math.max(0, (rect.top - viewport * 0.25) / (viewport * 0.7)))
      setScale(0.82 + progress * 0.18)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reducedMotion])

  if (!slot?.mediaUrl) return null

  return (
    <section id="wyndham-lead" className={styles.section} aria-label="Lead photograph">
      <div className={styles.wide}>
        <div
          ref={frameRef}
          className={styles.leadFrame}
          style={{ width: `${scale * 100}%`, marginInline: 'auto' }}
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
