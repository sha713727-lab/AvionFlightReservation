import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageRelatedLinks from '@/components/links/PageRelatedLinks'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import { BLUE_REWARDS_PATH, HOTEL_BOOKING_PATH } from '@/constants/routes'
import { BOOK_NOW_CTA_LABEL } from '@/constants/brandPageChrome'
import { getSlot } from '@/modules/blueRewards/utils/mediaSlots'
import BlueRewardsHero from '@/modules/blueRewards/components/BlueRewardsHero'
import BlueRewardsLeadPhoto from '@/modules/blueRewards/components/BlueRewardsLeadPhoto'
import BlueRewardsStory from '@/modules/blueRewards/components/BlueRewardsStory'
import BlueRewardsPhotoPair from '@/modules/blueRewards/components/BlueRewardsPhotoPair'
import BlueRewardsPrinciples from '@/modules/blueRewards/components/BlueRewardsPrinciples'
import BlueRewardsProperties from '@/modules/blueRewards/components/BlueRewardsProperties'
import BlueRewardsClients from '@/modules/blueRewards/components/BlueRewardsClients'
import BlueRewardsCompanyRail from '@/modules/blueRewards/components/BlueRewardsCompanyRail'
import BlueRewardsFaqs from '@/modules/blueRewards/components/BlueRewardsFaqs'
import BlueRewardsClosingCta from '@/modules/blueRewards/components/BlueRewardsClosingCta'
import styles from '@/modules/blueRewards/blueRewards.module.css'
import { BLUE_REWARDS_DISCLOSURE } from '@/modules/blueRewards/constants/copy'

export default function BlueRewardsPage({ page, contactEmail }) {
  const lead = getSlot(page.mediaSlots, 'lead')
  const pairALeft = getSlot(page.mediaSlots, 'pairALeft')
  const pairARight = getSlot(page.mediaSlots, 'pairARight')
  const pairBLeft = getSlot(page.mediaSlots, 'pairBLeft')
  const pairBRight = getSlot(page.mediaSlots, 'pairBRight')
  const email = page.contactEmailOverride || contactEmail || null

  return (
    <CallExpertProvider>
      <Navbar />
      <main id="main-content" className={styles.page}>
        <BlueRewardsHero
          heading={page.heroHeading}
          introduction={page.heroIntroduction}
          primaryCtaLabel={BOOK_NOW_CTA_LABEL}
          secondaryCtaLabel={page.heroSecondaryCtaLabel}
          secondaryCtaHref={page.heroSecondaryCtaHref}
          officialLinkLabel={page.officialLinkLabel}
          officialLinkHref={page.officialLinkHref}
        />
        <BlueRewardsLeadPhoto slot={lead} />
        <BlueRewardsStory
          label={page.storyLabel}
          paragraphs={page.storyParagraphs}
          ctaLabel={page.storyCtaLabel}
          ctaHref={page.storyCtaHref}
        />
        <BlueRewardsPhotoPair
          id="blue-rewards-photos-a"
          left={pairALeft}
          right={pairARight}
          variant="a"
        />
        <BlueRewardsPrinciples heading={page.principlesHeading} principles={page.principles} />
        <BlueRewardsPhotoPair
          id="blue-rewards-photos-b"
          left={pairBLeft}
          right={pairBRight}
          variant="b"
        />
        <BlueRewardsProperties properties={page.properties} />
        <BlueRewardsClients
          enabled={page.clientsEnabled}
          heading={page.clientsHeading}
          introduction={page.clientsIntroduction}
          logos={page.clientLogos}
        />
        <BlueRewardsCompanyRail
          label={page.railLabel}
          contactEmail={email}
          cards={page.railCards}
        />
        <BlueRewardsFaqs faqs={page.faqs} />
        <div className={styles.section}>
          <div className={styles.wide}>
            <p className={styles.disclosure}>{BLUE_REWARDS_DISCLOSURE}</p>
            <p className={styles.disclosure}>
              Looking for general hotel booking help? Visit our{' '}
              <a href={HOTEL_BOOKING_PATH} className={styles.storyLink}>
                hotel booking
              </a>{' '}
              page.
            </p>
          </div>
        </div>
        <BlueRewardsClosingCta contactEmail={email} />
        <PageRelatedLinks path={BLUE_REWARDS_PATH} heading="Related pages" />
      </main>
      <Footer />
    </CallExpertProvider>
  )
}
