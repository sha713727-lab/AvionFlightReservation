'use client'

import { HiArrowDown } from 'react-icons/hi'
import Button from '@/components/buttons/Button'
import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { DESTINATIONS_PATH } from '@/constants/routes'
import { getSeoPageH1 } from '@/constants/seoPageMeta'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'

const GALLERY_ANCHOR = '#destination-gallery'

export default function DestinationsPageHero({ cityNames = [] }) {
  const callModal = useCallExpertModal()
  const marqueeCities =
    cityNames.length > 0 ? [...cityNames, ...cityNames] : []

  return (
    <section
      className="relative overflow-hidden bg-primary pt-10 pb-20 lg:pt-14 lg:pb-28"
      aria-labelledby="destinations-page-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.35),_transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-white/75">
              {COPY.destinations.pageEyebrow}
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1
              id="destinations-page-heading"
              className="font-heading text-[clamp(1.75rem,7vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-white"
            >
              {getSeoPageH1(DESTINATIONS_PATH)}
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg speakable-summary">
              {COPY.destinations.pageDescription}
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button variant="primary" size="lg" onClick={callModal.open} className="w-full sm:w-auto">
                {COPY.destinations.pagePrimaryCta}
              </Button>
              <Button
                href={GALLERY_ANCHOR}
                variant="secondary"
                size="lg"
                icon={HiArrowDown}
                iconPosition="right"
                className="w-full border-white/25 text-white hover:border-white hover:bg-white/10 sm:w-auto"
              >
                {COPY.destinations.pageSecondaryCta}
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>

      <div className="partner-marquee relative z-10 mt-14 overflow-hidden border-y border-white/10 py-4" aria-hidden>
        {marqueeCities.length > 0 ? (
          <div className="partner-marquee-track flex w-max gap-8 whitespace-nowrap px-8">
            {marqueeCities.map((city, index) => (
              <span
                key={`${city}-${index}`}
                className="text-sm font-medium uppercase tracking-[0.22em] text-white/35"
              >
                {city}
                <span className="ml-8 text-accent/70">•</span>
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
