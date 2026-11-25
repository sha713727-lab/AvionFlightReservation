import Link from 'next/link'
import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { HOME_CATEGORY_SECTIONS } from '@/constants/homeCategories'

export default function HomeCategorySections() {
  return (
    <section
      className="border-t border-border bg-background py-14 lg:py-20"
      aria-label="Travel assistance categories"
    >
      <Container>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {HOME_CATEGORY_SECTIONS.map((category, index) => (
            <li key={category.id}>
              <FadeIn delay={index * 0.04}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 lg:p-7">
                  <h2 className="font-heading text-xl font-semibold tracking-tight text-primary lg:text-2xl">
                    {category.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary lg:text-base">
                    {category.description}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2">
                    {category.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm font-semibold text-accent underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              </FadeIn>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
