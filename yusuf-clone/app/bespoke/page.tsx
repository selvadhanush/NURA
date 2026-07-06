import styles from '../info.module.css';

export default function BespokePage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>BESPOKE EXPERIENCE</h1>
          <p>A personalized fragrance journey tailored for you</p>
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.contentSection}>
          <h2>Bespoke Experience</h2>
          <p>
            Our Bespoke Experience is designed for customers who seek a more personalized fragrance
            journey. Every individual has unique preferences, memories, and fragrance expectations, and our
            bespoke approach focuses on understanding those preferences in greater detail.
          </p>
          <div className={styles.highlightBox}>
            <p>
              Customers may discuss scent families, fragrance inspirations, occasions, lifestyle preferences, and other relevant factors with our team. Based on these discussions, suitable fragrance recommendations or tailored experiences may be provided.
            </p>
          </div>
          <p>
            The Bespoke Experience is intended to create a deeper connection between the customer and fragrance, transforming the selection process into a more meaningful and memorable experience.
          </p>
        </section>
      </div>
    </div>
  );
}
