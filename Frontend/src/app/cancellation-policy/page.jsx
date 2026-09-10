import JsonLd from '@/modules/seoLanding/components/JsonLd'
import CancellationPage from '@/modules/cancellation/components/CancellationPage'
import {
  getCancellationPageJsonLd,
  getCancellationPageMetadata,
} from '@/modules/cancellation/page-data'

export const metadata = getCancellationPageMetadata()

export default function Page() {
  return (
    <>
      <JsonLd data={getCancellationPageJsonLd()} />
      <CancellationPage />
    </>
  )
}
