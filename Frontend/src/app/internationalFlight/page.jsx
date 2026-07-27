import InternationalFlightPage from '@/modules/internationalFlight/components/InternationalFlightPage'
import {
  getInternationalFlightPageJsonLd,
  getInternationalFlightPageMetadata,
} from '@/modules/internationalFlight/page-data'

export const metadata = getInternationalFlightPageMetadata()

export default function Page() {
  const jsonLd = getInternationalFlightPageJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InternationalFlightPage />
    </>
  )
}
