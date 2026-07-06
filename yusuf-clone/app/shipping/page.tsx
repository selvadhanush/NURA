import styles from '../info.module.css';

export default function ShippingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>SHIPPING POLICY</h1>
          <p>Delivery information & regions</p>
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.contentSection}>
          <h2>Shipping Policy</h2>
          <p>
            We proudly serve customers across India through reliable courier and logistics partners. Orders are
            processed and prepared for dispatch after order confirmation and verification. Delivery timelines
            may vary depending on the destination, courier network coverage, weather conditions, public
            holidays, or other circumstances beyond our control.
          </p>
          <p>
            Once an order has been dispatched, customers may receive shipment details or tracking information whenever available. 
            While we strive to ensure timely delivery, delays caused by courier providers cannot always be prevented.
          </p>
          <p>
            Customers are requested to ensure that delivery addresses and contact details provided during
            ordering are accurate and complete. Shipping charges, if applicable, will be communicated during
            the order confirmation process. We continuously work with trusted logistics partners to ensure safe
            and efficient delivery throughout India.
          </p>
        </section>
      </div>
    </div>
  );
}
