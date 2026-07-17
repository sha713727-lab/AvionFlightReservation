import Container from '@/components/ui/Container'
import LayeredSectionHeading from '@/components/ui/LayeredSectionHeading'
import ServiceTimelineItem from '@/components/sections/ServiceTimelineItem'
import CatalogStatus from '@/components/ui/CatalogStatus'
import { COPY } from '@/constants/copy'
import { resolveServiceVisuals } from '@/constants/serviceAssets'

export default function ServicesSection({ services = [] }) {
  const resolvedServices = services
    .map(resolveServiceVisuals)
    .filter((item) => item.icon && item.image)

  if (resolvedServices.length === 0) {
    return (
      <section
        id="services"
        className="bg-section py-24 lg:py-32"
        aria-labelledby="services-heading"
      >
        <LayeredSectionHeading
          titleId="services-heading"
          watermark={COPY.services.watermark}
          title={COPY.services.title}
          description={COPY.services.description}
        />
        <CatalogStatus state="empty" />
      </section>
    )
  }

  return (
    <section
      id="services"
      className="bg-section py-24 lg:py-32"
      aria-labelledby="services-heading"
    >
      <Container>
        <LayeredSectionHeading
          titleId="services-heading"
          watermark={COPY.services.watermark}
          title={COPY.services.title}
          description={COPY.services.description}
        />

        <div className="relative">
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-accent/25"
            aria-hidden
          />

          {resolvedServices.map((service, index) => (
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
