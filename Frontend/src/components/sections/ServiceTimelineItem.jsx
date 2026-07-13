import Image from 'next/image'
import { HiArrowRight } from 'react-icons/hi'
import { COPY } from '@/constants/copy'
import Button from '@/components/buttons/Button'
import { FadeIn } from '@/components/animations/FadeIn'
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
  reversed = false,
}) {
  const number = String(index + 1).padStart(2, '0')
  const callModal = useCallExpertModal()

  const details = (
    <FadeIn direction={reversed ? 'right' : 'left'} delay={0.1}>
      <div className="group/details flex flex-col gap-6">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
            {COPY.services.whatYouGet}
          </p>
          <p className="max-w-lg text-sm leading-relaxed text-white/55 transition-colors duration-300 group-hover/details:text-white/70">
            {description}
          </p>
        </div>

        <ul className="space-y-3">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-white"
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

        <div className="group/img relative mt-2 overflow-hidden rounded-2xl border border-white/10 transition-transform duration-300 hover:scale-[1.02]">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover/img:bg-accent/10" />
        </div>
      </div>
    </FadeIn>
  )

  return (
    <div className="relative grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
        aria-hidden
      >
        <span className="relative flex h-2.5 w-2.5 items-center justify-center rounded-full bg-accent ring-4 ring-primary">
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
