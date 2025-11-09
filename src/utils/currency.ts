/**
 * Currency conversion utility functions
 */

import type { Currency } from '@/features/transactions/types';

// Exchange rates to EUR (base currency)
// These are approximate rates - in production, you might want to fetch from an API
const EXCHANGE_RATES: Record<Currency, number> = {
  EUR: 1.0, // Base currency
  USD: 0.92, // 1 USD = 0.92 EUR (approximate)
  UAH: 0.024, // 1 UAH = 0.024 EUR (approximate)
};

/**
 * Converts an amount from one currency to EUR
 * @param amount - Amount to convert
 * @param fromCurrency - Source currency
 * @returns Amount in EUR
 */
export const convertToEUR = (amount: number, fromCurrency: Currency): number => {
  if (fromCurrency === 'EUR') {
    return amount;
  }
  const rate = EXCHANGE_RATES[fromCurrency];
  return amount * rate;
};

/**
 * Gets the exchange rate from a currency to EUR
 * @param currency - Currency to get rate for
 * @returns Exchange rate to EUR
 */
export const getExchangeRateToEUR = (currency: Currency): number => {
  return EXCHANGE_RATES[currency];
};

