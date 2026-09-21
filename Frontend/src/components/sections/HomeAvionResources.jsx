import Link from 'next/link'
import Container from '@/components/ui/Container'
import LayeredSectionHeading from '@/components/ui/LayeredSectionHeading'
import { COPY } from '@/constants/copy'
import { AVION_RESOURCE_LINKS } from '@/constants/internalLinks'

/** Free Avion education + calculator links, ahead of any paid CTA (audit §8). */
export default function HomeAvionResources() {
  return (
    <section
      className="border-t border-border bg-section-alt py-14 lg:py-20"
      aria-labelledby="avion-resources-heading"
    >
      <Container>
        <LayeredSectionHeading
          titleId="avion-resources-heading"
          watermark={COPY.avionResources.watermark}
          title={COPY.avionResources.title}
          description={COPY.avionResources.description}
          className="mb-10 lg:mb-12"
        />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {AVION_RESOURCE_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span className="font-heading text-base font-semibold text-primary">
                  {item.title}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
