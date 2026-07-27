'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

const ITEMS = [
  { id: 0, title: 'Purifying Trade',         desc: 'We believe trade itself must be purified. Every transaction is an act of service and stewardship toward a better world.',            details: ['Transparent sourcing', 'Ethical supplier partnerships', 'No exploitative margins'] },
  { id: 1, title: 'Primary Education',        desc: 'Funding school scholarships, learning materials, and basic computer labs for underprivileged communities in rural districts.',      details: ['Rural school scholarships', 'Computer literacy kits', 'School supply distributions'] },
  { id: 2, title: 'The Circle of Light',      desc: 'In Arabic, NURA (نُور) means light. 10% of every sale radiates back into the world — a cycle of luxury and compassion.',          details: ['10% of all profits donated', 'Directly to verified programs', '100% transparency'] },
  { id: 3, title: 'Clean Water',              desc: 'Constructing sustainable tube-wells and water purification systems to provide communities with safe drinking water year-round.',     details: ['Community tube-wells', 'Solar-powered filtration', 'Water health awareness'] },
  { id: 4, title: 'Vocational Training',      desc: 'Supporting craft workshops and tailoring programs that empower women with lasting financial independence and creative skills.',     details: ['Stitching & textile workshops', 'Business basics training', 'Micro-grants for equipment'] },
];

// 5 visual slots: 0=center, 1=inner-right, 2=outer-right, 3=outer-left, 4=inner-left
function getSlot(idx: number, active: number): number {
  return ((idx - active) + 5) % 5;
}

const SLOT_NAMES = ['center', 'innerRight', 'outerRight', 'outerLeft', 'innerLeft'];

