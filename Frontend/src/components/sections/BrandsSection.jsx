'use client'

import Container from '@/components/ui/Container'
import LayeredSectionHeading from '@/components/ui/LayeredSectionHeading'
import PartnerLogo from '@/components/cards/PartnerLogo'
import { COPY } from '@/constants/copy'
import { PARTNERS } from '@/constants/partners'

export default function BrandsSection() {
  return (
    <section className="overflow-hidden bg-background pt-16 pb-8 sm:pb-10" aria-labelledby="partners-heading">
      <Container>
        <LayeredSectionHeading
          titleId="partners-heading"
          watermark={COPY.partners.watermark}
          title={COPY.partners.title}
          description={COPY.partners.description}
          className="mb-10 lg:mb-14"
        />
      </Container>

      <div className="partner-marquee overflow-hidden py-2" aria-hidden>
        <div className="partner-marquee-track flex w-max items-start gap-12 px-12 sm:gap-14 sm:px-16 md:px-20">
          {PARTNERS.map((partner) => (
            <PartnerLogo key={partner.id} {...partner} decorative />
          ))}
          {PARTNERS.map((partner) => (
            <PartnerLogo key={`${partner.id}-loop`} {...partner} decorative />
          ))}
        </div>
      </div>
    </section>
  )
}
