import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animations/FadeIn'
import { cn } from '@/utils/cn'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  dark = false,
  titleId,
}) {
  const alignClass = {
    center: 'text-center mx-auto',
    left: 'text-left',
  }[align]

  return (
    <FadeIn className={cn('mb-14 lg:mb-20 max-w-2xl', alignClass, className)}>
      {eyebrow && (
        <span
          className={cn(
            'mb-5 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em]',
            align === 'center' && 'justify-center',
            dark ? 'text-white/50' : 'text-text-muted',
          )}
        >
          <motion.span
            className={cn('h-px w-8', dark ? 'bg-white/30' : 'bg-accent/40')}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: align === 'center' ? 1 : 0 }}
          />
          {eyebrow}
          <motion.span
            className={cn('h-px w-8', dark ? 'bg-white/30' : 'bg-accent/40')}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: align === 'center' ? 0 : 1 }}
          />
        </span>
      )}
      <motion.h2
        id={titleId}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn('mb-5 font-semibold', dark ? 'text-secondary' : 'text-accent')}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className={cn('text-base leading-relaxed', dark ? 'text-white/60' : 'text-text-secondary')}
        >
          {description}
        </motion.p>
      )}
    </FadeIn>
  )
}
