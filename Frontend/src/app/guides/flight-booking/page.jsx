import JsonLd from '@/modules/seoLanding/components/JsonLd'
import GuideArticleView from '@/modules/seoLanding/components/GuideArticleView'
import { getGuidePageJsonLd, getGuidePageMetadata } from '@/modules/seoLanding/page-data'

const SLUG = 'flight-booking'

export const metadata = getGuidePageMetadata(SLUG)

export default function Page() {
  return (
    <>
      <JsonLd data={getGuidePageJsonLd(SLUG)} />
      <GuideArticleView slug={SLUG} />
    </>
  )
}
