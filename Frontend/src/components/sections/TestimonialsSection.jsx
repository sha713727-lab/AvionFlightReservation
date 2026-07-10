import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import TestimonialCard from '@/components/cards/TestimonialCard'
import { TESTIMONIALS } from '@/data/testimonials'
import { COPY } from '@/constants/copy'
import { EASE } from '@/components/animations/motionPresets'
import { cn } from '@/utils/cn'

const AUTO_INTERVAL_MS = 5000
const TRANSITION = { duration: 0.32, ease: EASE }

function useCardsPerView() {
  const [cardsPerView, setCardsPerView] = useState(2)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const update = () => setCardsPerView(media.matches ? 2 : 1)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return cardsPerView
}

export default function TestimonialsSection() {
  const cardsPerView = useCardsPerView()
  const [activePage, setActivePage] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const pageCount = Math.ceil(TESTIMONIALS.length / cardsPerView)
  const safeActivePage = Math.min(activePage, pageCount - 1)

  const visibleTestimonials = useMemo(() => {
    const start = safeActivePage * cardsPerView
    return TESTIMONIALS.slice(start, start + cardsPerView)
  }, [safeActivePage, cardsPerView])

  const next = useCallback(() => {
    setDirection(1)
    setActivePage((prev) => (prev + 1) % pageCount)
  }, [pageCount])

  const prev = useCallback(() => {
    setDirection(-1)
    setActivePage((current) => (current - 1 + pageCount) % pageCount)
  }, [pageCount])

  const goTo = useCallback((page) => {
    setDirection(page > safeActivePage ? 1 : -1)
    setActivePage(page)
  }, [safeActivePage])

  useEffect(() => {
    if (paused) return undefined
    const timer = setInterval(next, AUTO_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [next, paused])

  const slideOffset = direction * 64

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-background" aria-labelledby="testimonials-heading">
      <Container>
        <SectionHeading
          titleId="testimonials-heading"
          eyebrow={COPY.testimonials.eyebrow}
          title={COPY.testimonials.title}
          description={COPY.testimonials.description}
        />

        <div
          className="relative mx-auto max-w-5xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            onClick={prev}
            className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-card p-2 text-primary shadow-sm transition-colors hover:border-accent/30 hover:text-accent md:-left-14 md:flex"
            aria-label={COPY.testimonials.previousLabel}
          >
            <HiChevronLeft className="h-5 w-5" />
          </button>

          <div className="overflow-hidden px-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${safeActivePage}-${cardsPerView}`}
                initial={{ opacity: 0, x: slideOffset }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -slideOffset }}
                transition={TRANSITION}
                className="grid gap-5 md:grid-cols-2 md:gap-6"
              >
                {visibleTestimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} {...testimonial} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={next}
            className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-card p-2 text-primary shadow-sm transition-colors hover:border-accent/30 hover:text-accent md:-right-14 md:flex"
            aria-label={COPY.testimonials.nextLabel}
          >
            <HiChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-200',
                  index === safeActivePage ? 'w-8 bg-accent' : 'w-2.5 bg-border hover:bg-accent/40',
                )}
                aria-label={`Show testimonials page ${index + 1}`}
                aria-current={index === safeActivePage ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
