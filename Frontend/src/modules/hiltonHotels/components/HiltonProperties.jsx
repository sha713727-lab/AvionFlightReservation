import styles from '@/modules/hiltonHotels/hiltonHotels.module.css'

export default function HiltonProperties({ properties }) {
  if (!properties.length) return null

  return (
    <section id="Hilton-properties" className={styles.section}>
      <div className={styles.wide}>
        <div className={styles.clientsIntro}>
          <h2 className={styles.clientsHeading}>Properties travelers ask about</h2>
          <p className={styles.heroIntro}>
            Independent booking help for frequently searched Hilton hotels and nearby stays—not an
            official hotel brand directory.
          </p>
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
