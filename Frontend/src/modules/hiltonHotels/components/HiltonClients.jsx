'use client'

import { useEffect, useRef, useState } from 'react'
import OptimizedImage from '@/components/media/OptimizedImage'
import { useInViewport, useTabVisible } from '@/hooks/useInViewport'
import styles from '@/modules/hiltonHotels/hiltonHotels.module.css'

export default function HiltonClients({ enabled, heading, introduction, logos }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const inView = useInViewport(sectionRef)
  const tabVisible = useTabVisible()
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!enabled || logos.length < 5 || paused || reducedMotion || !inView || !tabVisible) {
      return undefined
    }
    const track = trackRef.current
    if (!track) return undefined
    let offset = 0
    let frame = 0
    const tick = () => {
      offset += 0.35
      if (offset > track.scrollWidth / 2) offset = 0
      track.style.transform = `translateX(-${offset}px)`
      frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [enabled, logos.length, paused, reducedMotion, inView, tabVisible])

  if (!enabled || logos.length === 0) return null

  const loop = logos.length >= 5 ? [...logos, ...logos] : logos

  return (
    <section id="Hilton-clients" ref={sectionRef} className={styles.section}>
      <div className={styles.wide}>
        <div className={styles.clientsIntro}>
          <h2 className={styles.clientsHeading}>{heading}</h2>
          <p className={styles.heroIntro}>{introduction}</p>
        </div>
        {logos.length >= 5 ? (
          <div className="mt-10 flex justify-end">
            <button
              type="button"
              className={styles.railButton}
              onClick={() => setPaused((value) => !value)}
              aria-pressed={paused}
            >
              {paused ? 'Play logos' : 'Pause logos'}
            </button>
          </div>
        ) : null}
        <div className="mt-8 overflow-hidden" aria-label="Client logos">
          <div
            ref={trackRef}
            className="flex items-center gap-16"
            aria-hidden={logos.length >= 5}
          >
            {loop.map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="relative h-12 w-40 shrink-0 opacity-80">
                {logo.mediaUrl ? (
                  <OptimizedImage
                    src={logo.mediaUrl}
                    alt={index < logos.length ? logo.name : ''}
                    fill
                    sizes="160px"
                    style={{ objectFit: 'contain' }}
                  />
                ) : (
                  <span className="text-sm text-[var(--wh-muted)]">{logo.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
