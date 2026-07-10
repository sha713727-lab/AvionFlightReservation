import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { COPY } from '@/constants/copy'
import { EASE, SPRING } from '@/components/animations/motionPresets'
import Button from '@/components/buttons/Button'
import ServiceTitleHero from '@/components/sections/ServiceTitleHero'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'

export default function ServiceTimelineItem({
  index,
  title,
  tagline,
  description,
  features,
  icon,
  image,
  imageAlt,
  reversed = false,
}) {
  const number = String(index + 1).padStart(2, '0')
  const callModal = useCallExpertModal()

  const details = (
    <motion.div
      initial={{ opacity: 0, x: reversed ? -36 : 36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      className="group/details flex flex-col gap-6"
    >
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
          {COPY.services.whatYouGet}
        </p>
        <p className="max-w-lg text-sm leading-relaxed text-white/55 transition-colors duration-300 group-hover/details:text-white/70">
          {description}
        </p>
      </div>

      <ul className="space-y-3">
        {features.map((feature, featureIndex) => (
          <motion.li
            key={feature}
            initial={{ opacity: 0, x: reversed ? -12 : 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + featureIndex * 0.06, duration: 0.4, ease: EASE }}
            whileHover={{ x: reversed ? -4 : 4 }}
            className="flex items-center gap-3 text-sm text-white/70 transition-colors duration-300 hover:text-white"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            {feature}
          </motion.li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-4">
        <Button variant="primary" size="md" icon={HiArrowRight} iconPosition="right" onClick={callModal.open}>
          {COPY.services.getStarted}
        </Button>
      </div>

      <motion.div
        className="group/img relative mt-2 overflow-hidden rounded-2xl border border-white/10"
        whileHover={{ scale: 1.02 }}
        transition={SPRING}
      >
        <motion.img
          src={image}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-center"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, ease: EASE }}
        />
        <div className="absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover/img:bg-accent/10" />
      </motion.div>
    </motion.div>
  )

  return (
    <div className="relative grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
        aria-hidden
      >
        <motion.span
          className="h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-primary"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(37, 99, 235, 0.45)',
              '0 0 0 10px rgba(37, 99, 235, 0)',
              '0 0 0 0 rgba(37, 99, 235, 0)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.div>

      {reversed ? (
        <>
          <div className="order-2 lg:order-1">{details}</div>
          <div className="order-1 lg:order-2">
            <ServiceTitleHero
              number={number}
              title={title}
              tagline={tagline}
              icon={icon}
              align="right"
            />
          </div>
        </>
      ) : (
        <>
          <div className="order-1">
            <ServiceTitleHero
              number={number}
              title={title}
              tagline={tagline}
              icon={icon}
              align="left"
            />
          </div>
          <div className="order-2">{details}</div>
        </>
      )}
    </div>
  )
}
