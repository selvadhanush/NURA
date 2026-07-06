import styles from '../info.module.css';

export default function FranchisingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>FRANCHISE</h1>
          <p>Future retail opportunities & brand expansion</p>
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.contentSection}>
          <h2>Franchise Policy</h2>
          <p>
            At present, NURA does not operate through franchise locations. All products and services are
            currently managed directly through our official channels. This approach allows us to maintain
            consistent quality standards, customer service, and brand experience.
          </p>
          <div className={styles.highlightBox}>
            <p>
              As part of our future growth plans, we are actively exploring opportunities to establish dedicated retail outlets and customer experience centers.
            </p>
          </div>
          <p>
            Any official franchise opportunities, retail expansions, or authorized outlet announcements will be communicated exclusively through our official website and verified communication channels. We encourage customers and business partners to follow our updates for future developments regarding physical store locations and expansion plans.
          </p>
        </section>
      </div>
    </div>
  );
}
