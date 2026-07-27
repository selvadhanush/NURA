// ============================================================
// NURA PERFUME — MULTI-CURRENCY CONFIG
// ============================================================
// Base currency: INR (Indian Rupee)
// All product prices in the data layer are stored in INR.
// Exchange rates here are static approximations.
// To connect a live API in the future, replace the `rate`
// values in CURRENCIES with values fetched from your API,
// keeping all other code unchanged.
// ============================================================

export type CurrencyCode = 'INR' | 'USD' | 'SAR' | 'AED' | 'GBP' | 'SGD' | 'MYR' | 'EUR';

export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
  /** Rate relative to INR (i.e., 1 INR = ? units of this currency) */
  rate: number;
  /** BCP 47 locale used by Intl.NumberFormat for number formatting */
  locale: string;
  /** Number of decimal places to display */
  decimals: number;
  /** Whether the symbol appears before or after the number */
  symbolPosition: 'before' | 'after';
}

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  INR: {
    code: 'INR',
    name: 'Indian Rupee',
    symbol: '₹',
    rate: 1,
    locale: 'en-IN',
    decimals: 0,
    symbolPosition: 'before',
  },
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    rate: 0.012,   // 1 INR ≈ 0.012 USD
    locale: 'en-US',
    decimals: 2,
    symbolPosition: 'before',
  },
  SAR: {
    code: 'SAR',
    name: 'Saudi Riyal',
    symbol: '﷼',
    rate: 0.045,   // 1 INR ≈ 0.045 SAR
    locale: 'ar-SA',
    decimals: 2,
    symbolPosition: 'before',
  },
  AED: {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'د.إ',
    rate: 0.044,   // 1 INR ≈ 0.044 AED
    locale: 'ar-AE',
    decimals: 2,
    symbolPosition: 'before',
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    rate: 0.0095,  // 1 INR ≈ 0.0095 GBP
    locale: 'en-GB',
    decimals: 2,
    symbolPosition: 'before',
  },
  SGD: {
    code: 'SGD',
    name: 'Singapore Dollar',
    symbol: 'S$',
    rate: 0.016,   // 1 INR ≈ 0.016 SGD
    locale: 'en-SG',
    decimals: 2,
    symbolPosition: 'before',
  },
  MYR: {
    code: 'MYR',
    name: 'Malaysian Ringgit',
    symbol: 'RM',
    rate: 0.055,   // 1 INR ≈ 0.055 MYR
    locale: 'ms-MY',
    decimals: 2,
    symbolPosition: 'before',
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    rate: 0.011,   // 1 INR ≈ 0.011 EUR
    locale: 'de-DE',
    decimals: 2,
    symbolPosition: 'before',
  },
};

/** Ordered list for the currency selector dropdown */
export const CURRENCY_ORDER: CurrencyCode[] = [
  'INR', 'USD', 'SAR', 'AED', 'GBP', 'SGD', 'MYR', 'EUR',
];

export const DEFAULT_CURRENCY: CurrencyCode = 'INR';

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Convert a base INR price to the target currency.
 * Formula: displayedPrice = inrPrice × currency.rate
 */
export function convertPrice(inrPrice: number, currency: Currency): number {
  return inrPrice * currency.rate;
}

/**
 * Format a converted price for display, including the symbol.
 * Examples: "₹10,320", "$120.00", "د.إ440.50", "RM510.20"
 */
export function formatPrice(inrPrice: number, currencyCode: CurrencyCode): string {
  const currency = CURRENCIES[currencyCode];
  const converted = convertPrice(inrPrice, currency);

  // Use Intl.NumberFormat for locale-aware number formatting
  const formatted = new Intl.NumberFormat(currency.locale, {
    minimumFractionDigits: currency.decimals,
    maximumFractionDigits: currency.decimals,
  }).format(converted);

  return currency.symbolPosition === 'before'
    ? `${currency.symbol}${formatted}`
    : `${formatted}${currency.symbol}`;
}

/**
 * Format price without symbol (for WhatsApp messages where we show symbol separately).
 */
export function formatPriceNumber(inrPrice: number, currencyCode: CurrencyCode): string {
  const currency = CURRENCIES[currencyCode];
  const converted = convertPrice(inrPrice, currency);
  return new Intl.NumberFormat(currency.locale, {
    minimumFractionDigits: currency.decimals,
    maximumFractionDigits: currency.decimals,
  }).format(converted);
}

/**
 * Get raw converted amount (unformatted number).
 */
export function getConvertedAmount(inrPrice: number, currencyCode: CurrencyCode): number {
  const currency = CURRENCIES[currencyCode];
  const rate = currency.rate;
  const decimals = currency.decimals;
  return parseFloat((inrPrice * rate).toFixed(decimals));
}
