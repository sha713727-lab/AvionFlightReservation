import JsonLd from '@/modules/seoLanding/components/JsonLd'
import GuidesHubView from '@/modules/seoLanding/components/GuidesHubView'
import { getGuidesHubJsonLd, getGuidesHubMetadata } from '@/modules/seoLanding/page-data'

export const metadata = getGuidesHubMetadata()

export default function Page() {
  return (
    <>
      <JsonLd data={getGuidesHubJsonLd()} />
      <GuidesHubView />
    </>
  )
}
