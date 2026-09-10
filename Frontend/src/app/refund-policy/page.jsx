import JsonLd from '@/modules/seoLanding/components/JsonLd'
import RefundPage from '@/modules/refund/components/RefundPage'
import { getRefundPageJsonLd, getRefundPageMetadata } from '@/modules/refund/page-data'

export const metadata = getRefundPageMetadata()

export default function Page() {
  return (
    <>
      <JsonLd data={getRefundPageJsonLd()} />
      <RefundPage />
    </>
  )
}
