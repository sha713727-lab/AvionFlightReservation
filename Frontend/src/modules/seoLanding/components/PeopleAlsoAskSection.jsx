import LinkedCopy from '@/components/links/LinkedCopy'
import { SEO_LANDING_COPY } from '@/modules/seoLanding/constants/seoLandingCopy'

/**
 * People Also Ask block for service pages.
 * H2 section + H3 questions, direct answer first, then detail.
 */
export default function PeopleAlsoAskSection({ faqs, linkMap }) {
  if (!faqs?.length) {
    return null
  }

  return (
    <section
      className="people-also-ask faq-section scroll-mt-28"
      id="people-also-ask"
      aria-labelledby="people-also-ask-heading"
    >
      <h2
        id="people-also-ask-heading"
        className="font-heading text-xl font-semibold text-primary sm:text-2xl"
      >
        {SEO_LANDING_COPY.peopleAlsoAskHeading}
      </h2>
      <div className="mt-6 space-y-8">
        {faqs.map((faq) => (
          <article key={faq.question} className="faq-item border-b border-border pb-8 last:border-b-0 last:pb-0">
            <h3 className="font-heading text-base font-semibold text-primary sm:text-lg">
              {faq.question}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
              <LinkedCopy text={faq.answer} linkMap={linkMap} />
            </p>
            {faq.detail ? (
              <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                <LinkedCopy text={faq.detail} linkMap={linkMap} />
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}
