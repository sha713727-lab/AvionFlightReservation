'use client'

import Container from '@/components/ui/Container'
import LayeredSectionHeading from '@/components/ui/LayeredSectionHeading'
import CatalogStatus from '@/components/ui/CatalogStatus'
import { COPY } from '@/constants/copy'
import { resolveServiceVisuals } from '@/constants/serviceAssets'
import { SERVICE_CATEGORIES } from '@/modules/services/constants'
import ServiceCatalogItem from '@/modules/services/components/ServiceCatalogItem'

function getCategoryForService(serviceId) {
  return SERVICE_CATEGORIES.find((category) => category.serviceIds.includes(serviceId))
}

export default function ServicesCatalog({ services = [] }) {
  const resolvedServices = services
    .map(resolveServiceVisuals)
    .filter((item) => item.icon && (item.image || item.mediaType === 'video'))

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

        {resolvedServices.length === 0 ? (
          <CatalogStatus state="empty" />
        ) : (
          <div>
            {resolvedServices.map((service, index) => {
              const category = getCategoryForService(service.id)
              const isCategoryStart =
                category && category.serviceIds[0] === service.id

              return (
                <div
                  key={service.id}
                  id={isCategoryStart ? category.id : undefined}
                  className={isCategoryStart ? 'scroll-mt-28 lg:scroll-mt-32' : undefined}
                >
                  <ServiceCatalogItem
                    index={index}
                    reversed={index % 2 === 1}
                    {...service}
                  />
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </section>
  )
}
