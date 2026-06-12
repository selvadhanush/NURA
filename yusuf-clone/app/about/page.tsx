import styles from './page.module.css';

export default function About() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>ABOUT NURΛ</h1>
          <p>More than a fragrance. An Identity.</p>
        </div>
      </div>
      
      <div className={styles.container}>
        <section className={styles.section}>
          <h2>THE ESSENCE OF NURΛ</h2>
          <p>
            At NURΛ by Bin Sadhik, we believe that fragrance is more than an accessory—it is a lingering presence, a silent storyteller, and an indelible signature of your character. Born from a legacy of fine scent-making, we craft premium Perfume Oils (6ml & 12ml) and Signature Perfumes (50ml & 100ml) using only the most exquisite ingredients.
          </p>
          <p>
            Each perfume in our collections is designed to balance longevity, complexity, and refinement, offering fragrances that evolve beautifully throughout the day and night.
          </p>
        </section>

        <section className={styles.section}>
          <h2>PURIFICATION OF TRADE</h2>
          <p>
            We don't view giving back as charity; we view it as a Purification of Trade. Every transaction completes the Circle of Light. We donate exactly 2.5% of all our profits to charity, transforming luxury into a dynamic force for restoration and hope.
          </p>
          <p>
            With NURΛ, your purchase does not just elevate your senses—it brightens a future and shares the light.
          </p>

          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>THE CRAFT</h3>
              <p>Hand-selected ingredients, premium natural oils, and meticulous blending processes define our fragrance curation.</p>
            </div>
            <div className={styles.card}>
              <h3>THE LIGHT</h3>
              <p>2.5% of profits go directly to charity, making luxury a medium for positive change and brighter futures.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
