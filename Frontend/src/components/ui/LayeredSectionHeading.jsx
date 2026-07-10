import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animations/FadeIn'
import { cn } from '@/utils/cn'

export default function LayeredSectionHeading({
  watermark,
  title,
  description,
  eyebrow,
  accentTitle,
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
    <FadeIn className={cn('group/layered mb-14 lg:mb-20 max-w-full', alignClass, className)}>
      {eyebrow && (
        <span
          className={cn(
            'relative z-10 mb-5 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em]',
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

      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="relative flex min-h-[clamp(5.5rem,12vw,8.5rem)] w-full items-center justify-center overflow-hidden px-4"
      >
        <motion.span
          aria-hidden
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2',
            'mx-auto block max-w-[94vw] select-none truncate whitespace-nowrap text-center font-semibold uppercase leading-none tracking-[-0.08em]',
            'text-[clamp(4rem,11vw,8rem)] transition-all duration-500',
            'group-hover/layered:scale-[1.03]',
            dark
              ? 'text-white/[0.045] group-hover/layered:text-white/[0.07]'
              : 'text-primary/[0.045] group-hover/layered:text-primary/[0.07]',
          )}
        >
          {watermark}
        </motion.span>

        <motion.h2
          id={accentTitle ? undefined : titleId}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
          className={cn(
            'relative z-10 font-semibold uppercase tracking-tight',
            'text-[clamp(2rem,5vw,3.25rem)] transition-colors duration-300',
            dark
              ? 'text-white group-hover/layered:text-white/90'
              : 'text-primary group-hover/layered:text-primary/85',
          )}
        >
          {title}
        </motion.h2>
      </motion.div>

      {accentTitle && (
        <motion.h2
          id={titleId}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative z-10 mt-6 font-semibold',
            dark ? 'text-secondary' : 'text-accent',
          )}
        >
          {accentTitle}
        </motion.h2>
      )}

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className={cn(
            'relative z-10 mx-auto mt-4 max-w-2xl text-base leading-relaxed transition-colors duration-300',
            dark ? 'text-white/60 group-hover/layered:text-white/70' : 'text-text-secondary group-hover/layered:text-text',
          )}
        >
          {description}
        </motion.p>
      )}
    </FadeIn>
  )
}
