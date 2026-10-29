import {
  BLUE_REWARDS_OPTIONS_HEADING,
  BLUE_REWARDS_OPTIONS_INTRO,
} from '@/modules/blueRewards/constants/copy'
import styles from '@/modules/blueRewards/blueRewards.module.css'

export default function BlueRewardsProperties({ properties }) {
  if (!properties.length) return null

  return (
    <section id="blue-rewards-options" className={styles.section}>
      <div className={styles.wide}>
        <div className={styles.clientsIntro}>
          <h2 className={styles.clientsHeading}>{BLUE_REWARDS_OPTIONS_HEADING}</h2>
          <p className={styles.heroIntro}>{BLUE_REWARDS_OPTIONS_INTRO}</p>
        </div>
        <div className={styles.propertiesGrid}>
          {properties.map((item) => (
            <article key={item.id} className={styles.propertyCard}>
              <h3 className={styles.propertyTitle}>{item.title}</h3>
              <p className={styles.propertyBlurb}>{item.blurb}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
