import Link from 'next/link'
import { SEO_LANDING_COPY } from '@/modules/seoLanding/constants/seoLandingCopy'

export default function RelatedServices({ items }) {
  if (!items?.length) {
    return null
  }

  return (
    <section
      className="related-services mt-14 scroll-mt-28"
      aria-labelledby="related-services-heading"
    >
      <h2
        id="related-services-heading"
        className="font-heading text-xl font-semibold text-primary sm:text-2xl"
      >
        {SEO_LANDING_COPY.relatedServicesHeading}
      </h2>
      <div className="related-grid mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/40 hover:bg-section-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <h3 className="font-heading text-base font-semibold text-primary transition-colors group-hover:text-accent">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>
            <span className="mt-3 inline-block text-sm font-medium text-accent">{item.anchor}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
