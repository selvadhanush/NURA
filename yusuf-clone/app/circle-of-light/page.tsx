'use client';

import styles from './page.module.css';
import Link from 'next/link';

export default function CircleOfLight() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.tag}>OUR PHILOSOPHY</span>
        <h1>THE CIRCLE OF LIGHT</h1>
        <p className={styles.subtitle}>Purifying Trade, Illuminating Lives</p>
      </div>

      <div className={styles.container}>
        <div className={styles.storySection}>
          <div className={styles.storyCard}>
            <h2>What is the Circle of Light?</h2>
            <p>
              In Arabic, <strong>NURA (نُور)</strong> means light. Guided by this meaning, our brand was founded on a simple but powerful premise: that luxury commerce should not just extract value, but actively radiate light and compassion to the world.
            </p>
            <p>
              The <strong>Circle of Light</strong> is our operational manifesto. It represents a continuous, flowing loop where the appreciation of fine perfumery translates directly into social welfare—creating a beautiful cycle of giving that elevates both the creator and the patron.
            </p>
          </div>

          <div className={styles.storyCard}>
            <h2>The Purification of Trade</h2>
            <p>
              Perfumery is historically an art of purification. We believe that trade itself must also be purified. By dedicating <strong>10% of all profits</strong> from every single bottle sold to education and wellness initiatives, we ensure that our growth directly translates into the elevation of others.
            </p>
            <p>
              We call this the <em>Purification of Trade</em>—a commitment to keeping our commerce clean, transparent, and bound to the service of humanity.
            </p>
          </div>
        </div>

        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>10%</span>
            <span className={styles.statLabel}>Of All Profits Donated</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Direct Educational Aid</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>3,000+</span>
            <span className={styles.statLabel}>Hours of Vocational Work</span>
          </div>
        </div>

        <div className={styles.initiativesSection}>
          <h2>Key Initiatives Funded by NURA Circle</h2>
          <div className={styles.initiativesGrid}>
            <div className={styles.initCard}>
              <span className={styles.initIcon}>✦</span>
              <h3>Primary Education</h3>
              <p>Funding secondary school scholarships, learning materials, and basic computer labs for underprivileged communities in rural districts.</p>
            </div>
            
            <div className={styles.initCard}>
              <span className={styles.initIcon}>✦</span>
              <h3>Clean Water Infrastructure</h3>
              <p>Constructing sustainable tube-wells and water purification systems to provide communities with safe drinking water.</p>
            </div>

            <div className={styles.initCard}>
              <span className={styles.initIcon}>✦</span>
              <h3>Vocational Training</h3>
              <p>Supporting craft workshops and stitching center programs that empower women with independent financial skills.</p>
            </div>
          </div>
        </div>

        <div className={styles.closingCall}>
          <h2>A Partnership of Light</h2>
          <p>
            Every time you wear a NURA fragrance, you carry this mission with you. Thank you for participating in this cycle of change.
          </p>
          <div className={styles.btnRow}>
            <Link href="/collections" className={styles.primaryBtn}>EXPLORE THE FRAGRANCES</Link>
            <Link href="/about" className={styles.secondaryBtn}>OUR BRAND HERITAGE</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
