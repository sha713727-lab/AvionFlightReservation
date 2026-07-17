import { FadeIn } from '@/components/animations/FadeIn'
import { cn } from '@/utils/cn'

export default function ServiceTitleHero({ number, title, tagline, icon: Icon, align = 'left' }) {
  const isRight = align === 'right'

  return (
    <FadeIn direction={isRight ? 'right' : 'left'}>
      <div
        className={cn(
          'relative flex flex-col justify-center py-2 lg:min-h-[240px] lg:py-6',
          isRight ? 'items-end text-right' : 'items-start text-left',
        )}
      >
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute bottom-0 select-none font-semibold leading-none text-primary/[0.06]',
            'text-[clamp(4rem,14vw,8rem)]',
            isRight ? 'right-0' : 'left-0',
          )}
        >
          {number}
        </span>

        <Icon
          className="relative mb-3 h-10 w-10 text-accent lg:mb-5 lg:h-14 lg:w-14"
          aria-hidden
        />

        <h3
          className={cn(
            'relative mb-2 max-w-full font-semibold leading-tight tracking-tight text-primary lg:mb-4',
            'text-[clamp(1.5rem,4vw,3.25rem)]',
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
