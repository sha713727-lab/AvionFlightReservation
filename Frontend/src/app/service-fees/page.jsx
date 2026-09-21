import JsonLd from '@/modules/seoLanding/components/JsonLd'
import TrustPageView from '@/modules/trust/components/TrustPageView'
import ServiceFeeViewTracker from '@/modules/trust/components/ServiceFeeViewTracker'
import {
  getTrustPageContent,
  getTrustPageJsonLd,
  getTrustPageMetadata,
} from '@/modules/trust/page-data'
import { SERVICE_FEES_PATH } from '@/constants/routes'

export const metadata = getTrustPageMetadata(SERVICE_FEES_PATH)

export default function Page() {
  const content = getTrustPageContent(SERVICE_FEES_PATH)
  return (
    <>
      <ServiceFeeViewTracker />
      <JsonLd data={getTrustPageJsonLd(SERVICE_FEES_PATH)} />
      <TrustPageView content={content} />
    </>
  )
}