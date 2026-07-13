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
          <span
            className={cn(
              'inline-block h-px w-8 origin-right',
              dark ? 'bg-white/30' : 'bg-accent/40',
            )}
          />
          {eyebrow}
          <span
            className={cn(
              'inline-block h-px w-8 origin-left',
              dark ? 'bg-white/30' : 'bg-accent/40',
            )}
          />
        </span>
      )}

      <div className="relative flex min-h-[clamp(5.5rem,12vw,8.5rem)] w-full items-center justify-center overflow-hidden px-4 transition-transform duration-300 group-hover/layered:scale-[1.01]">
        <span
          aria-hidden
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
        </span>

        <h2
          id={accentTitle ? undefined : titleId}
          className={cn(
            'relative z-10 font-semibold uppercase tracking-tight',
            'text-[clamp(2rem,5vw,3.25rem)] transition-all duration-300',
            'group-hover/layered:-translate-y-0.5',
            dark
              ? 'text-white group-hover/layered:text-white/90'
              : 'text-primary group-hover/layered:text-primary/85',
          )}
        >
          {title}
        </h2>
      </div>

      {accentTitle && (
        <h2
          id={titleId}
          className={cn(
            'relative z-10 mt-6 font-semibold',
            dark ? 'text-secondary' : 'text-accent',
          )}
        >
          {accentTitle}
        </h2>
      )}

      {description && (
        <p
          className={cn(
            'relative z-10 mx-auto mt-4 max-w-2xl text-base leading-relaxed transition-colors duration-300',
            dark ? 'text-white/60 group-hover/layered:text-white/70' : 'text-text-secondary group-hover/layered:text-text',
          )}
        >
          {description}
        </p>
      )}
    </FadeIn>
  )
}
