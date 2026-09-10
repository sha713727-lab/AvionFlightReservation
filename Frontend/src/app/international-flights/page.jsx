import JsonLd from '@/modules/seoLanding/components/JsonLd'
import InternationalFlightPage from '@/modules/internationalFlight/components/InternationalFlightPage'
import {
  getInternationalFlightPageJsonLd,
  getInternationalFlightPageMetadata,
} from '@/modules/internationalFlight/page-data'

export const metadata = getInternationalFlightPageMetadata()

export default function Page() {
  return (
    <>
      <JsonLd data={getInternationalFlightPageJsonLd()} />
      <InternationalFlightPage />
    </>
  )
}
