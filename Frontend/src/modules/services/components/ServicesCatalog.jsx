'use client'

import Container from '@/components/ui/Container'
import LayeredSectionHeading from '@/components/ui/LayeredSectionHeading'
import { COPY } from '@/constants/copy'
import { SERVICES } from '@/data/services'
import { SERVICE_CATEGORIES } from '@/modules/services/constants'
import ServiceCatalogItem from '@/modules/services/components/ServiceCatalogItem'

function getCategoryForService(serviceId) {
  return SERVICE_CATEGORIES.find((category) => category.serviceIds.includes(serviceId))
}

export default function ServicesCatalog() {
  return (
    <section
      id="service-catalog"
      className="scroll-mt-24 bg-background py-20 lg:py-28"
      aria-labelledby="services-catalog-heading"
    >
      <Container>
        <LayeredSectionHeading
          titleId="services-catalog-heading"
          watermark={COPY.services.watermark}
          title={COPY.services.catalogTitle}
          description={COPY.services.catalogDescription}
          eyebrow={COPY.services.catalogEyebrow}
        />

        <div>
          {SERVICES.map((service, index) => {
            const category = getCategoryForService(service.id)
            const isCategoryStart =
              category && category.serviceIds[0] === service.id

            return (
              <div key={service.id}>
                {isCategoryStart && (
                  <div
                    id={category.id}
                    className="scroll-mt-28 pb-2 pt-6 lg:scroll-mt-32 lg:pt-8"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                      {category.title}
                    </p>
                  </div>
                )}
                <ServiceCatalogItem
                  index={index}
                  reversed={index % 2 === 1}
                  {...service}
                />
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
