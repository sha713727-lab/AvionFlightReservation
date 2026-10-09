import styles from '@/modules/hiltonHotels/hiltonHotels.module.css'

export default function HiltonPrinciples({ heading, principles }) {
  if (!principles.length) return null

  return (
    <section id="Hilton-principles" className={styles.section}>
      <div className={styles.wide}>
        <h2 className={styles.principlesHeading}>{heading}</h2>
        <div className={styles.principlesGrid}>
          {principles.map((item) => (
            <article key={item.id}>
              <p className={styles.principleNumber} aria-hidden>
                {item.numberLabel}.
              </p>
              <h3 className={styles.principleTitle}>{item.title}</h3>
              <p className={styles.principleBody}>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
