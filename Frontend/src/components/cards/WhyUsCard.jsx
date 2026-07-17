import { WHY_US_CARD_ACCENTS } from '@/constants/sectionThemes'
import { cn } from '@/utils/cn'

export default function WhyUsCard({ item, index }) {
  const accent = WHY_US_CARD_ACCENTS[index % WHY_US_CARD_ACCENTS.length]
  const Icon = item.icon

  return (
    <article
      className={cn(
        'group h-full rounded-xl border border-border border-l-4 bg-card p-7 lg:p-8',
        'shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover',
        accent.stripe,
      )}
    >
      <div
        className={cn(
          'mb-5 flex h-11 w-11 items-center justify-center rounded-lg transition-colors duration-300',
          accent.iconBg,
        )}
      >
        <Icon className={cn('h-5 w-5', accent.icon)} aria-hidden />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-primary transition-colors duration-300 group-hover:text-accent">
        {item.title}
      </h3>
      <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
    </article>
  )
}
