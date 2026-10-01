'use client';

import React, { forwardRef, useState } from 'react';
import { PartnerBrand } from './partnerData';
import NineStarLogo from './NineStarLogo';
import styles from './BeanConstellation.module.css';

interface BeanConstellationProps {
  brands: PartnerBrand[];
  activeBrandIndex: number;
  onSelectBrandIndex: (index: number) => void;
}

// 5 Arc Slot names: 0: Outer Left, 1: Inner Left, 2: Center (Active spotlight apex), 3: Inner Right, 4: Outer Right
const SLOT_NAMES = ['outerLeft', 'innerLeft', 'center', 'innerRight', 'outerRight'];

export function getSlotForIndex(idx: number, activeIdx: number, total: number): number {
  return ((idx - activeIdx) + 2 + total) % total;
}

const BeanConstellation = forwardRef<HTMLDivElement, BeanConstellationProps>(
  ({ brands, activeBrandIndex, onSelectBrandIndex }, ref) => {
    const [rippleBrandId, setRippleBrandId] = useState<string | null>(null);

    const handleBeanClick = (index: number, brandId: string) => {
      setRippleBrandId(brandId);
      setTimeout(() => setRippleBrandId(null), 700);
      onSelectBrandIndex(index);
    };

    return (
      <div ref={ref} className={styles.arcContainer}>
        {/* Dashed Downward U-Curve Arc Guide Line matching reference image */}
        <svg className={styles.arcSvg} viewBox="0 0 1000 160" preserveAspectRatio="none">
          <path
            d="M 180 26 Q 500 190 820 26"
            fill="none"
            stroke="rgba(232, 216, 160, 0.22)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />
        </svg>

        {/* 5 Circular Glass Orbs moving smoothly between arc slots */}
        {brands.map((brand, idx) => {
          const slot = getSlotForIndex(idx, activeBrandIndex, brands.length);
          const slotName = SLOT_NAMES[slot];
          const isCenterActive = slot === 2; // Center position (Slot 2) is active
          const isRippling = brand.id === rippleBrandId;

          return (
            <button
              key={brand.id}
              data-bean-id={brand.id}
              data-slot-name={slotName}
              className={`
                ${styles.beanOrbButton}
                ${styles[`slot_${slotName}`]}
                ${isCenterActive ? styles.beanActive : styles.beanInactive}
              `}
              onClick={() => handleBeanClick(idx, brand.id)}
              role="tab"
              aria-selected={isCenterActive}
              aria-label={`${brand.name} - ${brand.tagline}`}
              tabIndex={0}
            >
              {/* Click Light Ripple */}
              {isRippling && <span className={styles.clickRipple} />}

              {/* Floating Wrapper - isolates micro-float from position transitions for 120fps smoothness */}
              <div className={`${styles.orbFloatWrap} ${styles[`float_${idx % 5}`]}`}>
                {/* Circular Glass Orb with 9-Star Emblem */}
                <div className={styles.glassOrbDisc}>
                  {/* Subtle active outer halo glow */}
                  {isCenterActive && <div className={styles.activeHaloGlow} />}
                  <NineStarLogo
                    size={isCenterActive ? 28 : 24}
                    className={isCenterActive ? styles.starLogoActive : styles.starLogoInactive}
                  />
                </div>
              </div>

              {/* Hover Tooltip */}
              <div className={styles.hoverTooltip}>
                <span className={styles.tooltipCategory}>{brand.category}</span>
                <span className={styles.tooltipTitle}>{brand.name}</span>
              </div>
            </button>
          );
        })}
      </div>
    );
  }
);

BeanConstellation.displayName = 'BeanConstellation';

export default BeanConstellation;
