import Image from 'next/image';
import styles from './page.module.css';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';

export default function Home() {
  const brandInspirations = [
    { id: 1, name: 'NURΛ SAUVAGE', price: '1,550.00', image: '/sauvage-placeholder.png' },
    { id: 2, name: 'NURΛ BLEU DE', price: '1,550.00', image: '/bleu-placeholder.png' },
    { id: 3, name: 'NURΛ AVENTUS', price: '1,950.00', image: '/aventus-placeholder.png' },
    { id: 4, name: 'NURΛ OMBRE LEATHER', price: '1,950.00', image: '/ombre-placeholder.png' },
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Image 
          src="/hero-desktop-wide.jpg" 
          alt="NURA Luxury Perfume Banner" 
          fill
          priority
          quality={100}
          className={styles.heroImageDesktop}
        />
        <Image 
          src="/hero-desktop-green.png" 
          alt="NURA Luxury Perfume Banner Mobile" 
          fill
          priority
          quality={100}
          className={styles.heroImageMobile}
        />
        <div className={styles.heroContent}>
          <Link href="/collections" className={styles.primaryButton}>EXPLORE</Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>THE ICONIC DUO</h2>
          <h3>BRAND INSPIRATIONS</h3>
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

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>NEW ARRIVALS</h2>
          <h3>THE NURA SIGNATURE</h3>
        </div>
        
        <div className={styles.productGrid}>
          <ProductCard name="SUMMER OUD" price="2,850.00" imageUrl="/products/summer_oud.png" link="/perfume" />
          <ProductCard name="CANADIAN LEMON" price="2,450.00" imageUrl="/products/canadian_lemon.png" link="/perfume" />
          <ProductCard name="JASMINE OIL" price="450.00" imageUrl="/products/jasmine_oil.png" link="/perfume-oil" />
          <ProductCard name="AL ZAF" price="550.00" imageUrl="/products/al_zaf.png" link="/perfume-oil" />
        </div>
      </section>

      <div className={styles.scentedDelightsContainer}>
        <section className={`${styles.section} ${styles.bgWhite}`}>
          <div className={styles.sectionHeader}>
            <h2>SCENTED DELIGHTS</h2>
            <h3>A TRIO OF LUXURIOUS FRAGRANCES</h3>
          </div>
          
          <div className={styles.categoriesGrid}>
            <Link href="/perfume" className={styles.categoryCard}>
              <div className={styles.categoryImageContainer}>
                <Image src="/cat-perfume.jpg" alt="Perfumes" fill className={styles.categoryImage} />
              </div>
              <h4>PERFUMES</h4>
            </Link>
            <Link href="/candle" className={styles.categoryCard}>
              <div className={styles.categoryImageContainer}>
                <Image src="/cat-candle.jpg" alt="Candles" fill className={styles.categoryImage} />
              </div>
              <h4>CANDLES</h4>
            </Link>
            <Link href="/bakhoor" className={styles.categoryCard}>
              <div className={styles.categoryImageContainer}>
                <Image src="/cat-bakhoor.jpg" alt="Bakhoor" fill className={styles.categoryImage} />
              </div>
              <h4>BAKHOOR</h4>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
