import styles from './page.module.css';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';

export default function Home() {
  const brandInspirations = [
    { id: 1, name: 'NURA SAUVAGE', price: '1,550.00', image: '/sauvage-placeholder.png' },
    { id: 2, name: 'NURA BLEU DE', price: '1,550.00', image: '/bleu-placeholder.png' },
    { id: 3, name: 'NURA AVENTUS', price: '1,950.00', image: '/aventus-placeholder.png' },
    { id: 4, name: 'NURA OMBRE LEATHER', price: '1,950.00', image: '/ombre-placeholder.png' },
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <Link href="/collections" className={styles.primaryButton}>EXPLORE</Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>THE ICONIC DUO</h3>
          <h2>BRAND INSPIRATIONS</h2>
        </div>
        
        <div className={styles.productGrid}>
          {brandInspirations.map(product => (
            <ProductCard 
              key={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.image}
              link={`/products/${product.id}`}
            />
          ))}
        </div>
        
        <div className={styles.centerButtonContainer}>
          <Link href="/collections/brand-inspiration" className={styles.secondaryButton}>VIEW ALL</Link>
        </div>
      </section>

      <div className={styles.scentedDelightsContainer}>
        <section className={`${styles.section} ${styles.bgWhite}`}>
          <div className={styles.sectionHeader}>
            <h2>SCENTED DELIGHTS</h2>
            <h3>A TRIO OF LUXURIOUS FRAGRANCES</h3>
          </div>
          
          <div className={styles.categoriesGrid}>
            <div className={styles.categoryCard}>
              <img src="/cat-perfume.jpg" alt="Perfumes" className={styles.categoryImage} />
              <h4>PERFUMES</h4>
            </div>
            <div className={styles.categoryCard}>
              <img src="/cat-candle.jpg" alt="Candles" className={styles.categoryImage} />
              <h4>CANDLES</h4>
            </div>
            <div className={styles.categoryCard}>
              <img src="/cat-bakhoor.jpg" alt="Bakhoor" className={styles.categoryImage} />
              <h4>BAKHOOR</h4>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
