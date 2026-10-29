'use client'

import Button from '@/components/buttons/Button'
import { CTA_PLACEMENT } from '@/constants/analytics'
import {
  PHONE_HREF,
  PHONE_NUMBER,
  RESERVATION_EMAIL,
  RESERVATION_EMAIL_HREF,
} from '@/constants/contact'
import { SERVICE_FEES_PATH } from '@/constants/routes'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'
import { BOOK_NOW_CTA_LABEL } from '@/constants/brandPageChrome'
import {
  BLUE_REWARDS_CLOSING_HOURS_NOTE,
  BLUE_REWARDS_CLOSING_SECONDARY_LABEL,
} from '@/modules/blueRewards/constants/copy'
import styles from '@/modules/blueRewards/blueRewards.module.css'
import ctaStyles from '@/modules/blueRewards/blueRewardsCta.module.css'

export default function BlueRewardsClosingCta({ contactEmail }) {
  const callModal = useCallExpertModal()
  const email = contactEmail || RESERVATION_EMAIL

  return (
    <section
      id="blue-rewards-closing-cta"
      className={`${styles.section} ${ctaStyles.closingCta}`}
      aria-labelledby="blue-rewards-closing-heading"
    >
      <div className={styles.editorial}>
        <h2 id="blue-rewards-closing-heading" className={ctaStyles.closingTitle}>
          Ready for clearer Blue Rewards travel help?
        </h2>
        <div className={ctaStyles.heroActions}>
          <Button
            variant="primary"
            size="lg"
            onClick={() => callModal.open(CTA_PLACEMENT.pageCta)}
          >
            {BOOK_NOW_CTA_LABEL}
          </Button>
          <Button href={SERVICE_FEES_PATH} variant="secondary" size="lg">
            {BLUE_REWARDS_CLOSING_SECONDARY_LABEL}
          </Button>
        </div>
        <p className={ctaStyles.closingContact}>
          Call AvioSupportDesk:{' '}
          <a href={PHONE_HREF}>{PHONE_NUMBER}</a>
          <br />
          Email:{' '}
          <a href={email === RESERVATION_EMAIL ? RESERVATION_EMAIL_HREF : `mailto:${email}`}>
            {email}
          </a>
          <br />
          {BLUE_REWARDS_CLOSING_HOURS_NOTE}
        </p>
      </div>
    </section>
  )
}
