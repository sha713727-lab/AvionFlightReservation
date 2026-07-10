import CancellationPage from '@/modules/cancellation/components/CancellationPage'
import {
  getCancellationPageJsonLd,
  getCancellationPageMetadata,
} from '@/modules/cancellation/page-data'

export const metadata = getCancellationPageMetadata()

export default function Page() {
  const jsonLd = getCancellationPageJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CancellationPage />
    </>
  )
}
