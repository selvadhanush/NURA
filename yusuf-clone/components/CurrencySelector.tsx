'use client';

import { useState, useRef, useEffect } from 'react';
import { useCurrency } from './CurrencyContext';
import { CURRENCIES, CURRENCY_ORDER, CurrencyCode } from '../lib/currency';
import styles from './CurrencySelector.module.css';

interface CurrencySelectorProps {
  align?: 'left' | 'right';
  direction?: 'down' | 'up';
}

export default function CurrencySelector({
  align = 'right',
  direction = 'down'
}: CurrencySelectorProps) {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click or touch
  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const handleSelect = (code: CurrencyCode) => {
    setCurrency(code);
    setIsOpen(false);
  };

  const activeCurrency = CURRENCIES[currency];

  const dropdownClasses = [
    styles.dropdown,
    align === 'left' ? styles.alignLeft : styles.alignRight,
    direction === 'up' ? styles.directionUp : styles.directionDown
  ].join(' ');

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <button
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Currency: ${activeCurrency.code} ${activeCurrency.symbol}`}
        id="currency-trigger"
      >
        <span className={styles.globeIcon} aria-hidden="true">🌐</span>
        <span className={styles.triggerCode}>{activeCurrency.code}</span>
        <span className={styles.triggerSymbol}>{activeCurrency.symbol}</span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          width="10"
          height="10"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={dropdownClasses}
          role="listbox"
          aria-labelledby="currency-trigger"
        >
          <div className={styles.dropdownHeader}>
            <span className={styles.dropdownTitle}>Select Currency</span>
            <p className={styles.dropdownNotice}>
              Prices are approximate based on exchange rates.
              Final price confirmed via WhatsApp.
            </p>
          </div>

          <ul className={styles.optionList}>
            {CURRENCY_ORDER.map((code) => {
              const c = CURRENCIES[code];
              const isActive = code === currency;
              return (
                <li key={code} role="none">
                  <button
                    role="option"
                    aria-selected={isActive}
                    className={`${styles.option} ${isActive ? styles.optionActive : ''}`}
                    onClick={() => handleSelect(code)}
                  >
                    <span className={styles.optionCode}>{c.code}</span>
                    <span className={styles.optionName}>{c.name}</span>
                    <span className={styles.optionSymbol}>{c.symbol}</span>
                    {isActive && (
                      <svg
                        className={styles.checkIcon}
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 7l4 4 6-7"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
