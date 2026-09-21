import JsonLd from '@/modules/seoLanding/components/JsonLd'
import TrustPageView from '@/modules/trust/components/TrustPageView'
import {
  getTrustPageContent,
  getTrustPageJsonLd,
  getTrustPageMetadata,
} from '@/modules/trust/page-data'
import { HOW_IT_WORKS_PATH } from '@/constants/routes'

export const metadata = getTrustPageMetadata(HOW_IT_WORKS_PATH)

export default function Page() {
  const content = getTrustPageContent(HOW_IT_WORKS_PATH)
  return (
    <>
      <JsonLd data={getTrustPageJsonLd(HOW_IT_WORKS_PATH)} />
      <TrustPageView content={content} />
    </>
  )
}
