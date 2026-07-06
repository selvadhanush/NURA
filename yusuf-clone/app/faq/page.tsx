import styles from '../info.module.css';

export default function FAQPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>FAQ</h1>
          <p>Frequently Asked Questions</p>
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.contentSection}>
          <div className={styles.faqItem}>
            <h3>Why do we use WhatsApp Ordering?</h3>
            <p>
              We currently use WhatsApp as our primary ordering channel to provide a more personal and
              responsive customer experience. Unlike traditional automated checkouts, WhatsApp allows
              customers to directly interact with our team, ask questions about fragrances, receive
              recommendations based on their preferences, and confirm product availability before placing an
              order. This approach helps us maintain a closer relationship with our customers while ensuring that
              every order receives personal attention. As our brand grows, additional ordering and payment
              options may be introduced to further enhance convenience.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3>What is the difference between Synthetic and Synthesised Perfume Oils?</h3>
            <p>
              Many fragrances available in the market use low-cost synthetic ingredients that are mass-produced
              through relatively simple manufacturing processes. These ingredients are widely available and help
              reduce production costs. In contrast, synthesised perfume oils are developed through a more
              refined, carefully controlled process that requires extensive research, specialized expertise, and
              higher-quality raw materials. The production process is often longer, more complex, and
              significantly more expensive. As a result, synthesised oils are generally rarer and are valued for
              their consistency, depth, and overall fragrance experience. At NURA, we focus on quality and
              carefully select materials that align with our standards for performance and customer satisfaction.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
