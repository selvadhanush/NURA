'use client';

import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import Link from 'next/link';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
          setIsMenuOpen(false); // Close menu on scroll down
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className={`${styles.header} ${!isVisible ? styles.headerHidden : ''}`}>
      <div className={styles.topBar}>
        <div className={styles.container}>
          <button 
            className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle Navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <div className={styles.logo}>
            <Link href="/" onClick={() => setIsMenuOpen(false)} className={styles.logoLink}>
              <span className={styles.brandTitle}>NURA</span>
              <span className={styles.brandSubtitle}>BY BIN SADHIK</span>
            </Link>
          </div>
        </div>
      </div>

      {isMenuOpen && <div className={styles.overlay} onClick={() => setIsMenuOpen(false)}></div>}
      
      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <ul className={styles.navList}>
          <li><Link href="/" onClick={() => setIsMenuOpen(false)}>HOME</Link></li>
          <li><Link href="/perfume" onClick={() => setIsMenuOpen(false)}>PERFUMES</Link></li>
          <li><Link href="/perfume-oil" onClick={() => setIsMenuOpen(false)}>OIL</Link></li>
          <li><Link href="/circle-of-light" onClick={() => setIsMenuOpen(false)}>CIRCLE OF LIGHT</Link></li>
          <li><Link href="/create" onClick={() => setIsMenuOpen(false)}>CHOOSE YOUR FRAGRANCE</Link></li>
          <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>ABOUT US</Link></li>
        </ul>
      </nav>
    </header>
  );
}
