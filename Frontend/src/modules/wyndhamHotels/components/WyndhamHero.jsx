import styles from '@/modules/wyndhamHotels/wyndhamHotels.module.css'

export default function WyndhamHero({ heading, introduction }) {
  return (
    <section id="wyndham-hero" className={`${styles.section} ${styles.hero}`}>
      <div className={styles.wide}>
        <h1 className={styles.heroTitle}>{heading}</h1>
        <p className={styles.heroIntro}>{introduction}</p>
      </div>
    </section>
  )
}
