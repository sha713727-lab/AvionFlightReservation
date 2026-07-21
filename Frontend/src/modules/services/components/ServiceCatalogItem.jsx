'use client'

import { HiArrowRight } from 'react-icons/hi'
import Button from '@/components/buttons/Button'
import { FadeIn } from '@/components/animations/FadeIn'
import ServiceMediaFrame from '@/components/media/ServiceMediaFrame'
import { COPY } from '@/constants/copy'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'
import { cn } from '@/utils/cn'

export default function ServiceCatalogItem({
  index,
  id,
  title,
  tagline,
  description,
  features,
  icon: Icon,
  image,
  imageAlt,
  mediaType = 'image',
  mediaUrl = null,
  reversed = false,
}) {
  const number = String(index + 1).padStart(2, '0')
  const callModal = useCallExpertModal()

  return (
    <article
      id={id}
      className="scroll-mt-28 py-14 lg:scroll-mt-32 lg:py-20"
    >
      <div
        className={cn(
          'grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16',
          reversed && 'lg:[&>*:first-child]:order-2',
        )}
      >
        <FadeIn direction={reversed ? 'right' : 'left'}>
          <div className="flex flex-col">
            <div className="mb-6 flex items-center gap-4">
              <span className="font-heading text-sm font-semibold tracking-[0.18em] text-accent">
                {number}
              </span>
              <span className="h-px flex-1 bg-border" aria-hidden />
              <Icon className="h-6 w-6 text-accent" aria-hidden />
            </div>

            <h3 className="mb-3 font-heading text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold tracking-tight text-primary">
              {title}
            </h3>
            <p className="mb-6 max-w-lg text-base leading-relaxed text-text-secondary">
              {tagline}
            </p>

            <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
              {COPY.services.whatYouGet}
            </p>
            <p className="mb-6 max-w-lg text-sm leading-relaxed text-text-secondary">
              {description}
            </p>

            <ul className="mb-8 space-y-3">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm leading-relaxed text-text"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>

            <div>
              <Button
                variant="primary"
                size="md"
                icon={HiArrowRight}
                iconPosition="right"
                onClick={callModal.open}
              >
                {COPY.services.getStarted}
              </Button>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction={reversed ? 'left' : 'right'} delay={0.08}>
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-section-alt shadow-card transition-transform duration-300 hover:-translate-y-1">
            <ServiceMediaFrame
              mediaType={mediaType}
              image={image}
              mediaUrl={mediaUrl}
              imageAlt={imageAlt}
              title={title}
              imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="truncate text-sm font-medium text-white">{title}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </article>
  )
}
