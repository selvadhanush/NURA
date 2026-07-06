import styles from '../info.module.css';

export default function StoreLocatorPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>STORE LOCATOR</h1>
          <p>NURA official channels & stores</p>
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.contentSection}>
          <h2>NURA Store Locations</h2>
          <p>
            Currently, NURA operates exclusively online to serve customers across India with fresh batches of perfume oils and fragrances. 
            All orders are shipped directly from our central facility to maintain perfect storage conditions and product authenticity.
          </p>

          <div className={styles.highlightBox}>
            <p>
              As part of our brand growth plans, we are exploring physical retail showrooms and experience centers in major cities across India. 
              Updates regarding physical store launches will be shared on our website.
            </p>
          </div>

          <p>
            Please buy NURA products only from our official online store at <strong>nura.in</strong> or via our verified WhatsApp ordering channel at <strong>+91 90039 54228</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
