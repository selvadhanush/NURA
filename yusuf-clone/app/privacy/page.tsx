import styles from '../info.module.css';

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>PRIVACY POLICY</h1>
          <p>How we protect your information</p>
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.contentSection}>
          <h2>Privacy Policy</h2>
          <p>
            We value the privacy of our customers and are committed to protecting personal information.
            Information such as names, contact details, delivery addresses, and order-related data is collected
            solely for the purpose of processing orders, providing customer support, and improving our
            services.
          </p>
          <div className={styles.highlightBox}>
            <p>
              Certain aspects of our product development process, ingredient sourcing methods, and
              manufacturing practices are confidential business information. Our manufacturing partners may
              utilize proprietary and patented formulations developed through their own research and expertise.
              These formulations remain the intellectual property of their respective owners and are not publicly
              disclosed.
            </p>
          </div>
          <p>
            Customer information is never sold to third parties. Data may only be shared with trusted
            service providers, such as courier partners, when necessary to complete services requested by
            customers. Reasonable security measures are maintained to safeguard customer information.
          </p>
        </section>
      </div>
    </div>
  );
}
