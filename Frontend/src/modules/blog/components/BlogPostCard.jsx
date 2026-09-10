import Link from 'next/link'
import { BLOG_COPY } from '@/modules/blog/constants/blogCopy'

export default function BlogPostCard({ post }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/40">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
        {BLOG_COPY.listingDatePrefix}{' '}
        <time dateTime={post.publishedAt}>{post.publishedLabel}</time>
        {' · '}
        {post.readTimeMinutes} {BLOG_COPY.readTimeSuffix}
      </p>
      <h2 className="mt-3 font-heading text-lg font-semibold leading-snug text-primary sm:text-xl">
        <Link
          href={post.path}
          className="transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{post.excerpt}</p>
      <Link
        href={post.path}
        className="mt-5 text-sm font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {BLOG_COPY.readArticleLabel}
      </Link>
    </article>
  )
}
