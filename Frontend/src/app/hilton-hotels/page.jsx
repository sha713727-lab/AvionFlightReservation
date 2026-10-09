import JsonLd from '@/modules/seoLanding/components/JsonLd'
import HiltonHotelsPage from '@/modules/hiltonHotels/components/HiltonHotelsPage'
import {
  getHiltonPageJsonLd,
  getHiltonPageMetadata,
  loadHiltonPage,
} from '@/modules/hiltonHotels/page-data'
import { RESERVATION_EMAIL } from '@/constants/contact'

/** CMS-backed page — refresh shortly after admin publish. */
export const revalidate = 60

export async function generateMetadata() {
  return getHiltonPageMetadata()
}

export default async function Page() {
  const page = await loadHiltonPage()
  const jsonLd = await getHiltonPageJsonLd()

  return (
    <>
      <JsonLd data={jsonLd} />
      <HiltonHotelsPage page={page} contactEmail={RESERVATION_EMAIL} />
    </>
  )
}
