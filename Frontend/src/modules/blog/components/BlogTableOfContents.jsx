import { BLOG_COPY } from '@/modules/blog/constants/blogCopy'

export default function BlogTableOfContents({ items }) {
  if (!items?.length) {
    return null
  }

  return (
    <nav
      aria-label={BLOG_COPY.tocHeading}
      className="rounded-2xl border border-border bg-section-alt p-5 sm:p-6"
    >
      <p className="font-heading text-base font-semibold text-primary">{BLOG_COPY.tocHeading}</p>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-text-secondary">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
