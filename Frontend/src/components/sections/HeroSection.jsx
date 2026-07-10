import { motion } from 'framer-motion'
import { FaBriefcase, FaGift, FaHotel, FaPlane, FaUmbrellaBeach } from 'react-icons/fa'
import { HiPlay } from 'react-icons/hi'
import { MdConnectingAirports, MdLuggage, MdSwapHoriz } from 'react-icons/md'
import Container from '@/components/ui/Container'
import Button from '@/components/buttons/Button'
import HeroBackground from '@/components/sections/HeroBackground'
import { FadeIn } from '@/components/animations/FadeIn'
import { EASE } from '@/components/animations/motionPresets'
import { COPY } from '@/constants/copy'
import { SERVICES_PATH } from '@/constants/routes'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'

const HERO_FLOATING_ICONS = [
  { Icon: FaPlane, className: 'left-[5%] top-[10%]', delay: 0 },
  { Icon: FaGift, className: 'left-[3%] top-[34%]', delay: 0.15 },
  { Icon: FaUmbrellaBeach, className: 'left-[11%] top-[47%]', delay: 0.3, small: true },
  { Icon: MdConnectingAirports, className: 'left-[7%] top-[63%]', delay: 0.45, small: true },
  { Icon: FaBriefcase, className: 'left-[4%] bottom-[10%]', delay: 0.6 },
  { Icon: FaHotel, className: 'right-[6%] top-[15%]', delay: 0.2, small: true },
  { Icon: MdSwapHoriz, className: 'right-[4%] top-[29%]', delay: 0.35 },
  { Icon: MdLuggage, className: 'right-[7%] top-[56%]', delay: 0.5 },
  { Icon: MdConnectingAirports, className: 'right-[5%] bottom-[16%]', delay: 0.65, small: true },
]

function FloatingHeroIcons() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden md:block"
      aria-hidden
    >
      {HERO_FLOATING_ICONS.map(({ Icon, className, delay, small }) => (
        <motion.div
          key={`${className}-${delay}`}
          className={`absolute ${className}`}
          initial={{ opacity: 0, y: 16, scale: 0.86 }}
          animate={{ opacity: 1, y: [0, -12, 0], scale: 1 }}
          transition={{
            opacity: { duration: 0.55, delay, ease: EASE },
            scale: { duration: 0.55, delay, ease: EASE },
            y: { duration: 4.5, delay, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <span
            className={`flex items-center justify-center text-accent drop-shadow-md ${
              small ? 'text-3xl lg:text-5xl' : 'text-5xl lg:text-7xl'
            }`}
          >
            <Icon aria-hidden />
          </span>
        </motion.div>
      ))}
    </div>
  )
}

export default function HeroSection() {
  const callModal = useCallExpertModal()

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden" aria-label="Hero">
      <HeroBackground />
      <FloatingHeroIcons />

      <Container className="relative z-10 flex w-full justify-center px-5 pt-32 pb-24 sm:px-6 sm:pt-36 sm:pb-28 lg:pt-44 lg:pb-36">
        <div className="relative mx-auto w-full max-w-5xl text-center">
          <div
            className="hero-heading-glow pointer-events-none absolute left-1/2 top-[18%] z-0 h-[min(70vw,28rem)] w-[min(90vw,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl sm:top-[22%] sm:h-[22rem] sm:w-[40rem]"
            aria-hidden
          />

          <FadeIn delay={0.1} className="relative z-[1] w-full">
            <h1 className="mb-6 flex w-full flex-col items-center justify-center gap-3 font-normal tracking-[-0.03em] sm:mb-7 sm:gap-4 sm:tracking-[-0.045em]">
              <motion.span
                className="block w-full max-w-[18ch] text-center text-[clamp(1.5rem,7vw,3.75rem)] leading-[1.2] text-primary sm:max-w-none sm:whitespace-nowrap sm:leading-[1.15]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              >
                Redeem Rewards & Book Flights by Phone.
              </motion.span>
              <motion.span
                className="block w-full max-w-[16ch] text-center text-[clamp(1.5rem,7vw,3.75rem)] leading-[1.2] text-accent sm:max-w-none sm:whitespace-nowrap sm:leading-[1.15]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
              >
                Get Connected With Travel Experts.
              </motion.span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2} className="relative z-[1] w-full">
            <p className="mx-auto mb-8 max-w-xl px-1 text-center text-base font-normal leading-relaxed text-text-secondary sm:mb-10 sm:text-lg">
              Avion Flight Reservation is an independent travel assistance service helping you book
              flights and hotels across Canada, the USA, and worldwide with 24/7 specialist support.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="relative z-[1] w-full">
            <motion.div
              className="flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            >
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
            </motion.div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
