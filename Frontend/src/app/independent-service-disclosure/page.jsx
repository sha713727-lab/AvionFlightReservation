import JsonLd from '@/modules/seoLanding/components/JsonLd'
import TrustPageView from '@/modules/trust/components/TrustPageView'
import {
  getTrustPageContent,
  getTrustPageJsonLd,
  getTrustPageMetadata,
} from '@/modules/trust/page-data'
import { INDEPENDENT_SERVICE_DISCLOSURE_PATH } from '@/constants/routes'

export const metadata = getTrustPageMetadata(INDEPENDENT_SERVICE_DISCLOSURE_PATH)

export default function Page() {
  const content = getTrustPageContent(INDEPENDENT_SERVICE_DISCLOSURE_PATH)
  return (
    <>
      <JsonLd data={getTrustPageJsonLd(INDEPENDENT_SERVICE_DISCLOSURE_PATH)} />
      <TrustPageView content={content} />
    </>
  )
}
