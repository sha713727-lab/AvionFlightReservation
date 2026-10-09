import styles from '@/modules/hiltonHotels/hiltonHotels.module.css'

export default function HiltonHero({ heading, introduction }) {
  return (
    <section id="Hilton-hero" className={`${styles.section} ${styles.hero}`}>
      <div className={styles.wide}>
        <h1 className={styles.heroTitle}>{heading}</h1>
        <p className={styles.heroIntro}>{introduction}</p>
      </div>
    </section>
  )
}
