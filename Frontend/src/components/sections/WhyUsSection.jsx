'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import Container from '@/components/ui/Container'
import LayeredSectionHeading from '@/components/ui/LayeredSectionHeading'
import WhyUsCard from '@/components/cards/WhyUsCard'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { EASE } from '@/components/animations/motionPresets'
import { COPY } from '@/constants/copy'
import { WHY_US, STATS } from '@/data/services'
import { useCounter } from '@/hooks/useCounter'
import { cn } from '@/utils/cn'

const AUTO_INTERVAL_MS = 3500
const TRANSITION = { duration: 0.28, ease: EASE }

function StatCounter({ value, suffix = '', label }) {
  const { count, ref } = useCounter(value)

  return (
    <div
      ref={ref}
      className="group cursor-default text-center transition-transform duration-300 hover:-translate-y-0.5"
    >
      <p className="mb-1 text-3xl font-semibold tracking-tight text-primary transition-colors duration-300 group-hover:text-accent lg:text-4xl">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="text-sm text-text-secondary transition-colors duration-300 group-hover:text-text">
        {label}
      </p>
    </div>
  )
}

function WhyUsMobileCarousel() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const cardCount = WHY_US.length

  const goTo = useCallback(
    (index) => {
      setDirection(index > active ? 1 : -1)
      setActive(index)
    },
    [active],
  )

  const next = useCallback(() => {
    setDirection(1)
    setActive((current) => (current + 1) % cardCount)
  }, [cardCount])

  const prev = useCallback(() => {
    setDirection(-1)
    setActive((current) => (current - 1 + cardCount) % cardCount)
  }, [cardCount])

  useEffect(() => {
    if (paused) return undefined
    const timer = setInterval(next, AUTO_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [next, paused])

  const safeActive = active % cardCount
  const item = WHY_US[safeActive]
  const slideOffset = direction * 80

  return (
    <div
      className="relative mb-14 sm:hidden"
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <button
        type="button"
        onClick={prev}
        className="absolute -left-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-card p-2 text-primary shadow-sm transition-colors hover:border-accent/30 hover:text-accent"
        aria-label={COPY.whyUs.previousLabel}
      >
        <HiChevronLeft className="h-5 w-5" />
      </button>

      <div className="overflow-hidden px-8">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={item.id}
            custom={direction}
            initial={{ opacity: 0, x: slideOffset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -slideOffset }}
            transition={TRANSITION}
          >
            <WhyUsCard item={item} index={safeActive} />
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={next}
        className="absolute -right-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-card p-2 text-primary shadow-sm transition-colors hover:border-accent/30 hover:text-accent"
        aria-label={COPY.whyUs.nextLabel}
      >
        <HiChevronRight className="h-5 w-5" />
      </button>

      <div className="mt-6 flex justify-center gap-2">
        {WHY_US.map((card, index) => (
          <button
            key={card.id}
            type="button"
            onClick={() => goTo(index)}
            className={cn(
              'h-2.5 rounded-full transition-all duration-200',
              index === safeActive ? 'w-8 bg-accent' : 'w-2.5 bg-border hover:bg-accent/40',
            )}
            aria-label={`Show ${card.title}`}
            aria-current={index === safeActive ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
}

export default function WhyUsSection() {
  return (
    <section id="why-us" className="bg-section-alt py-24 lg:py-32" aria-labelledby="why-us-heading">
      <Container>
        <LayeredSectionHeading
          titleId="why-us-heading"
          watermark={COPY.whyUs.watermark}
          title={COPY.whyUs.title}
          description={COPY.whyUs.description}
        />

        <WhyUsMobileCarousel />

        <StaggerContainer className="mb-20 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((item, index) => (
            <StaggerItem key={item.id}>
              <WhyUsCard item={item} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn>
          <div className="grid grid-cols-2 gap-8 border border-border bg-card px-8 py-12 shadow-sm lg:grid-cols-4">
            {STATS.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
