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
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <span>N</span><span>U</span><span>R</span><span className={styles.flippedV}>V</span>
            </Link>
          </div>
        </div>
      </div>
      
      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <ul className={styles.navList}>
          <li><Link href="/" onClick={() => setIsMenuOpen(false)}>HOME</Link></li>
          <li><Link href="/collections" onClick={() => setIsMenuOpen(false)}>PERFUMES</Link></li>
          <li><Link href="/perfume-oil" onClick={() => setIsMenuOpen(false)}>OIL</Link></li>
          <li><Link href="/candle" onClick={() => setIsMenuOpen(false)}>CIRCLE OF LIGHT</Link></li>
          <li><Link href="/create" onClick={() => setIsMenuOpen(false)}>CHOOSE YOUR FRAGRANCE</Link></li>
          <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>ABOUT US</Link></li>
        </ul>
      </nav>
    </header>
  );
}
