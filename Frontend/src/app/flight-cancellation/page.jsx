import JsonLd from '@/modules/seoLanding/components/JsonLd'
import ServiceLandingView from '@/modules/seoLanding/components/ServiceLandingView'
import { getServicePageJsonLd, getServicePageMetadata } from '@/modules/seoLanding/page-data'

const SLUG = 'flight-cancellation'

export const metadata = getServicePageMetadata(SLUG)

export default function Page() {
  return (
    <>
      <JsonLd data={getServicePageJsonLd(SLUG)} />
      <ServiceLandingView slug={SLUG} />
    </>
  )
}
