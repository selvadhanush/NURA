'use client';

import React, { forwardRef } from 'react';
import { PartnerBrand } from './partnerData';
import NineStarLogo from './NineStarLogo';
import styles from './BrandInfoCard.module.css';

interface BrandInfoCardProps {
  brand: PartnerBrand;
  activeBrandIndex: number;
  totalBrands: number;
  isTransitioning: boolean;
  onSelectBrandIndex: (index: number) => void;
  onOpenDetails: (brand: PartnerBrand) => void;
}

const BrandInfoCard = forwardRef<HTMLDivElement, BrandInfoCardProps>(
  (
    {
      brand,
      activeBrandIndex,
      totalBrands,
      isTransitioning,
      onSelectBrandIndex,
      onOpenDetails,
    },
    ref
  ) => {
    const handlePrev = () => {
      const prevIndex = (activeBrandIndex - 1 + totalBrands) % totalBrands;
      onSelectBrandIndex(prevIndex);
    };

    const handleNext = () => {
      const nextIndex = (activeBrandIndex + 1) % totalBrands;
      onSelectBrandIndex(nextIndex);
    };

    return (
      <div
        ref={ref}
        className={`
          ${styles.cardContainer}
          ${isTransitioning ? styles.cardExiting : styles.cardEmerging}
        `}
      >
        {/* Top Volumetric Light Receiver Bar */}
        <div className={styles.lightReceiverGlow} />

        {/* Card Header Tag & Category */}
        <div className={styles.cardHeader}>
          <span className={styles.categoryBadge}>✦ {brand.category}</span>
          <span className={styles.counterBadge}>
            0{activeBrandIndex + 1} / 0{totalBrands}
          </span>
        </div>

        {/* Brand Title & Tagline with 9-Star Emblem */}
        <div className={styles.titleGroup}>
          <div className={styles.emblemBadge}>
            <NineStarLogo size={36} color="#e8d8a0" />
          </div>
          <div>
            <h2 className={styles.brandTitle}>{brand.name}</h2>
            <p className={styles.brandTagline}>{brand.tagline}</p>
          </div>
        </div>

        {/* Brand Short Story */}
        <p className={styles.brandDescription}>{brand.story}</p>

        {/* Fragrance Pyramid Notes */}
        <div className={styles.notesSection}>
          <h4 className={styles.sectionLabel}>FRAGRANCE PYRAMID NOTES</h4>
          <div className={styles.notesGrid}>
            <div className={styles.noteCard}>
              <span className={styles.noteType}>TOP NOTES</span>
              <span className={styles.noteText}>{brand.notes.top.join(' • ')}</span>
            </div>
            <div className={styles.noteCard}>
              <span className={styles.noteType}>HEART NOTES</span>
              <span className={styles.noteText}>{brand.notes.heart.join(' • ')}</span>
            </div>
            <div className={styles.noteCard}>
              <span className={styles.noteType}>BASE NOTES</span>
              <span className={styles.noteText}>{brand.notes.base.join(' • ')}</span>
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        <div className={styles.highlightsSection}>
          <h4 className={styles.sectionLabel}>KEY HIGHLIGHTS & IMPACT</h4>
          <ul className={styles.highlightsList}>
            {brand.highlights.map((item, idx) => (
              <li key={idx}>
                <span className={styles.bulletSparkle}>✦</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Metrics Bar */}
        <div className={styles.metricsBar}>
          {brand.metrics.map((m, idx) => (
            <div key={idx} className={styles.metricItem}>
              <span className={styles.metricValue}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Navigation & Action Footer */}
        <div className={styles.cardFooter}>
          <div className={styles.navControls}>
            <button
              onClick={handlePrev}
              className={styles.navArrowBtn}
              aria-label="Previous Brand"
            >
              ←
            </button>
            <div className={styles.dotTracker}>
              {Array.from({ length: totalBrands }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectBrandIndex(idx)}
                  className={`
                    ${styles.dot}
                    ${idx === activeBrandIndex ? styles.activeDot : ''}
                  `}
                  aria-label={`Go to brand ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className={styles.navArrowBtn}
              aria-label="Next Brand"
            >
              →
            </button>
          </div>

          <button
            onClick={() => onOpenDetails(brand)}
            className={styles.detailCtaBtn}
          >
            <span>LEARN MORE ABOUT FRAGRANCE</span>
            <span className={styles.btnArrow}>→</span>
          </button>
        </div>
      </div>
    );
  }
);

BrandInfoCard.displayName = 'BrandInfoCard';

export default BrandInfoCard;
