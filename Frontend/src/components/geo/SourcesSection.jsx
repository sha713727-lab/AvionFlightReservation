import { GEO_COPY } from '@/constants/geo'

/**
 * Sources / References list for informational pages.
 */
export default function SourcesSection({ sources }) {
  if (!sources?.length) {
    return null
  }

  return (
    <section
      id="sources"
      className="scroll-mt-28 border-t border-border pt-10"
      aria-labelledby="sources-heading"
    >
      <h2 id="sources-heading" className="font-heading text-xl font-semibold text-primary sm:text-2xl">
        {GEO_COPY.sourcesHeading}
      </h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-text-secondary sm:text-base">
        {sources.map((source) => (
          <li key={source.href} className="pl-1">
            <a
              href={source.href}
              target="_blank"
              rel={GEO_COPY.externalLinkRel}
              className="font-medium text-accent underline-offset-2 transition-colors hover:text-accent-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {source.label}
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
