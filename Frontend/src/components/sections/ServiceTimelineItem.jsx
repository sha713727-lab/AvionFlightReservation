'use client'

import { HiArrowRight } from 'react-icons/hi'
import { COPY } from '@/constants/copy'
import Button from '@/components/buttons/Button'
import { FadeIn } from '@/components/animations/FadeIn'
import ServiceMediaFrame from '@/components/media/ServiceMediaFrame'
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
  mediaType = 'image',
  mediaUrl = null,
  reversed = false,
}) {
  const number = String(index + 1).padStart(2, '0')
  const callModal = useCallExpertModal()

  const details = (
    <FadeIn direction={reversed ? 'right' : 'left'} delay={0.1}>
      <div className="group/details flex flex-col gap-4 lg:gap-6">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-text-muted lg:mb-3">
            {COPY.services.whatYouGet}
          </p>
          <p className="max-w-lg text-sm leading-relaxed text-text-secondary transition-colors duration-300 group-hover/details:text-text">
            {description}
          </p>
        </div>

        <ul className="space-y-2.5 lg:space-y-3">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 text-sm text-text-secondary transition-all duration-300 hover:translate-x-1 hover:text-text"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" size="md" icon={HiArrowRight} iconPosition="right" onClick={callModal.open}>
            {COPY.services.getStarted}
          </Button>
        </div>

        <div className="group/img relative mt-2 overflow-hidden rounded-2xl border border-border transition-transform duration-300 hover:scale-[1.02]">
          <ServiceMediaFrame
            mediaType={mediaType}
            image={image}
            mediaUrl={mediaUrl}
            imageAlt={imageAlt}
            title={title}
            aspect="16 / 10"
            imageClassName="transition-transform duration-700 ease-out group-hover/img:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover/img:bg-accent/10" />
        </div>
      </div>
    </FadeIn>
  )

  return (
    <div className="relative grid grid-cols-1 items-start gap-6 py-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-10">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
        aria-hidden
      >
        <span className="relative flex h-2.5 w-2.5 items-center justify-center rounded-full bg-accent ring-4 ring-section">
          <span className="absolute inset-0 rounded-full bg-accent animate-ping-soft opacity-45" />
        </span>
      </div>

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
