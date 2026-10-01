'use client';

import React, { useState, useRef } from 'react';
import { PARTNER_BRANDS, PartnerBrand } from './partnerData';
import BeanConstellation from './BeanConstellation';
import VolumetricLightCanvas from './VolumetricLightCanvas';
import BrandInfoCard from './BrandInfoCard';
import BrandDetailModal from './BrandDetailModal';
import Link from 'next/link';
import styles from './CircleOfLightInteractive.module.css';

export default function CircleOfLightInteractive() {
  const [activeBrandIndex, setActiveBrandIndex] = useState(2); // Default center bean
  const [previousBrandIndex, setPreviousBrandIndex] = useState(2);
  const [detailModalBrand, setDetailModalBrand] = useState<PartnerBrand | null>(null);

  const heroSectionRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const constellationRef = useRef<HTMLDivElement | null>(null);

  const activeBrand = PARTNER_BRANDS[activeBrandIndex];

  const handleSelectIndex = (index: number) => {
    if (index === activeBrandIndex) return;
    setPreviousBrandIndex(activeBrandIndex);
    setActiveBrandIndex(index);
  };

  return (
    <div className={styles.interactiveContainer}>
      {/* ══ HERO CONSTELLATION SECTION ══ */}
      <section ref={heroSectionRef} className={styles.heroSection}>
        {/* Subtle Ambient Lighting Grid */}
        <div className={styles.ambientLightingBg} />

        {/* Section Header */}
        <div className={styles.sectionTitleArea}>
          <h1 className={styles.mainTitle}>CIRCLE OF LIGHT</h1>
          <p className={styles.mainSubtitle}>Discover the essence of NURA</p>
        </div>

        {/* GPU-Accelerated Volumetric Light Canvas Beam - Smooth 60/120fps internal animation */}
        <VolumetricLightCanvas
          heroRef={heroSectionRef}
          cardRef={cardRef}
          constellationRef={constellationRef}
          activeBrandIndex={activeBrandIndex}
          previousBrandIndex={previousBrandIndex}
          accentColor={activeBrand.accentColor}
        />

        {/* Semi-Circular Arc of Star-Icon Bean Orbs */}
        <div className={styles.constellationWrap}>
          <BeanConstellation
            ref={constellationRef}
            brands={PARTNER_BRANDS}
            activeBrandIndex={activeBrandIndex}
            onSelectBrandIndex={handleSelectIndex}
          />
        </div>

        {/* Emerging Brand Details Card in Illuminated Zone */}
        <div className={styles.cardAreaZone}>
          <BrandInfoCard
            ref={cardRef}
            brand={activeBrand}
            activeBrandIndex={activeBrandIndex}
            totalBrands={PARTNER_BRANDS.length}
            onSelectBrandIndex={handleSelectIndex}
            onOpenDetails={(brand) => setDetailModalBrand(brand)}
          />
        </div>
      </section>

      {/* ══ MISSION IMPACT STATISTICS & BRAND HERITAGE ══ */}
      <div className={styles.contentBodyContainer}>
        {/* Stat Counter Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>10%</span>
            <span className={styles.statLabel}>Of All Profits Donated</span>
            <p className={styles.statSubtext}>Directly allocated to verified partner programs without intermediaries.</p>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Ethical & Transparent</span>
            <p className={styles.statSubtext}>Every transaction is tracked with full auditability and open disclosure.</p>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>47,000+</span>
            <span className={styles.statLabel}>Lives Illuminated</span>
            <p className={styles.statSubtext}>Empowering education, clean water, and artisan communities globally.</p>
          </div>
        </div>

        {/* Story Section */}
        <div className={styles.storyGrid}>
          <div className={styles.storyCard}>
            <h2>What is the Circle of Light?</h2>
            <p>
              In Arabic, <strong>NURA (نُور)</strong> means light. Our brand was founded on a single core belief: luxury commerce should not just extract value, but radiate light, dignity, and compassion back into the world.
            </p>
            <p>
              The <strong>Circle of Light</strong> is our living manifesto — an orbit where fine perfumery translates directly into social welfare and environmental stewardship.
            </p>
          </div>

          <div className={styles.storyCard}>
            <h2>The Purification of Trade</h2>
            <p>
              By dedicating <strong>10% of all profits</strong> from every fragrance sold to education and wellness initiatives, we ensure our growth directly elevates others.
            </p>
            <p>
              We call this the <em>Purification of Trade</em> — commerce that is clean, transparent, and bound to the service of humanity.
            </p>
          </div>
        </div>

        {/* Closing Call to Action */}
        <div className={styles.ctaBanner}>
          <h2>A Partnership of Light</h2>
          <p>
            Every time you wear a NURA fragrance, you carry this mission with you. Thank you for participating in this cycle of change.
          </p>
          <div className={styles.btnRow}>
            <Link href="/collections" className={styles.primaryBtn}>
              EXPLORE THE FRAGRANCES
            </Link>
            <Link href="/about" className={styles.secondaryBtn}>
              OUR BRAND HERITAGE
            </Link>
          </div>
        </div>
      </div>

      {/* Deep-Dive Detail Modal */}
      <BrandDetailModal
        brand={detailModalBrand}
        onClose={() => setDetailModalBrand(null)}
      />
    </div>
  );
}
