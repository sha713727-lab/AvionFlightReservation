import JsonLd from '@/modules/seoLanding/components/JsonLd'
import BlogPostView from '@/modules/blog/components/BlogPostView'
import { getBlogPostJsonLd, getBlogPostMetadata } from '@/modules/blog/page-data'

const SLUG = 'how-to-cancel-a-flight-and-get-a-full-refund-in-2026'

export const metadata = getBlogPostMetadata(SLUG)

export default function Page() {
  return (
    <>
      <JsonLd data={getBlogPostJsonLd(SLUG)} />
      <BlogPostView slug={SLUG} />
    </>
  )
}
