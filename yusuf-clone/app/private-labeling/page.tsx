import styles from '../info.module.css';

export default function PrivateLabelingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>PRIVATE LABELING</h1>
          <p>Launch your premium fragrance brand</p>
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.contentSection}>
          <h2>Private Labeling Solutions</h2>
          <p>
            NURA offers private labeling solutions for businesses, entrepreneurs, retailers, and organizations
            seeking to develop fragrance products under their own brand identity. Our private labeling services
            are designed to simplify the process of launching premium fragrance products while maintaining
            professional quality standards.
          </p>
          <div className={styles.highlightBox}>
            <p>
              Clients may have opportunities to customize branding elements such as product labels, packaging, and presentation according to their business needs. Project requirements, order quantities, timelines, and customization options are discussed individually to ensure the final product aligns with the client's goals.
            </p>
          </div>
          <p>
            Private labeling provides businesses with a cost-effective way to enter the fragrance market while benefiting from established manufacturing and production expertise.
          </p>
        </section>
      </div>
    </div>
  );
}
