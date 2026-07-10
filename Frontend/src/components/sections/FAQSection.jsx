import Container from '@/components/ui/Container'
import LayeredSectionHeading from '@/components/ui/LayeredSectionHeading'
import Accordion from '@/components/ui/Accordion'
import CatalogStatus from '@/components/ui/CatalogStatus'
import { COPY } from '@/constants/copy'
import { SITE_NAME } from '@/constants/contact'

export default function FAQSection({ faqs = [] }) {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-section-alt" aria-labelledby="faq-heading">
      <Container className="max-w-3xl">
        <LayeredSectionHeading
          titleId="faq-heading"
          watermark={COPY.faq.watermark}
          title={COPY.faq.title}
          accentTitle={COPY.faq.accentTitle}
          description={COPY.faq.description.replace('Avion', SITE_NAME)}
        />
        {faqs.length === 0 ? (
          <CatalogStatus state="empty" />
        ) : (
          <Accordion items={faqs} />
        )}
      </Container>
    </section>
  )
}
