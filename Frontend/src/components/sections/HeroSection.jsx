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
  { Icon: FaPlane, className: 'left-[8%] top-[13%] sm:left-[5%] sm:top-[10%]', delay: 0 },
  { Icon: FaGift, className: 'left-[7%] top-[31%] sm:left-[3%] sm:top-[34%]', delay: 0.15 },
  { Icon: FaUmbrellaBeach, className: 'left-[18%] top-[52%] sm:left-[11%] sm:top-[47%]', delay: 0.3, small: true },
  { Icon: MdConnectingAirports, className: 'left-[10%] top-[69%] sm:left-[7%] sm:top-[63%]', delay: 0.45, small: true },
  { Icon: FaBriefcase, className: 'left-[9%] bottom-[9%] sm:left-[4%] sm:bottom-[10%]', delay: 0.6 },
  { Icon: FaHotel, className: 'right-[9%] top-[18%] sm:right-[6%] sm:top-[15%]', delay: 0.2, small: true },
  { Icon: MdSwapHoriz, className: 'right-[6%] top-[39%] sm:right-[4%] sm:top-[29%]', delay: 0.35 },
  { Icon: MdLuggage, className: 'right-[8%] top-[64%] sm:right-[7%] sm:top-[56%]', delay: 0.5 },
  { Icon: MdConnectingAirports, className: 'right-[12%] bottom-[12%] sm:right-[5%] sm:bottom-[16%]', delay: 0.65, small: true },
]

function FloatingHeroIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
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
          <span className={`flex items-center justify-center text-accent/70 drop-shadow-md sm:text-accent ${small ? 'text-2xl sm:text-3xl lg:text-5xl' : 'text-4xl sm:text-5xl lg:text-7xl'}`}>
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
    <section className="relative min-h-screen flex items-center overflow-hidden" aria-label="Hero">
      <HeroBackground />
      <FloatingHeroIcons />

      <Container className="relative z-10 flex w-full justify-center pt-36 pb-28 lg:pt-44 lg:pb-36">
        <div className="mx-auto w-full max-w-6xl text-center">
          <FadeIn delay={0.1} className="w-full">
            <h1 className="mb-7 flex w-full flex-col items-center justify-center gap-2 font-normal tracking-[-0.045em] leading-[1.1]">
              <motion.span
                className="block w-full whitespace-nowrap text-center text-primary text-[clamp(1.05rem,4.6vw,3.75rem)]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              >
                Redeem Rewards & Book Flights by Phone.
              </motion.span>
              <motion.span
                className="block w-full whitespace-nowrap text-center text-accent text-[clamp(1.05rem,4.6vw,3.75rem)]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
              >
                Get Connected With Travel Experts.
              </motion.span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2} className="w-full">
            <p className="mx-auto mb-10 max-w-xl text-center text-base font-normal leading-relaxed text-text-secondary sm:text-lg">
              Avion Flight Reservation is an independent travel agency helping you book flights
              and hotels across Canada, the USA, and worldwide with 24/7 specialist support.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="w-full">
            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            >
              <Button variant="primary" size="lg" onClick={callModal.open}>
                {COPY.cta.bookFreeConsultation}
              </Button>
              <Button href={SERVICES_PATH} variant="secondary" size="lg" icon={HiPlay}>
                {COPY.cta.exploreServices}
              </Button>
            </motion.div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
