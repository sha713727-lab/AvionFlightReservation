import { GEO_COPY } from '@/constants/geo'

/**
 * Citation paragraphs with outbound official-policy links.
 */
export default function CitationBlock({ citations }) {
  if (!citations?.length) {
    return null
  }

  return (
    <section aria-label="Policy citations" className="space-y-4">
      {citations.map((item) => (
        <p
          key={`${item.href}-${item.linkLabel}`}
          className="text-sm leading-relaxed text-text-secondary sm:text-base"
        >
          {item.prefix}
          <a
            href={item.href}
            target="_blank"
            rel={GEO_COPY.externalLinkRel}
            className="font-medium text-accent underline-offset-2 transition-colors hover:text-accent-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {item.linkLabel}
          </a>
          {item.suffix}
        </p>
      ))}
    </section>
  )
}
