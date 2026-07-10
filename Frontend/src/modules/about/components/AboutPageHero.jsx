'use client'

import { motion } from 'framer-motion'
import Button from '@/components/buttons/Button'
import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { EASE } from '@/components/animations/motionPresets'
import { COPY } from '@/constants/copy'
import { SERVICES_PATH } from '@/constants/routes'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'

export default function AboutPageHero() {
  const callModal = useCallExpertModal()

  return (
    <section
      className="relative overflow-hidden bg-background pt-32 pb-20 lg:pt-40 lg:pb-28"
      aria-labelledby="about-page-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.12),_transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 top-28 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-text-muted">
              {COPY.about.pageEyebrow}
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1
              id="about-page-heading"
              className="font-heading text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[1.08] tracking-tight text-primary"
            >
              {COPY.about.pageTitle}
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              {COPY.about.pageDescription}
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <motion.div
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: EASE }}
            >
              <Button variant="primary" size="lg" onClick={callModal.open}>
                {COPY.about.pagePrimaryCta}
              </Button>
              <Button href={SERVICES_PATH} variant="secondary" size="lg">
                {COPY.about.pageSecondaryCta}
              </Button>
            </motion.div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
