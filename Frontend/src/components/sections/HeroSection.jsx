'use client'

import { FaBriefcase, FaGift, FaHotel, FaPlane, FaUmbrellaBeach } from 'react-icons/fa'
import { HiPlay } from 'react-icons/hi'
import { MdConnectingAirports, MdLuggage, MdSwapHoriz } from 'react-icons/md'
import Container from '@/components/ui/Container'
import Button from '@/components/buttons/Button'
import HeroBackground from '@/components/sections/HeroBackground'
import { COPY } from '@/constants/copy'
import { SERVICES_PATH } from '@/constants/routes'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'

const HERO_FLOATING_ICONS = [
  { Icon: FaPlane, className: 'left-[5%] top-[10%]', delay: '0s' },
  { Icon: FaGift, className: 'left-[3%] top-[34%]', delay: '0.4s' },
  { Icon: FaUmbrellaBeach, className: 'left-[11%] top-[47%]', delay: '0.8s', small: true },
  { Icon: MdConnectingAirports, className: 'left-[7%] top-[63%]', delay: '1.2s', small: true },
  { Icon: FaBriefcase, className: 'left-[4%] bottom-[10%]', delay: '0.6s' },
  { Icon: FaHotel, className: 'right-[6%] top-[15%]', delay: '0.3s', small: true },
  { Icon: MdSwapHoriz, className: 'right-[4%] top-[29%]', delay: '0.9s' },
  { Icon: MdLuggage, className: 'right-[7%] top-[56%]', delay: '0.5s' },
  { Icon: MdConnectingAirports, className: 'right-[5%] bottom-[16%]', delay: '1.1s', small: true },
]

function FloatingHeroIcons() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden md:block"
      aria-hidden
    >
      {HERO_FLOATING_ICONS.map(({ Icon, className, delay, small }) => (
        <span
          key={`${className}-${delay}`}
          className={`hero-float absolute ${className} flex items-center justify-center text-accent drop-shadow-md ${
            small ? 'text-3xl lg:text-5xl' : 'text-5xl lg:text-7xl'
          }`}
          style={{ animationDelay: delay }}
        >
          <Icon aria-hidden />
        </span>
      ))}
    </div>
  )
}

export default function HeroSection() {
  const callModal = useCallExpertModal()

  return (
    <section
      className="relative flex items-start overflow-hidden md:min-h-screen md:items-center"
      aria-labelledby="home-hero-heading"
    >
      <HeroBackground />
      <FloatingHeroIcons />

      <Container className="relative z-10 flex w-full justify-center px-5 pt-24 pb-12 sm:px-6 sm:pt-32 sm:pb-20 lg:pt-44 lg:pb-36">
        <div className="relative mx-auto w-full max-w-5xl text-center">
          <div
            className="hero-heading-glow pointer-events-none absolute left-1/2 top-[18%] z-0 h-[min(70vw,28rem)] w-[min(90vw,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl sm:top-[22%] sm:h-[22rem] sm:w-[40rem]"
            aria-hidden
          />

          <div className="relative z-[1] w-full">
            <h1
              id="home-hero-heading"
              className="mb-6 flex w-full flex-col items-center justify-center gap-3 font-normal tracking-[-0.03em] sm:mb-7 sm:gap-4 sm:tracking-[-0.045em]"
            >
              <span className="hero-copy-in block w-full max-w-[18ch] text-center text-[clamp(1.5rem,7vw,3.75rem)] leading-[1.2] text-primary sm:max-w-none sm:whitespace-nowrap sm:leading-[1.15]">
                Redeem Rewards & Book Flights by Phone.
              </span>
              <span className="hero-copy-in block w-full max-w-[16ch] text-center text-[clamp(1.5rem,7vw,3.75rem)] leading-[1.2] text-accent sm:max-w-none sm:whitespace-nowrap sm:leading-[1.15]">
                Get Connected With Travel Experts.
              </span>
            </h1>
          </div>

          <p className="hero-copy-in relative z-[1] mx-auto mb-8 max-w-xl px-1 text-center text-base font-normal leading-relaxed text-text sm:mb-10 sm:text-lg">
            Avion Flight Reservation is an independent travel assistance service helping you book
            flights and hotels across Canada, the USA, and worldwide with 24/7 specialist support.
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
