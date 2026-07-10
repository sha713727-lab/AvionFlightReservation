import { motion } from 'framer-motion'
import { FaPhone } from 'react-icons/fa'
import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { SPRING_SNAPPY } from '@/components/animations/motionPresets'
import { COPY } from '@/constants/copy'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'

export default function RedeemCtaSection() {
  const callModal = useCallExpertModal()

  return (
    <section id="redeem-cta" className="bg-section-alt py-16 lg:py-20" aria-labelledby="redeem-cta-heading">
      <Container>
        <FadeIn className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-primary px-6 py-16 text-center sm:px-10 lg:px-14 lg:py-20">
            <h2
              id="redeem-cta-heading"
              className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight text-white"
            >
              {COPY.redeemCta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 lg:text-lg">
              {COPY.redeemCta.description}
            </p>

            <motion.button
              type="button"
              onClick={callModal.open}
              className="mt-8 inline-flex w-full max-w-md items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-primary shadow-lg shadow-primary/30 transition-colors hover:bg-white/95 sm:w-auto lg:text-lg"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={SPRING_SNAPPY}
            >
              <FaPhone className="h-4 w-4 shrink-0" aria-hidden />
              {COPY.cta.talkWithExpert}
            </motion.button>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
