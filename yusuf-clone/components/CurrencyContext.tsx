'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  CurrencyCode,
  DEFAULT_CURRENCY,
  formatPrice,
  formatPriceNumber,
  getConvertedAmount,
  CURRENCIES,
} from '../lib/currency';

// ============================================================
// TYPES
// ============================================================

interface CurrencyContextType {
  /** Currently selected currency code */
  currency: CurrencyCode;
  /** Change the active currency and persist to localStorage */
  setCurrency: (code: CurrencyCode) => void;
  /** Format an INR base price for display in the active currency */
  fmt: (inrPrice: number) => string;
  /** Format price as number string (no symbol) */
  fmtNum: (inrPrice: number) => string;
  /** Get raw converted number */
  getAmount: (inrPrice: number) => number;
  /** Symbol for the active currency */
  symbol: string;
  /** Full currency name */
  currencyName: string;
}

// ============================================================
// CONTEXT
// ============================================================

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const STORAGE_KEY = 'nura_currency';

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);

  // Restore from localStorage on mount (client-only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
      if (saved && CURRENCIES[saved]) {
        setCurrencyState(saved);
      }
    } catch {
      // Silently fail if localStorage is unavailable
    }
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Silently fail if localStorage is unavailable
    }
  }, []);

  const fmt = useCallback(
    (inrPrice: number) => formatPrice(inrPrice, currency),
    [currency]
  );

  const fmtNum = useCallback(
    (inrPrice: number) => formatPriceNumber(inrPrice, currency),
    [currency]
  );

  const getAmount = useCallback(
    (inrPrice: number) => getConvertedAmount(inrPrice, currency),
    [currency]
  );

  const symbol = CURRENCIES[currency].symbol;
  const currencyName = CURRENCIES[currency].name;

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, fmt, fmtNum, getAmount, symbol, currencyName }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

// ============================================================
// HOOK
// ============================================================

/**
 * useCurrency — access currency state and formatting utilities.
 *
 * Example:
 *   const { fmt, currency } = useCurrency();
 *   <p>{fmt(product.oilPrice6ml)}</p>
 */
export function useCurrency(): CurrencyContextType {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return ctx;
}
