import DestinationsPage from '@/modules/destinations/components/DestinationsPage'
import {
  getDestinationsPageJsonLd,
  getDestinationsPageMetadata,
} from '@/modules/destinations/page-data'

export const metadata = getDestinationsPageMetadata()

export default function Page() {
  const jsonLd = getDestinationsPageJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DestinationsPage />
    </>
  )
}
