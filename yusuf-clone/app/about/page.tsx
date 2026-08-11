import styles from './page.module.css';

export default function About() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>ABOUT US</h1>
          <p className={styles.subtitle}>NURA BY BIN SADHIK</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.editorialQuote}>
          <blockquote>
            "There is a difference between a fragrance that is made and one that is found."
          </blockquote>
        </div>

        <section className={styles.section}>
          <p className={styles.paragraph}>
            At NURA, we do not manufacture scent. We curate it seeking out the rarest oils and attars from the hands that still know how to create them the way they were always meant to be created by proper extraction, not engineering. Drawn patiently from nature before assembled in a lab. It is a process few have the patience, skill, or heritage to master, which is why the artisans we work with are among a handful left, in the nation and in the world, who still practice this craft in its truest form.
          </p>

          <p className={styles.paragraph}>
            This is what sets NURA apart. While much of the industry has moved toward speed and synthetic shortcuts, we have moved in the opposite direction, toward depth, toward origin, toward oils that carry the weight of time and mastery in every drop. Every bottle we place our name on has been sourced, tested, and selected with the same discernment a jeweler brings to a rare stone. True luxury is never crafted, it is unveiled.
          </p>

          <div className={styles.highlightBanner}>
            <p className={styles.highlightText}>
              We are not a factory. We are a house of curation acting as a bridge between the world's finest perfume artisans and those who refuse to wear the ordinary.
            </p>
          </div>

          <div className={styles.identityTagline}>
            <h2>NURA BY BIN SADHIK</h2>
            <span className={styles.taglineSub}>MORE THAN FRAGRANCE, AN IDENTITY.</span>
          </div>
        </section>
      </div>
    </div>
  );
}
