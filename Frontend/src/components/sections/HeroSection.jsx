'use client'

import { HiPlay } from 'react-icons/hi'
import Container from '@/components/ui/Container'
import Button from '@/components/buttons/Button'
import HeroBackground from '@/components/sections/HeroBackground'
import { COPY } from '@/constants/copy'
import { HOME_PATH, SERVICES_PATH } from '@/constants/routes'
import { getSeoPageH1 } from '@/constants/seoPageMeta'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'

export default function HeroSection() {
  const callModal = useCallExpertModal()

  return (
    <section
      className="relative flex items-start overflow-hidden md:min-h-screen md:items-center"
      aria-labelledby="home-hero-heading"
    >
      <HeroBackground />

      <Container className="relative z-10 flex w-full justify-center px-5 pt-24 pb-12 sm:px-6 sm:pt-32 sm:pb-20 lg:pt-44 lg:pb-36">
        <div className="relative mx-auto w-full max-w-5xl text-center">
          <div
            className="hero-heading-glow pointer-events-none absolute left-1/2 top-[18%] z-0 h-[min(70vw,28rem)] w-[min(90vw,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl sm:top-[22%] sm:h-[22rem] sm:w-[40rem]"
            aria-hidden
          />

          <div className="relative z-[1] w-full">
            <h1
              id="home-hero-heading"
              className="mb-6 w-full text-center font-heading text-[clamp(1.5rem,6.5vw,3.5rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-primary sm:mb-7 sm:tracking-[-0.045em]"
            >
              {getSeoPageH1(HOME_PATH)}
            </h1>
          </div>

          <p className="speakable-summary hero-copy-in relative z-[1] mx-auto mb-8 max-w-xl px-1 text-center text-base font-normal leading-relaxed text-text sm:mb-10 sm:text-lg">
            {COPY.hero.speakableSummary}
          </p>

          <div className="hero-copy-in relative z-[1] flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={callModal.open}
              className="w-full sm:w-auto"
            >
              {COPY.cta.callNow}
            </Button>
            <Button
              href={SERVICES_PATH}
              variant="secondary"
              size="lg"
              icon={HiPlay}
              className="w-full sm:w-auto"
            >
              {COPY.cta.exploreServices}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
