'use client'

import Button from '@/components/buttons/Button'
import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { ABOUT_PATH, SERVICES_PATH } from '@/constants/routes'
import { getSeoPageH1 } from '@/constants/seoPageMeta'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'

export default function AboutPageHero() {
  const callModal = useCallExpertModal()

  return (
    <section
      className="relative overflow-hidden bg-background pt-10 pb-20 lg:pt-14 lg:pb-28"
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
              {getSeoPageH1(ABOUT_PATH)}
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg speakable-summary">
              {COPY.about.pageDescription}
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button variant="primary" size="lg" onClick={callModal.open} className="w-full sm:w-auto">
                {COPY.about.pagePrimaryCta}
              </Button>
              <Button href={SERVICES_PATH} variant="secondary" size="lg" className="w-full sm:w-auto">
                {COPY.about.pageSecondaryCta}
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
