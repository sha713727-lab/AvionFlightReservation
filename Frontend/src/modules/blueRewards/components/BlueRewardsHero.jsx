'use client'

import Button from '@/components/buttons/Button'
import { CTA_PLACEMENT } from '@/constants/analytics'
import { SERVICE_FEES_PATH } from '@/constants/routes'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'
import { BLUE_REWARDS_HERO_INDEPENDENCE_NOTE } from '@/modules/blueRewards/constants/copy'
import styles from '@/modules/blueRewards/blueRewards.module.css'
import ctaStyles from '@/modules/blueRewards/blueRewardsCta.module.css'

function splitIntro(introduction) {
  return introduction
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)
}

export default function BlueRewardsHero({
  heading,
  introduction,
  primaryCtaLabel,
  secondaryCtaLabel,
  secondaryCtaHref,
  officialLinkLabel,
  officialLinkHref,
}) {
  const callModal = useCallExpertModal()
  const paragraphs = splitIntro(introduction)
  const secondaryHref = secondaryCtaHref || SERVICE_FEES_PATH

  return (
    <section id="blue-rewards-hero" className={`${styles.section} ${styles.hero}`}>
      <div className={styles.wide}>
        <h1 className={styles.heroTitle}>{heading}</h1>
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 48)}
            className={`${styles.heroIntro} ${ctaStyles.heroIntroStack}`}
          >
            {paragraph}
          </p>
        ))}
        <div className={ctaStyles.heroActions}>
          <Button
            variant="primary"
            size="lg"
            onClick={() => callModal.open(CTA_PLACEMENT.pageHero)}
          >
            {primaryCtaLabel}
          </Button>
          <Button href={secondaryHref} variant="secondary" size="lg">
            {secondaryCtaLabel}
          </Button>
        </div>
        <p className={ctaStyles.heroNote}>{BLUE_REWARDS_HERO_INDEPENDENCE_NOTE}</p>
        {officialLinkHref && officialLinkLabel ? (
          <a
            href={officialLinkHref}
            className={ctaStyles.heroOfficial}
            target="_blank"
            rel="noopener noreferrer"
          >
            {officialLinkLabel}
          </a>
        ) : null}
      </div>
    </section>
  )
}
