'use client'

import Button from '@/components/buttons/Button'
import { FadeIn } from '@/components/animations/FadeIn'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteBreadcrumbBar from '@/components/layout/SiteBreadcrumbBar'
import PageRelatedLinks from '@/components/links/PageRelatedLinks'
import Container from '@/components/ui/Container'
import { CONTACT_PATH } from '@/constants/routes'
import { getSeoPageH1 } from '@/constants/seoPageMeta'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import BlogPostCard from '@/modules/blog/components/BlogPostCard'
import { BLOG_COPY } from '@/modules/blog/constants/blogCopy'
import { BLOG_HUB, BLOG_POSTS } from '@/modules/blog/constants/blogPosts'

function BlogHubContent() {
  return (
    <>
      <Navbar />
      <SiteBreadcrumbBar path={BLOG_HUB.path} />
      <main id="main-content" className="overflow-x-clip bg-background pb-20 pt-8 lg:pt-10">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center sm:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-text-muted">
              {BLOG_COPY.hubEyebrow}
            </p>
            <h1 className="mt-4 font-heading text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-tight text-primary">
              {getSeoPageH1(BLOG_HUB.path)}
            </h1>
            <p className="speakable-summary mt-6 text-base leading-relaxed text-text-secondary sm:text-lg">
              {BLOG_COPY.hubIntro}
            </p>
          </FadeIn>

          <FadeIn delay={0.08} className="mt-12">
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {BLOG_POSTS.map((post) => (
                <li key={post.slug}>
                  <BlogPostCard post={post} />
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.12} className="mt-12 text-center">
            <Button href={CONTACT_PATH} variant="secondary" size="lg">
              {BLOG_COPY.ctaTitle}
            </Button>
          </FadeIn>
        </Container>
        <PageRelatedLinks path={BLOG_HUB.path} />
      </main>
      <Footer />
    </>
  )
}

export default function BlogHubView() {
  return (
    <CallExpertProvider>
      <BlogHubContent />
    </CallExpertProvider>
  )
}
