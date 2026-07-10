import Container from '@/components/ui/Container'
import LayeredSectionHeading from '@/components/ui/LayeredSectionHeading'
import ServiceTimelineItem from '@/components/sections/ServiceTimelineItem'
import { COPY } from '@/constants/copy'
import { SERVICES } from '@/data/services'

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-primary py-24 lg:py-32"
      aria-labelledby="services-heading"
    >
      <Container>
        <LayeredSectionHeading
          titleId="services-heading"
          watermark={COPY.services.watermark}
          title={COPY.services.title}
          description={COPY.services.description}
          dark
        />

        <div className="relative">
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-accent/25"
            aria-hidden
          />

          {SERVICES.map((service, index) => (
            <ServiceTimelineItem
              key={service.id}
              index={index}
              reversed={index % 2 === 1}
              {...service}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
