import Link from 'next/link'
import Container from '@/components/ui/Container'
import LayeredSectionHeading from '@/components/ui/LayeredSectionHeading'
import { COPY } from '@/constants/copy'
import { SERVICE_FEES_PATH } from '@/constants/routes'

/** Fee disclosure ahead of conversion — quote-based, no invented pricing (audit §8). */
export default function HomeFeeTransparency() {
  return (
    <section
      className="border-t border-border bg-section py-14 lg:py-20"
      aria-labelledby="fee-transparency-heading"
    >
      <Container>
        <LayeredSectionHeading
          titleId="fee-transparency-heading"
          watermark={COPY.feeTransparency.watermark}
          title={COPY.feeTransparency.title}
          description={COPY.feeTransparency.description}
          className="mb-10 lg:mb-12"
        />

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {COPY.feeTransparency.items.map((item) => (
            <li
              key={item.id}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-5"
            >
              <span className="font-heading text-base font-semibold text-primary">
                {item.title}
              </span>
              <span className="mt-2 text-sm leading-relaxed text-text-secondary">
                {item.description}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center">
          <Link
            href={SERVICE_FEES_PATH}
            className="text-sm font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {COPY.feeTransparency.ctaLabel}
          </Link>
        </p>
      </Container>
    </section>
  )
}
