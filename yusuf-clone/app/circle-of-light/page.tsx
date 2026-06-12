'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import styles from './page.module.css';

const ITEMS = [
  {
    id: 'meaning',
    name: 'THE CIRCLE OF LIGHT',
    description: 'This connects the meaning of Nura (Light) to the act of bringing light to someone’s life.',
    icon: 'I',
    color: '255, 240, 180' // Bright light
  },
  {
    id: 'charity',
    name: 'A FORCE FOR GOOD',
    description: 'Your purchase completes the NURA by Bin Sadhik. We donate 2.5% of our profits to charity, turning luxury into a force for good. Thank you for sharing the light.',
    icon: 'II',
    color: '100, 255, 150' // Growth/charity green
  },
  {
    id: 'purification',
    name: 'PURIFICATION OF TRADE',
    description: "We don't view this as charity; we view it as a Purification of Trade. When you choose N U R A by Bin Sadhik, you are not just investing in a premium fragrance—you are fueling a movement of light and restoration.",
    icon: 'III',
    color: '255, 255, 255' // Pure white
  },
  {
    id: 'future',
    name: 'BRIGHTER FUTURES',
    description: 'Your presence is felt. Their future is brightened.',
    icon: 'IV',
    color: '255, 180, 80' // Warm amber/future
  },
  {
    id: 'identity',
    name: 'AN IDENTITY',
    description: 'N U R A by Bin Sadhik | More Than a Fragrance. An Identity.',
    icon: 'V',
    color: '194, 167, 122' // Signature Nura Gold
  }
];

export default function CircleOfLight() {
  const [selectedIndex, setSelectedIndex] = useState(2); // Start with middle item
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [tempRotation, setTempRotation] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Position beans on the bottom half of the circle
  // We want them spread across an arc of about 90 degrees (from 45 to 135)
  // But wait, the center is ABOVE the screen, so the bottom of the circle is what's visible.
  // The bottom center is 90 degrees. Let's spread from 60 to 120.
  const [radius, setRadius] = useState(500);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 480) setRadius(300);
      else if (width < 768) setRadius(400);
      else setRadius(500);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const beanPositions = useMemo(() => {
    const startAngle = 60;
    const endAngle = 120;
    const step = (endAngle - startAngle) / (ITEMS.length - 1);

    return ITEMS.map((_, i) => {
      const angle = startAngle + (i * step);
      const rad = (angle * Math.PI) / 180;
      const x = radius + radius * Math.cos(rad);
      const y = radius + radius * Math.sin(rad);
      return { x, y, angle: angle - 90 };
    });
  }, [radius]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setTempRotation(rotation);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    // Sensivity adjustment
    const newRotation = tempRotation + (deltaX * 0.1);
    setRotation(newRotation);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    // Snap to nearest bean
    // Each bean is roughly 15 degrees apart ((120-60)/4)
    const step = (120 - 60) / (ITEMS.length - 1);
    // The rotation needed to bring a bean to the bottom center (which is 90 deg)
    // Current rotation 0 means the 3rd bean (index 2) is at 90 deg.
    // To bring bean i to 90 deg, we need to rotate by (90 - originalAngle)

    // Let's find which bean is closest to the "active" zone (center)
    // The active zone is at angle 90 relative to the circle.
    // The beans are at angles: 60, 75, 90, 105, 120
    // If rotation is R, then effective angle of bean i is originalAngle + R
    // We want effective angle to be close to 90.
    // originalAngle + R = 90  => i = index that minimizes |originalAngle + R - 90|

    let closestIndex = selectedIndex;
    let minDiff = Infinity;

    ITEMS.forEach((_, i) => {
      const originalAngle = 60 + (i * step);
      const effectiveAngle = originalAngle + rotation;
      const diff = Math.abs(effectiveAngle - 90);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    });

    setSelectedIndex(closestIndex);
    // Snap rotation
    const targetRotation = 90 - (60 + (closestIndex * step));
    setRotation(targetRotation);
  };

  const activeItem = ITEMS[selectedIndex];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>CIRCLE OF LIGHT</h1>
        <p>Discover the essence of NURA</p>
      </div>

      <div
        className={styles.arcWrapper}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div
          className={styles.arcContainer}
          style={{
            transform: `rotate(${rotation}deg)`,
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            top: `-${radius * 2 - 50}px`, // Adjusted to bring arc much closer to the top
            '--radius': `${radius}px`
          } as React.CSSProperties}
        >
          {ITEMS.map((item, i) => (
            <button
              key={item.id}
              className={`${styles.bean} ${selectedIndex === i ? styles.beanActive : ''}`}
              style={{
                left: `${beanPositions[i].x - 30}px`,
                top: `${beanPositions[i].y - 30}px`,
                transform: `rotate(${-rotation}deg)` // Keep icons upright
              }}
              onClick={() => {
                setSelectedIndex(i);
                const step = (120 - 60) / (ITEMS.length - 1);
                setRotation(90 - (60 + (i * step)));
              }}
            >
              <span className={styles.beanIcon}>
                <img 
                  src="/nura-logo.png" 
                  alt="NURA Logo" 
                  className={`${styles.beanLogo} ${selectedIndex === i ? styles.beanLogoActive : ''}`} 
                />
              </span>
            </button>
          ))}
        </div>

        <div className={styles.lightContainer} key={`beam-${activeItem.id}`}>
          <div
            className={`${styles.lightBeam} ${styles.lightBeamActive}`}
            style={{ 
              top: '80px', // Perfectly aligned directly below the 60px bean (which is at 50px top)
              '--beam-color': activeItem.color
            } as any}
          />
        </div>
      </div>

      <div className={styles.contentArea}>
        <div className={styles.card} key={activeItem.id}>
          <h2>{activeItem.name}</h2>
          <p>{activeItem.description}</p>
        </div>
      </div>

      <div className={styles.swipeHint}>
        Swipe to explore our mission
      </div>
    </div>
  );
}
