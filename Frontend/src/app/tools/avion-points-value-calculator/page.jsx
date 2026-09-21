import JsonLd from '@/modules/seoLanding/components/JsonLd'
import CalculatorPage from '@/modules/tools/components/CalculatorPage'
import { getCalculatorPageJsonLd, getCalculatorPageMetadata } from '@/modules/tools/page-data'

export const metadata = getCalculatorPageMetadata()

export default function Page() {
  return (
    <>
      <JsonLd data={getCalculatorPageJsonLd()} />
      <CalculatorPage />
    </>
  )
}
