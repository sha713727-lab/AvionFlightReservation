import JsonLd from '@/modules/seoLanding/components/JsonLd'
import BlogPostView from '@/modules/blog/components/BlogPostView'
import { getBlogPostJsonLd, getBlogPostMetadata } from '@/modules/blog/page-data'

const SLUG = 'airlines-customer-service-numbers-complete-contact-guide'

export const metadata = getBlogPostMetadata(SLUG)

export default function Page() {
  return (
    <>
      <JsonLd data={getBlogPostJsonLd(SLUG)} />
      <BlogPostView slug={SLUG} />
    </>
  )
}
