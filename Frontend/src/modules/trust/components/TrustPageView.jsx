'use client'

import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteBreadcrumbBar from '@/components/layout/SiteBreadcrumbBar'
import Container from '@/components/ui/Container'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import { INDEPENDENT_SERVICE_DISCLOSURE } from '@/constants/disclosures'
import { CONTACT_PATH } from '@/constants/routes'

export default function TrustPageView({ content }) {
  if (!content) return null

  return (
    <CallExpertProvider>
      <Navbar />
      <SiteBreadcrumbBar path={content.path} />
      <main id="main-content" className="overflow-x-clip">
        <section className="bg-section py-16 lg:py-24" aria-labelledby="trust-page-heading">
          <Container className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">
              {content.eyebrow}
            </p>
            <h1
              id="trust-page-heading"
              className="mt-3 font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-tight text-primary"
            >
              {content.h1}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg">
              {content.intro}
            </p>
            <p
              className="mt-6 rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-text"
              role="note"
            >
              {INDEPENDENT_SERVICE_DISCLOSURE}
            </p>
          </Container>
        </section>

        <section className="bg-background py-12 lg:py-16">
          <Container className="max-w-3xl space-y-10">
            {content.sections.map((section) => (
              <article key={section.title}>
                <h2 className="font-heading text-xl font-semibold text-primary sm:text-2xl">
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="mt-3 text-base leading-relaxed text-text-secondary"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.links?.length ? (
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    {section.links.map((link) => {
                      const isExternal = link.href.startsWith('http')
                      const isTel = link.href.startsWith('tel:')
                      const className =
                        'font-medium text-accent underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
                      return (
                        <li key={link.href}>
                          {isTel ? (
                            <a href={link.href} className={className}>
                              {link.label}
                            </a>
                          ) : (
                            <Link
                              href={link.href}
                              className={className}
                              {...(isExternal
                                ? { target: '_blank', rel: 'noopener noreferrer' }
                                : {})}
                            >
                              {link.label}
                            </Link>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                ) : null}
              </article>
            ))}

            <div className="border-t border-border pt-8">
              <h2 className="font-heading text-lg font-semibold text-primary">Related</h2>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {content.related.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-medium text-accent underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={CONTACT_PATH}
                    className="font-medium text-accent underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Request assistance
                  </Link>
                </li>
              </ul>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </CallExpertProvider>
  )
}
