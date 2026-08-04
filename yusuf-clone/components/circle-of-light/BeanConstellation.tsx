'use client';

import React, { useRef, useEffect, useState } from 'react';
import { PartnerBrand } from './partnerData';
import NineStarLogo from './NineStarLogo';
import styles from './BeanConstellation.module.css';

interface Point {
  x: number;
  y: number;
}

interface BeanConstellationProps {
  brands: PartnerBrand[];
  activeBrandIndex: number;
  onSelectBrandIndex: (index: number) => void;
  onUpdateActivePos?: (pos: Point) => void;
}

// 5 Arc Slot names: 0: Outer Left, 1: Inner Left, 2: Center (Active spotlight apex), 3: Inner Right, 4: Outer Right
const SLOT_NAMES = ['outerLeft', 'innerLeft', 'center', 'innerRight', 'outerRight'];

function getSlotForIndex(idx: number, activeIdx: number, total: number): number {
  return ((idx - activeIdx) + 2 + total) % total;
}

export default function BeanConstellation({
  brands,
  activeBrandIndex,
  onSelectBrandIndex,
  onUpdateActivePos
}: BeanConstellationProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const beanRefs = useRef<{ [id: string]: HTMLButtonElement | null }>({});
  const [rippleBrandId, setRippleBrandId] = useState<string | null>(null);

  // Measure exact center position of the active center bean for the light beam origin
  const measureActiveBeanPos = () => {
    if (!containerRef.current) return;
    const activeBrand = brands[activeBrandIndex];
    if (!activeBrand) return;
    const activeEl = beanRefs.current[activeBrand.id];
    if (!activeEl) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const beanRect = activeEl.getBoundingClientRect();

    const centerPos: Point = {
      x: beanRect.left + beanRect.width / 2 - containerRect.left,
      y: beanRect.top + beanRect.height / 2 - containerRect.top,
    };

    if (onUpdateActivePos) {
      onUpdateActivePos(centerPos);
    }
  };

  useEffect(() => {
    measureActiveBeanPos();
    const timer = setTimeout(measureActiveBeanPos, 80);
    const timer2 = setTimeout(measureActiveBeanPos, 300);
    window.addEventListener('resize', measureActiveBeanPos);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      window.removeEventListener('resize', measureActiveBeanPos);
    };
  }, [activeBrandIndex]);

  const handleBeanClick = (index: number, brandId: string) => {
    setRippleBrandId(brandId);
    setTimeout(() => setRippleBrandId(null), 850);
    onSelectBrandIndex(index);
  };

  return (
    <div ref={containerRef} className={styles.arcContainer}>
      {/* Dashed Downward U-Curve Arc Guide Line matching reference image */}
      <svg className={styles.arcSvg} viewBox="0 0 1000 210" preserveAspectRatio="none">
        <path
          d="M 180 12 Q 500 138 820 12"
          fill="none"
          stroke="rgba(232, 216, 160, 0.18)"
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
            ref={(el) => { beanRefs.current[brand.id] = el; }}
            className={`
              ${styles.beanOrbButton}
              ${styles[`slot_${slotName}`]}
              ${styles[`float_${idx % 5}`]}
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

            {/* Circular Glass Orb with 9-Star Emblem */}
            <div className={styles.glassOrbDisc}>
              <NineStarLogo
                size={isCenterActive ? 28 : 24}
                className={isCenterActive ? styles.starLogoActive : styles.starLogoInactive}
              />
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
