import styles from './Header.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link href="/">N U R A</Link>
          </div>
          <div className={styles.icons}>
            <button className={styles.iconBtn} aria-label="Account">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </button>
            <button className={styles.iconBtn} aria-label="Search">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
            <button className={styles.iconBtn} aria-label="Cart">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li><Link href="/">HOME</Link></li>
          <li><Link href="/collections">COLLECTIONS</Link></li>
          <li><Link href="/brand-inspiration">BRAND INSPIRATION</Link></li>
          <li><Link href="/perfume-oil">PERFUME OIL</Link></li>
          <li><Link href="/bakhoor">BAKHOOR</Link></li>
          <li><Link href="/candle">CANDLE</Link></li>
          <li><Link href="/create">CREATE</Link></li>
          <li><Link href="/about">ABOUT US</Link></li>
        </ul>
      </nav>
    </header>
  );
}
