import { FadeIn } from '@/components/animations/FadeIn'
import { cn } from '@/utils/cn'

export default function ServiceTitleHero({ number, title, tagline, icon: Icon, align = 'left' }) {
  const isRight = align === 'right'

  return (
    <FadeIn direction={isRight ? 'right' : 'left'}>
      <div
        className={cn(
          'relative flex min-h-[260px] flex-col justify-center py-8 lg:min-h-[320px] lg:py-10',
          isRight ? 'items-end text-right' : 'items-start text-left',
        )}
      >
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute bottom-0 select-none font-semibold leading-none text-primary/[0.06]',
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
            'relative mb-4 max-w-full font-semibold leading-tight tracking-tight text-primary',
            'text-[clamp(1.875rem,4vw,3.25rem)]',
            isRight ? 'text-right' : 'text-left',
          )}
        >
          {title}
        </h3>

        <p className="relative max-w-sm text-sm leading-relaxed text-text-secondary">{tagline}</p>
      </div>
    </FadeIn>
  )
}
