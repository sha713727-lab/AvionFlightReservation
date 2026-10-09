import JsonLd from '@/modules/seoLanding/components/JsonLd'
import WyndhamHotelsPage from '@/modules/wyndhamHotels/components/WyndhamHotelsPage'
import {
  getWyndhamPageJsonLd,
  getWyndhamPageMetadata,
  loadWyndhamPage,
} from '@/modules/wyndhamHotels/page-data'
import { RESERVATION_EMAIL } from '@/constants/contact'

/** CMS-backed page — refresh shortly after admin publish. */
export const revalidate = 60

export async function generateMetadata() {
  return getWyndhamPageMetadata()
}

export default async function Page() {
  const page = await loadWyndhamPage()
  const jsonLd = await getWyndhamPageJsonLd()

  return (
    <>
      <JsonLd data={jsonLd} />
      <WyndhamHotelsPage page={page} contactEmail={RESERVATION_EMAIL} />
    </>
  )
}
