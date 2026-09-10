import JsonLd from '@/modules/seoLanding/components/JsonLd'
import BlogHubView from '@/modules/blog/components/BlogHubView'
import { getBlogHubJsonLd, getBlogHubMetadata } from '@/modules/blog/page-data'

export const metadata = getBlogHubMetadata()

export default function Page() {
  return (
    <>
      <JsonLd data={getBlogHubJsonLd()} />
      <BlogHubView />
    </>
  )
}
