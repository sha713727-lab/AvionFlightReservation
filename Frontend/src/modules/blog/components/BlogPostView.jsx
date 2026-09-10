'use client'

import Button from '@/components/buttons/Button'
import AuthorBox from '@/components/geo/AuthorBox'
import SourcesSection from '@/components/geo/SourcesSection'
import { FadeIn } from '@/components/animations/FadeIn'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteBreadcrumbBar from '@/components/layout/SiteBreadcrumbBar'
import Container from '@/components/ui/Container'
import { PHONE_HREF, PHONE_NUMBER } from '@/constants/contact'
import { getSeoPageH1 } from '@/constants/seoPageMeta'
import CallExpertProvider, { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'
import BlogPostBody from '@/modules/blog/components/BlogPostBody'
import BlogPostCard from '@/modules/blog/components/BlogPostCard'
import BlogTableOfContents from '@/modules/blog/components/BlogTableOfContents'
import { BLOG_COPY } from '@/modules/blog/constants/blogCopy'
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/modules/blog/constants/blogPosts'

function BlogPostContent({ slug }) {
  const post = getBlogPostBySlug(slug)
  const callModal = useCallExpertModal()
  const related = post ? getRelatedBlogPosts(post) : []

  if (!post) {
    return null
  }

  return (
    <>
      <Navbar />
      <SiteBreadcrumbBar path={post.path} />
      <main id="main-content" className="overflow-x-clip bg-background pb-20 pt-8 lg:pt-10">
        <Container className="max-w-3xl">
          <article>
            <FadeIn>
              <h1 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-tight text-primary">
                {getSeoPageH1(post.path)}
              </h1>
              <div className="mt-5 space-y-1 text-sm text-text-muted">
                <p>
                  {BLOG_COPY.publishedLabel}{' '}
                  <time dateTime={post.publishedAt}>{post.publishedLabel}</time>
                  {' · '}
                  {post.readTimeMinutes} {BLOG_COPY.readTimeSuffix}
                </p>
              </div>
              <AuthorBox updatedLabel={post.updatedLabel} updatedIso={post.updatedAt} />
            </FadeIn>

            {post.showToc ? (
              <FadeIn delay={0.06} className="mt-8">
                <BlogTableOfContents items={post.toc} />
              </FadeIn>
            ) : null}

            <FadeIn delay={0.1} className="mt-10">
              <BlogPostBody blocks={post.blocks} />
            </FadeIn>

            {post.faqs?.length ? (
              <FadeIn delay={0.12} className="mt-12">
                <h2 className="font-heading text-xl font-semibold text-primary">
                  {BLOG_COPY.faqHeading}
                </h2>
                <dl className="mt-5 space-y-5">
                  {post.faqs.map((faq) => (
                    <div key={faq.question}>
                      <dt className="font-heading text-base font-semibold text-primary">{faq.question}</dt>
                      <dd className="faq-answer mt-2 text-sm leading-relaxed text-text-secondary sm:text-base">
                        {faq.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </FadeIn>
            ) : null}

            <FadeIn delay={0.13} className="mt-12">
              <SourcesSection sources={post.sources} />
            </FadeIn>
          </article>

          <FadeIn delay={0.14} className="mt-14 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <h2 className="font-heading text-xl font-semibold text-primary">{BLOG_COPY.ctaTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">
              {BLOG_COPY.ctaDescription}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={PHONE_HREF} variant="primary" size="lg">
                {BLOG_COPY.ctaPhoneLabel} · {PHONE_NUMBER}
              </Button>
              <Button variant="secondary" size="lg" onClick={callModal.open}>
                {BLOG_COPY.ctaCallbackLabel}
              </Button>
            </div>
          </FadeIn>

          {related.length ? (
            <FadeIn delay={0.16} className="mt-14">
              <h2 className="font-heading text-xl font-semibold text-primary">{BLOG_COPY.relatedHeading}</h2>
              <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <BlogPostCard post={item} />
                  </li>
                ))}
              </ul>
            </FadeIn>
          ) : null}
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default function BlogPostView({ slug }) {
  return (
    <CallExpertProvider>
      <BlogPostContent slug={slug} />
    </CallExpertProvider>
  )
}
