import RefundPage from '@/modules/refund/components/RefundPage'
import { getRefundPageJsonLd, getRefundPageMetadata } from '@/modules/refund/page-data'

export const metadata = getRefundPageMetadata()

export default function Page() {
  const jsonLd = getRefundPageJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RefundPage />
    </>
  )
}
