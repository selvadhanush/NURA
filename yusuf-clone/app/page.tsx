'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';
import { PRODUCTS } from '../data/products';

export default function Home() {
  // Filter products by their tags
  const bestSellers = PRODUCTS.filter(product => product.tags.includes('Best Seller')).slice(0, 4);
  const newArrivals = PRODUCTS.filter(product => product.tags.includes('New Arrival')).slice(0, 4);
  const signatureCollection = PRODUCTS.filter(product => product.tags.includes('Signature')).slice(0, 4);

  const hotspots = [
    { id: 1, name: 'Jasmine Signature', price: '569', description: 'A beautiful and natural floral aroma that feels fresh and elegant. The fragrance lasts for hours without being overpowering.', sizeInfo: '6ml & 12ml Oil | 50ml & 100ml Perfume', x: 17.5, y: 65.0, link: '/products/jasmine' },
    { id: 2, name: 'Al-Zaf Royal', price: '520', description: 'Deep, rich woody notes combined with amber and sweet musk. A truly mesmerizing experience.', sizeInfo: '6ml & 12ml Oil | 50ml & 100ml Perfume', x: 35.0, y: 46.5, link: '/products/al-zaf' },
    { id: 3, name: 'Al Harun Signature Edition', price: '710', description: 'An exotic, spicy blend with hints of saffron, precious oud, and warm vanilla.', sizeInfo: '6ml & 12ml Oil | 50ml & 100ml Perfume', x: 52.0, y: 34.0, link: '/products/al-haroon' },
    { id: 4, name: 'Khamrah Collection', price: '729', description: 'Warm, sweet, and comforting with cinnamon, praline, dates, and rich wood tones.', sizeInfo: '6ml & 12ml Oil | 50ml & 100ml Perfume', x: 68.5, y: 43.5, link: '/products/latafa-khamrah' },
    { id: 5, name: 'Al Marziyah', price: '680', description: 'A sophisticated combination of rich floral scents, warm vanilla, and smooth white musk.', sizeInfo: '6ml & 12ml Oil | 50ml & 100ml Perfume', x: 84.5, y: 55.0, link: '/products/almarziyah' },
  ];

  const [activeHotspot, setActiveHotspot] = useState<any>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Image 
          src="/hero-desktop-wide.jpg" 
          alt="NURA by Bin Sadhik Luxury Perfume Banner" 
          fill
          priority
          quality={100}
          className={styles.heroImageDesktop}
        />
        <Image 
          src="/hero-desktop-green.png" 
          alt="NURA by Bin Sadhik Luxury Perfume Banner Mobile" 
          fill
          priority
          quality={100}
          className={styles.heroImageMobile}
        />
        <div className={styles.heroContent}>
          <Link href="/collections" className={styles.primaryButton}>EXPLORE COLLECTION</Link>
        </div>
      </section>

      {/* 1. Best Sellers Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>BEST SELLERS</h2>
          <h3>Our Most Coveted Signatures</h3>
        </div>
        
        <div className={styles.productGrid}>
          {bestSellers.map(product => (
            <ProductCard 
              key={product.id}
              name={product.name}
              price={formatCurrency(product.oilPrice6ml)}
              imageUrl={product.image}
              link={`/products/${product.id}`}
            />
          ))}
        </div>
        
        <div className={styles.centerButtonContainer}>
          <Link href="/collections" className={styles.secondaryButton}>VIEW ALL COVETED SCENTS</Link>
        </div>
      </section>

      {/* 2. Interactive Showcase (Centerpiece Storytelling) */}
      <section className={styles.showcaseSection}>
        <div className={styles.showcaseGrid}>
          <div className={styles.storytellingColumn}>
            <span className={styles.showcaseTag}>THE NURA ARTISTRY</span>
            <h2>DISCOVER THE ESSENCE</h2>
            <p className={styles.craftStory}>
              Every NURA fragrance is hand-poured in micro-batches using only the finest botanical extracts, precious woods, and natural essential oils. Inspired by the rich traditions of Arabian perfumery and refined with modern French design, our collection is curated for those who demand long-lasting projection and absolute sophistication.
            </p>
            <div className={styles.videoPlayerPlaceholder}>
              <div className={styles.videoThumbnailWrapper}>
                <Image 
                  src="/hero-desktop-wide.jpg" 
                  alt="Cinematic Perfume Crafting" 
                  fill
                  className={styles.videoThumbnail}
                />
              </div>
              <div className={styles.playOverlay}>
                <div className={styles.playButtonIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
                <span>WATCH CRAFTSMANSHIP FILM</span>
              </div>
            </div>
          </div>
          
          <div className={styles.interactiveColumn}>
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
          </div>
        </div>
      </section>

      {/* 3. New Arrivals Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>NEW ARRIVALS</h2>
          <h3>Freshly Poured Creations</h3>
        </div>
        
        <div className={styles.productGrid}>
          {newArrivals.map(product => (
            <ProductCard 
              key={product.id}
              name={product.name}
              price={formatCurrency(product.oilPrice6ml)}
              imageUrl={product.image}
              link={`/products/${product.id}`}
            />
          ))}
        </div>
        
        <div className={styles.centerButtonContainer}>
          <Link href="/collections" className={styles.secondaryButton}>EXPLORE RECENT POURS</Link>
        </div>
      </section>

      {/* 4. Charitable Mission Section (Circle of Light / Purification of Trade) */}
      <section className={styles.charitySection}>
        <div className={styles.charityContainer}>
          <div className={styles.charityContent}>
            <span className={styles.charityTag}>OUR CORE VALUE</span>
            <h2>THE PURIFICATION OF TRADE</h2>
            <p className={styles.charityText}>
              At NURA, our brand name represents light, and we believe that commerce has the power to heal. Guided by our <strong>"Circle of Light"</strong> philosophy, we dedicate 10% of all profits directly to charitable education and community projects in India.
            </p>
            <p className={styles.charityText}>
              Every premium bottle you buy helps fund secondary schools, clean water wells, and vocational workshops. Together, we are purifying trade—creating a beautiful cycle of giving that transforms lives.
            </p>
            <div className={styles.charityActions}>
              <Link href="/circle-of-light" className={styles.charityBtn}>OUR MISSION STORY</Link>
              <Link href="/about" className={styles.charityBtnSecondary}>ABOUT US</Link>
            </div>
          </div>
          
          <div className={styles.charityVisual}>
            <div className={styles.circleGraphic}>
              <div className={styles.innerCircle}>
                <span className={styles.innerCircleText}>NURA</span>
              </div>
              <div className={styles.orbitingTextContainer}>
                <span className={styles.orbitingText}>PURITY • COMPASSION • ARTISTRY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Signature Collection (Staff Picks) Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>THE SIGNATURE SERIES</h2>
          <h3>Curated Masterpieces by Bin Sadhik</h3>
        </div>
        
        <div className={styles.productGrid}>
          {signatureCollection.map(product => (
            <ProductCard 
              key={product.id}
              name={product.name}
              price={formatCurrency(product.oilPrice6ml)}
              imageUrl={product.image}
              link={`/products/${product.id}`}
            />
          ))}
        </div>
      </section>

      {/* 6. Explore Scent Categories */}
      <div className={styles.scentedDelightsContainer}>
        <section className={`${styles.section} ${styles.bgWhite}`}>
          <div className={styles.sectionHeader}>
            <h2>EXPLORE THE FORMATS</h2>
            <h3>Concentrates & Diffusers</h3>
          </div>
          
          <div className={styles.categoriesGrid2}>
            <Link href="/perfume" className={styles.categoryCard}>
              <div className={styles.categoryImageContainer}>
                <Image src="/cat-perfume.jpg" alt="Perfumes" fill className={styles.categoryImage} />
              </div>
              <h4>EAUX DE PARFUM</h4>
            </Link>
            <Link href="/perfume-oil" className={styles.categoryCard}>
              <div className={styles.categoryImageContainer}>
                <Image src="/cat-bakhoor.jpg" alt="Perfume Oils" fill className={styles.categoryImage} />
              </div>
              <h4>CONCENTRATED PERFUME OILS</h4>
            </Link>
          </div>
        </section>
      </div>

      {/* 7. Dedicated Newsletter Section (Join the NURA Circle) */}
      <section className={styles.newsletterSection}>
        <div className={styles.newsletterCard}>
          <span className={styles.newsletterTag}>MEMBER ACCESS</span>
          <h2>JOIN THE NURA CIRCLE</h2>
          <p className={styles.newsletterSubtitle}>
            Subscribe for exclusive early access to product launches, seasonal scent guides, and members-only rewards. Receive a <strong>10% Welcome Reward</strong> on your first order.
          </p>
          
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>✦</span>
              <span>First Access to Limited Reserves</span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>✦</span>
              <span>Bespoke Consultation Pre-booking</span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>✦</span>
              <span>Complimentary Scent Vials with Orders</span>
            </div>
          </div>

          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              alert('Welcome to the NURA Circle! Use code NURA10 at checkout to redeem your 10% discount.'); 
            }} 
            className={styles.newsletterForm}
          >
            <input 
              type="email" 
              required 
              placeholder="Enter your email address" 
              className={styles.newsletterInput} 
            />
            <button type="submit" className={styles.newsletterSubmit}>SUBSCRIBE</button>
          </form>
        </div>
      </section>

      {/* 8. Customer Reviews Section */}
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
              "I recently purchased the Althair Vanilla from NURA by Bin Sadhik and absolutely love it. The rich, long-lasting fragrance feels very premium. It’s slightly on the costlier side, but totally worth it for the quality."
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
