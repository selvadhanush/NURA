'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';

export default function Home() {
  const perfumes = [
    { id: 'jasmine', name: 'Jasmine', price: '2,590.00', image: '/products/jasmine_oil.png' },
    { id: 'al-zaf', name: 'AL-ZAF', price: '2,390.00', image: '/products/al_zaf.png' },
    { id: 'al-harun', name: 'Al Harun V1', price: '2,990.00', image: '/products/al_haroon.png' },
    { id: 'lat-khamrah', name: 'Lattafa Khamrah V1', price: '3,090.00', image: '/products/latafa_khamrah.png' },
    { id: 'al-marziyah', name: 'Al Marziyah', price: '2,890.00', image: '/products/almarziyah.png' },
  ];

  const perfumeOils = [
    { id: 'jasmine', name: 'Jasmine', price: '569.00', image: '/products/jasmine_oil.png' },
    { id: 'al-zaf', name: 'AL-ZAF', price: '520.00', image: '/products/al_zaf.png' },
    { id: 'al-harun', name: 'Al Harun V1', price: '710.00', image: '/products/al_haroon.png' },
    { id: 'lat-khamrah', name: 'Lattafa Khamrah V1', price: '729.00', image: '/products/latafa_khamrah.png' },
    { id: 'al-marziyah', name: 'Al Marziyah', price: '680.00', image: '/products/almarziyah.png' },
  ];

  const hotspots = [
    { id: 1, name: 'Jasmine', price: '569.00', description: 'A beautiful and natural floral aroma that feels fresh and elegant. The fragrance lasts for hours without being overpowering.', sizeInfo: '6ml & 12ml Oil | 50ml & 100ml Perfume', x: 17.5, y: 65.0, link: '/perfume-oil' },
    { id: 2, name: 'AL-ZAF', price: '520.00', description: 'Deep, rich woody notes combined with amber and sweet musk. A truly mesmerizing experience.', sizeInfo: '6ml & 12ml Oil | 50ml & 100ml Perfume', x: 35.0, y: 46.5, link: '/perfume-oil' },
    { id: 3, name: 'Al Harun V1', price: '710.00', description: 'An exotic, spicy blend with hints of saffron, precious oud, and warm vanilla.', sizeInfo: '6ml & 12ml Oil | 50ml & 100ml Perfume', x: 52.0, y: 34.0, link: '/perfume-oil' },
    { id: 4, name: 'Lattafa Khamrah V1', price: '729.00', description: 'Warm, sweet, and comforting with cinnamon, praline, dates, and rich wood tones.', sizeInfo: '6ml & 12ml Oil | 50ml & 100ml Perfume', x: 68.5, y: 43.5, link: '/perfume-oil' },
    { id: 5, name: 'Al Marziyah', price: '680.00', description: 'A sophisticated combination of rich floral scents, warm vanilla, and smooth white musk.', sizeInfo: '6ml & 12ml Oil | 50ml & 100ml Perfume', x: 84.5, y: 55.0, link: '/perfume-oil' },
  ];

  const [activeHotspot, setActiveHotspot] = useState<any>(null);

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
          <h2>PREMIUM PERFUME OILS</h2>
          <h3>Pure Essences - 6ml & 12ml</h3>
        </div>
        
        <div className={styles.productGrid5}>
          {perfumeOils.map(product => (
            <ProductCard 
              key={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.image}
              link={`/perfume-oil`}
            />
          ))}
        </div>
        
        <div className={styles.centerButtonContainer}>
          <Link href="/perfume-oil" className={styles.secondaryButton}>VIEW ALL OILS</Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>SIGNATURE PERFUMES</h2>
          <h3>Exquisite Eaux de Parfum - 50ml & 100ml</h3>
        </div>
        
        <div className={styles.productGrid5}>
          {perfumes.map(product => (
            <ProductCard 
              key={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.image}
              link={`/perfume`}
            />
          ))}
        </div>

        <div className={styles.centerButtonContainer}>
          <Link href="/perfume" className={styles.secondaryButton}>VIEW ALL PERFUMES</Link>
        </div>
      </section>

      <section className={styles.showcaseSection}>
        <div className={styles.sectionHeader}>
          <h2>DISCOVER THE ESSENCE</h2>
          <h3>THE NURA SHOWCASE</h3>
        </div>

        <div className={styles.showcaseContainer}>
          <div className={styles.imageWrapper}>
            <Image 
              src="/showcase-bottles.png" 
              alt="NURA Bottles Showcase" 
              width={1200}
              height={1200}
              className={styles.showcaseImage}
              priority
            />
            
            {hotspots.map((spot) => (
              <button
                key={spot.id}
                className={`${styles.hotspotDot} ${activeHotspot?.id === spot.id ? styles.hotspotDotActive : ''}`}
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                }}
                onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
                aria-label={`Show details for ${spot.name}`}
              >
                <span className={styles.pulseRing} />
              </button>
            ))}

            {activeHotspot && (
              <div 
                className={styles.hotspotCard}
                style={{
                  left: `${activeHotspot.x}%`,
                  top: `${activeHotspot.y + 5}%`,
                }}
              >
                <button 
                  className={styles.cardClose} 
                  onClick={() => setActiveHotspot(null)}
                  aria-label="Close details"
                >
                  &times;
                </button>
                <h4>{activeHotspot.name}</h4>
                <span className={styles.cardSizes}>{activeHotspot.sizeInfo}</span>
                <p>{activeHotspot.description}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardPrice}>FROM ₹{activeHotspot.price}</span>
                  <Link href={activeHotspot.link} className={styles.cardBtn}>EXPLORE</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className={styles.scentedDelightsContainer}>
        <section className={`${styles.section} ${styles.bgWhite}`}>
          <div className={styles.sectionHeader}>
            <h2>SCENTED CATEGORIES</h2>
            <h3>EXPLORE OUR FRAGRANCES</h3>
          </div>
          
          <div className={styles.categoriesGrid2}>
            <Link href="/perfume" className={styles.categoryCard}>
              <div className={styles.categoryImageContainer}>
                <Image src="/cat-perfume.jpg" alt="Perfumes" fill className={styles.categoryImage} />
              </div>
              <h4>PERFUMES</h4>
            </Link>
            <Link href="/perfume-oil" className={styles.categoryCard}>
              <div className={styles.categoryImageContainer}>
                <Image src="/cat-bakhoor.jpg" alt="Perfume Oils" fill className={styles.categoryImage} />
              </div>
              <h4>PERFUME OILS</h4>
            </Link>
          </div>
        </section>
      </div>

      <section className={`${styles.section} ${styles.reviewsSection}`}>
        <div className={styles.sectionHeader}>
          <h2>WHAT OUR CLIENTS SAY</h2>
          <h3>CUSTOMER REVIEWS</h3>
        </div>
        
        <div className={styles.reviewsGrid}>
          <div className={styles.reviewCard}>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.reviewText}>
              "This Jasmine Attar has a beautiful and natural floral aroma that feels fresh and elegant. The fragrance lasts for hours without being overpowering. Felt authentic using it."
            </p>
            <h4 className={styles.reviewerName}>Dhanush M.</h4>
            <span className={styles.verifiedBuyer}>Verified Buyer</span>
          </div>
          
          <div className={styles.reviewCard}>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.reviewText}>
              "I recently purchased the Tom Ford Tobacco Vanille attar from BIN SADHIK Perfumes and absolutely love it. The rich, long-lasting fragrance feels very premium. It’s slightly on the costlier side, but totally worth it for the quality."
            </p>
            <h4 className={styles.reviewerName}>Rahul K.</h4>
            <span className={styles.verifiedBuyer}>Verified Buyer</span>
          </div>
          
          <div className={styles.reviewCard}>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.reviewText}>
              "Outstanding longevity and projection. The customer service was also top-notch, helping me select the perfect fragrance profile. Will definitely buy again."
            </p>
            <h4 className={styles.reviewerName}>Karan S.</h4>
            <span className={styles.verifiedBuyer}>Verified Buyer</span>
          </div>
        </div>
      </section>
    </div>
  );
}
