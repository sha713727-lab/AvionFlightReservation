import { motion } from 'framer-motion'
import { EASE } from '@/components/animations/motionPresets'
import { cn } from '@/utils/cn'

export default function ServiceTitleHero({ number, title, tagline, icon: Icon, align = 'left' }) {
  const isRight = align === 'right'

  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 24 : -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: EASE }}
      className={cn(
        'relative flex min-h-[260px] flex-col justify-center py-8 lg:min-h-[320px] lg:py-10',
        isRight ? 'items-end text-right' : 'items-start text-left',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute bottom-0 select-none font-semibold leading-none text-white/[0.04]',
          'text-[clamp(5rem,16vw,9rem)]',
          isRight ? 'right-0' : 'left-0',
        )}
      >
        {number}
      </span>

      <Icon
        className="relative mb-6 h-12 w-12 text-accent lg:h-14 lg:w-14"
        aria-hidden
      />

      <h3
        className={cn(
          'relative mb-4 max-w-full font-semibold leading-tight tracking-tight text-white',
          'text-[clamp(1.875rem,4vw,3.25rem)]',
          isRight ? 'text-right' : 'text-left',
        )}
      >
        {title}
      </h3>

      <p className="relative max-w-sm text-sm leading-relaxed text-white/50">{tagline}</p>
    </motion.div>
  )
}
