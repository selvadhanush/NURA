import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.newsletter}>
          <h3>Signup for our newsletter</h3>
          <p>Subscribe to get notified about product launches, special offers and company news.</p>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Email" />
            <button>&rarr;</button>
          </div>
        </div>

        <div className={styles.linksSection}>
          <div className={styles.column}>
            <h4>Information</h4>
            <ul>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/shipping-returns">Return and Refund Policy</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/shipping">Shipping Policy</Link></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Our Services</h4>
            <ul>
              <li><Link href="/franchising">Franchise</Link></li>
              <li><Link href="/private-labeling">Private Labeling</Link></li>
              <li><Link href="/bespoke">BeSpoke Experience</Link></li>
              <li><Link href="/workshops">Workshops</Link></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Contact Us</h4>
            <p>NURA Store Locations: <Link href="/store-locator">India</Link></p>
            <p>WhatsApp: <a href="https://wa.me/919445934433">+91 94459 34433</a></p>
            <p>Email: <a href="mailto:info@nura.in">info@nura.in</a></p>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© 2026 - NURA INDIA</p>
        </div>
      </div>
    </footer>
  );
}
