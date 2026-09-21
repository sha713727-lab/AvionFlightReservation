import Link from 'next/link'
import Container from '@/components/ui/Container'
import LayeredSectionHeading from '@/components/ui/LayeredSectionHeading'
import { COPY } from '@/constants/copy'
import { INDEPENDENT_SERVICE_DISCLOSURE_PATH } from '@/constants/routes'
import { SUPPLIER_MENTIONS } from '@/constants/suppliers'

/** Plain-text supplier mentions — never logos implying an unverified network. */
export default function SupplierMentionsSection() {
  return (
    <section
      className="bg-background pt-16 pb-12 sm:pb-16"
      aria-labelledby="suppliers-heading"
    >
      <Container>
        <LayeredSectionHeading
          titleId="suppliers-heading"
          watermark={COPY.suppliers.watermark}
          title={COPY.suppliers.title}
          description={COPY.suppliers.description}
          className="mb-10 lg:mb-12"
        />

        <ul className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2 sm:gap-3">
          {SUPPLIER_MENTIONS.map((name) => (
            <li
              key={name}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-text-secondary"
            >
              {name}
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-text-muted">
          {COPY.suppliers.note}{' '}
          <Link
            href={INDEPENDENT_SERVICE_DISCLOSURE_PATH}
            className="font-medium text-accent underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {COPY.suppliers.noteLinkLabel}
          </Link>
        </p>
      </Container>
    </section>
  )
}
