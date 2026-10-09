'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import OptimizedImage from '@/components/media/OptimizedImage'
import { useInViewport, useTabVisible } from '@/hooks/useInViewport'
import styles from '@/modules/hiltonHotels/hiltonHotels.module.css'

function cardHeightClass(cardType) {
  if (cardType === 'photo' || cardType === 'capabilities') return styles.railCardTall
  if (cardType === 'standard') return styles.railCardShort
  return styles.railCardMedium
}

function RailCard({ card }) {
  const height = cardHeightClass(card.cardType)
  if (card.cardType === 'photo' && card.mediaUrl) {
    return (
      <article className={`${styles.railCard} ${height}`}>
        <div className="relative h-full min-h-[520px]">
          <OptimizedImage
            src={card.mediaUrl}
            alt={card.mediaAlt || ''}
            fill
            sizes="430px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </article>
    )
  }

  const surface =
    card.cardType === 'capabilities' ? styles.railCardAccent : styles.railCardSurface

  return (
    <article className={`${styles.railCard} ${height}`}>
      <div className={surface}>
        {card.factValue ? (
          <p className="text-5xl font-bold" aria-label={card.factValue}>
            {card.factValue}
          </p>
        ) : null}
        {card.title ? <h3 className="text-2xl font-bold">{card.title}</h3> : null}
        {card.body ? <p className="mt-4 text-base leading-relaxed opacity-90">{card.body}</p> : null}
        {card.linkHref && card.linkLabel ? (
          <Link href={card.linkHref} className="mt-6 inline-flex underline underline-offset-4">
            {card.linkLabel}
          </Link>
        ) : null}
      </div>
    </article>
  )
}

export default function HiltonCompanyRail({ label, contactEmail, cards }) {
  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const inView = useInViewport(sectionRef)
  const tabVisible = useTabVisible()
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false })

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion || cards.length < 2 || !inView || !tabVisible) return undefined
    const viewport = viewportRef.current
    if (!viewport) return undefined
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return undefined

    const timer = window.setInterval(() => {
      if (dragRef.current.active) return
      viewport.scrollLeft += 1
      if (viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 2) {
        viewport.scrollLeft = 0
      }
    }, 40)

    return () => window.clearInterval(timer)
  }, [paused, reducedMotion, cards.length, inView, tabVisible])

  const scrollByCard = (direction) => {
    const viewport = viewportRef.current
    if (!viewport) return
    const amount = Math.min(430, viewport.clientWidth * 0.84) + 18
    viewport.scrollBy({ left: direction * amount, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  const onPointerDown = (event) => {
    const viewport = viewportRef.current
    if (!viewport) return
    dragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: viewport.scrollLeft,
      moved: false,
    }
    viewport.setPointerCapture?.(event.pointerId)
  }

  const onPointerMove = (event) => {
    if (!dragRef.current.active) return
    const viewport = viewportRef.current
    if (!viewport) return
    const delta = event.clientX - dragRef.current.startX
    if (Math.abs(delta) > 7) dragRef.current.moved = true
    viewport.scrollLeft = dragRef.current.scrollLeft - delta
  }

  const onPointerUp = () => {
    dragRef.current.active = false
  }

  if (!cards.length) return null

  return (
    <section id="Hilton-rail" ref={sectionRef} className={styles.section}>
      <div className={styles.wide}>
        <div className={styles.railHeader}>
          <h2 className={styles.principlesHeading}>{label}</h2>
          <div className="flex flex-wrap items-center gap-4">
            {contactEmail ? (
              <a href={`mailto:${contactEmail}`} className={styles.storyLink}>
                {contactEmail}
              </a>
            ) : (
              <Link href="/contact" className={styles.storyLink}>
                Contact us
              </Link>
            )}
            <div className={styles.railControls}>
              <button
                type="button"
                className={styles.railButton}
                aria-label="Previous cards"
                onClick={() => scrollByCard(-1)}
              >
                ←
              </button>
              <button
                type="button"
                className={styles.railButton}
                aria-label="Next cards"
                onClick={() => scrollByCard(1)}
              >
                →
              </button>
              <button
                type="button"
                className={styles.railButton}
                aria-pressed={paused}
                onClick={() => setPaused((value) => !value)}
              >
                {paused ? 'Play' : 'Pause'}
              </button>
            </div>
          </div>
        </div>
        <div
          ref={viewportRef}
          className={styles.railViewport}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={(event) => {
            if (dragRef.current.moved) {
              event.preventDefault()
              event.stopPropagation()
              dragRef.current.moved = false
            }
          }}
        >
          <div className={styles.railTrack}>
            {cards.map((card) => (
              <RailCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
