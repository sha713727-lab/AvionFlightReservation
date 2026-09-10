import Link from 'next/link'
import Container from '@/components/ui/Container'
import { getPageRelatedLinks } from '@/constants/internalLinks'

export default function PageRelatedLinks({ path, heading = 'Related pages' }) {
  const links = getPageRelatedLinks(path)
  if (!links?.length) {
    return null
  }

  return (
    <section
      className="border-t border-border bg-section py-12 lg:py-14"
      aria-labelledby="page-related-links-heading"
    >
      <Container>
        <h2
          id="page-related-links-heading"
          className="font-heading text-lg font-semibold text-primary sm:text-xl"
        >
          {heading}
        </h2>
        <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
