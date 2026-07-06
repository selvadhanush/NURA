import styles from '../info.module.css';

export default function ShippingReturnsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>RETURNS & REFUNDS</h1>
          <p>Our commitment to your satisfaction</p>
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.contentSection}>
          <h2>Return & Refund Policy</h2>
          <p>
            Customer satisfaction is important to us. Every order is carefully packed and inspected before
            dispatch. However, in the unlikely event that a product arrives damaged during transit, customers
            should notify us as soon as possible after delivery and provide clear photographs or videos of the
            damaged package and product.
          </p>
          <div className={styles.highlightBox}>
            <p>
              Once the issue has been reviewed and verified by our team, an
              appropriate resolution will be provided. Depending on the situation, this may include a replacement
              product or a refund of the amount paid for the affected item.
            </p>
          </div>
          <p>
            Refunds, where approved, will be processed using the original payment method or another mutually agreed method. 
            Please note that refunds or replacements cannot be provided for products that have been damaged due to misuse,
            improper storage, or normal wear after delivery. We encourage customers to contact us promptly so that we can assist efficiently.
          </p>
        </section>
      </div>
    </div>
  );
}