export default function CircleOfLight() {
  const [active, setActive] = useState(2); // default center = item 2

  const handleSelect = (idx: number) => setActive(idx);

  const current = ITEMS[active];

  return (
    <div className={styles.page}>

      {/* ══ HERO ARC ══ */}
      <section className={styles.arcHero}>
        <div className={styles.arcBg} />

        {/* Page title */}
        <div className={styles.arcTitle}>
          <h1>CIRCLE OF LIGHT</h1>
          <p className={styles.arcSubtitle}>Discover the essence of NURA</p>
        </div>

        {/* Spotlight SVG beam */}
        <svg className={styles.spotlightSvg} viewBox="0 0 1000 600" preserveAspectRatio="xMidYMax meet">
          <defs>
            {/* Main spotlight gradient - top bright → bottom fade */}
            <linearGradient id="spotGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.92)" />
              <stop offset="25%"  stopColor="rgba(230,220,180,0.55)" />
              <stop offset="60%"  stopColor="rgba(194,167,122,0.18)" />
              <stop offset="100%" stopColor="rgba(194,167,122,0)" />
            </linearGradient>
            {/* Soft edge mask */}
            <linearGradient id="maskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="black" />
              <stop offset="20%"  stopColor="white" />
              <stop offset="80%"  stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </linearGradient>
            <mask id="spotMask">
              <rect width="1000" height="600" fill="url(#maskGrad)" />
            </mask>
            {/* Glow filter for center pebble */}
            <filter id="pebbleGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="18" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="8" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Outer ambient halo */}
          <ellipse cx="500" cy="355" rx="60" ry="55"
            fill="rgba(255,255,240,0.12)" filter="url(#pebbleGlow)" />

          {/* Spotlight triangle beam */}
          <polygon
            points="500,360 200,600 800,600"
            fill="url(#spotGrad)"
            mask="url(#spotMask)"
            className={styles.spotBeam}
          />

          {/* Inner brighter core of beam */}
          <polygon
            points="500,360 380,600 620,600"
            fill="rgba(255,255,240,0.22)"
            className={styles.spotBeamCore}
          />
        </svg>

        {/* 5 Pebbles */}
        {ITEMS.map((item, idx) => {
          const slot = getSlot(idx, active);
          const slotName = SLOT_NAMES[slot];
          const isCenter = slot === 0;
          return (
            <button
              key={item.id}
              className={`${styles.pebble} ${styles[`slot_${slotName}`]} ${isCenter ? styles.pebbleCenter : ''}`}
              onClick={() => handleSelect(idx)}
              aria-label={item.title}
              aria-pressed={isCenter}
            >
              {/* Cross/star icon */}
              <svg className={styles.pebbleIcon} viewBox="0 0 40 40" fill="none">
                <path d="M20 4 L20 36 M4 20 L36 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M8 8 L32 32 M32 8 L8 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                <circle cx="20" cy="20" r="3" fill="currentColor"/>
                <circle cx="20" cy="8" r="1.5" fill="currentColor" opacity="0.5"/>
                <circle cx="20" cy="32" r="1.5" fill="currentColor" opacity="0.5"/>
                <circle cx="8" cy="20" r="1.5" fill="currentColor" opacity="0.5"/>
                <circle cx="32" cy="20" r="1.5" fill="currentColor" opacity="0.5"/>
              </svg>
              {/* Glow ring for active */}
              {isCenter && <span className={styles.pebbleRing} />}
            </button>
          );
        })}
      </section>

      {/* ══ CARD BELOW LIGHT ══ */}
      <section className={styles.cardSection}>
        {/* Top fade bridge from spotlight */}
        <div className={styles.cardBridge} />

        <div className={styles.cardInner} key={active}>
          <h2 className={styles.cardTitle}>{current.title}</h2>
          <p className={styles.cardDesc}>{current.desc}</p>
          <ul className={styles.cardDetails}>
            {current.details.map((d, i) => (
              <li key={i}><span className={styles.bullet}>✦</span>{d}</li>
            ))}
          </ul>

          {/* Pebble dots nav */}
          <div className={styles.dotsRow}>
            <button className={styles.navArrow} onClick={() => setActive((active + 4) % 5)}>←</button>
            <div className={styles.dots}>
              {ITEMS.map((_, i) => (
                <button key={i}
                  className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={ITEMS[i].title}
                />
              ))}
            </div>
            <button className={styles.navArrow} onClick={() => setActive((active + 1) % 5)}>→</button>
          </div>
        </div>
      </section>

      {/* ══ STATS + STORY + CTA ══ */}
      <div className={styles.container}>
        <div className={styles.statsSection}>
          {[['10%','Of All Profits Donated'],['100%','Direct Educational Aid'],['3,000+','Hours of Vocational Work']].map(([n,l]) => (
            <div key={n} className={styles.statCard}>
              <span className={styles.statNumber}>{n}</span>
              <span className={styles.statLabel}>{l}</span>
            </div>
          ))}
        </div>

        <div className={styles.storySection}>
          <div className={styles.storyCard}>
            <h2>What is the Circle of Light?</h2>
            <p>In Arabic, <strong>NURA (نُور)</strong> means light. Our brand was founded on a simple but powerful premise: luxury commerce should not just extract value, but actively radiate light and compassion to the world.</p>
            <p>The <strong>Circle of Light</strong> is our manifesto — a continuous loop where fine perfumery translates directly into social welfare.</p>
          </div>
          <div className={styles.storyCard}>
            <h2>The Purification of Trade</h2>
            <p>By dedicating <strong>10% of all profits</strong> from every bottle sold to education and wellness initiatives, we ensure our growth directly translates into the elevation of others.</p>
            <p>We call this the <em>Purification of Trade</em> — commerce that is clean, transparent, and bound to the service of humanity.</p>
          </div>
        </div>

        <div className={styles.closingCall}>
          <h2>A Partnership of Light</h2>
          <p>Every time you wear a NURA fragrance, you carry this mission with you. Thank you for participating in this cycle of change.</p>
          <div className={styles.btnRow}>
            <Link href="/collections" className={styles.primaryBtn}>EXPLORE THE FRAGRANCES</Link>
            <Link href="/about" className={styles.secondaryBtn}>OUR BRAND HERITAGE</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
