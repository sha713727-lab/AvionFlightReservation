import Link from 'next/link'
import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import BlogPostCard from '@/modules/blog/components/BlogPostCard'
import { BLOG_COPY } from '@/modules/blog/constants/blogCopy'
import { getLatestBlogPosts } from '@/modules/blog/constants/blogPosts'
import { BLOG_PATH } from '@/constants/routes'

export default function HomeLatestBlogPosts() {
  const posts = getLatestBlogPosts(3)

  return (
    <section
      id="latest-blog"
      className="border-t border-border bg-background py-14 lg:py-20"
      aria-labelledby="home-latest-blog-heading"
    >
      <Container>
        <FadeIn className="mx-auto mb-10 max-w-3xl text-center">
          <h2
            id="home-latest-blog-heading"
            className="font-heading text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-tight text-primary"
          >
            {BLOG_COPY.homeLatestTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {BLOG_COPY.homeLatestDescription}
          </p>
        </FadeIn>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <BlogPostCard post={post} />
            </li>
          ))}
        </ul>

        <FadeIn delay={0.1} className="mt-10 text-center">
          <Link
            href={BLOG_PATH}
            className="text-sm font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {BLOG_COPY.homeLatestCta}
          </Link>
        </FadeIn>
      </Container>
    </section>
  )
}
