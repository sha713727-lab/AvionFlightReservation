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
          <span
            className={cn(
              'inline-block h-px w-8 origin-right scale-x-100',
              dark ? 'bg-white/30' : 'bg-accent/40',
            )}
          />
          {eyebrow}
          <span
            className={cn(
              'inline-block h-px w-8 origin-left scale-x-100',
              dark ? 'bg-white/30' : 'bg-accent/40',
            )}
          />
        </span>
      )}
      <h2
        id={titleId}
        className={cn('mb-5 font-semibold', dark ? 'text-secondary' : 'text-accent')}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn('text-base leading-relaxed', dark ? 'text-white/60' : 'text-text-secondary')}
        >
          {description}
        </p>
      )}
    </FadeIn>
  )
}
