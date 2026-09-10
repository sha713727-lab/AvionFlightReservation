import JsonLd from '@/modules/seoLanding/components/JsonLd'
import AboutPage from '@/modules/about/components/AboutPage'
import { getAboutPageJsonLd, getAboutPageMetadata } from '@/modules/about/page-data'

export const metadata = getAboutPageMetadata()

export default function Page() {
  return (
    <>
      <JsonLd data={getAboutPageJsonLd()} />
      <AboutPage />
    </>
  )
}
