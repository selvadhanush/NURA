import styles from '../info.module.css';

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>TERMS OF SERVICE</h1>
          <p>Terms and Conditions of Use</p>
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.contentSection}>
          <h2>Terms & Conditions</h2>
          <p>
            By accessing and using our website, you agree to comply with these terms and conditions. Product
            descriptions, images, and information are provided for general guidance and may be updated from
            time to time. While we strive to ensure accuracy, minor variations in fragrance perception,
            packaging, or appearance may occur.
          </p>
          <p>
            All products are intended for lawful personal use only.
            Customers are responsible for providing accurate contact and shipping information when placing
            orders. We reserve the right to refuse, cancel, or limit orders in situations involving suspected fraud,
            misuse of services, pricing errors, or violations of applicable laws.
          </p>
          <p>
            All website content, including text, logos, designs, and branding materials, remains the intellectual property of NURA unless
            otherwise stated. Unauthorized reproduction, distribution, or commercial use is prohibited without written permission.
          </p>
        </section>
      </div>
    </div>
  );
}
