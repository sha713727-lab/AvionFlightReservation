import JsonLd from '@/modules/seoLanding/components/JsonLd'
import BlueRewardsPage from '@/modules/blueRewards/components/BlueRewardsPage'
import {
  getBlueRewardsPageJsonLd,
  getBlueRewardsPageMetadata,
  loadBlueRewardsPage,
} from '@/modules/blueRewards/page-data'
import { RESERVATION_EMAIL } from '@/constants/contact'

/** CMS-backed page — refresh shortly after admin publish. */
export const revalidate = 60

export async function generateMetadata() {
  return getBlueRewardsPageMetadata()
}

export default async function Page() {
  const page = await loadBlueRewardsPage()
  const jsonLd = await getBlueRewardsPageJsonLd()

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlueRewardsPage page={page} contactEmail={RESERVATION_EMAIL} />
    </>
  )
}
