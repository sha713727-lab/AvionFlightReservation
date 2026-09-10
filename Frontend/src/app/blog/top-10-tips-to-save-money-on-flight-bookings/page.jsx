import JsonLd from '@/modules/seoLanding/components/JsonLd'
import BlogPostView from '@/modules/blog/components/BlogPostView'
import { getBlogPostJsonLd, getBlogPostMetadata } from '@/modules/blog/page-data'

const SLUG = 'top-10-tips-to-save-money-on-flight-bookings'

export const metadata = getBlogPostMetadata(SLUG)

export default function Page() {
  return (
    <>
      <JsonLd data={getBlogPostJsonLd(SLUG)} />
      <BlogPostView slug={SLUG} />
    </>
  )
}
