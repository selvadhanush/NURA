'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import Link from 'next/link';
import { useCart } from './CartContext';

export default function Header() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsCartOpen, totalItems } = useCart();

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        setIsScrolled(window.scrollY > 50);
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

  const isHome = pathname === '/';
  const headerClasses = [
    styles.header,
    !isVisible ? styles.headerHidden : '',
    isHome ? styles.headerHome : '',
    isHome && !isScrolled ? styles.headerTransparent : ''
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses}>
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
              <span className={styles.brandTitle}>
                NUR<span className={styles.flippedV}>V</span>
              </span>
              <span className={styles.brandSubtitle}>BY BIN SADHIK</span>
            </Link>
          </div>

          <button 
            className={styles.cartButton}
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open shopping cart. ${totalItems} items`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </button>
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
          <li><Link href="/perfume-oil" onClick={() => setIsMenuOpen(false)}>PERFUME OILS</Link></li>
          <li><Link href="/create" onClick={() => setIsMenuOpen(false)}>FRAGRANCE FINDER</Link></li>
          <li><Link href="/contact" onClick={() => setIsMenuOpen(false)}>CONTACT US</Link></li>
          <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>ABOUT US</Link></li>
        </ul>
      </nav>
    </header>
  );
}
