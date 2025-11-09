/**
 * Number utility functions
 */

export const formatCurrency = (
  amount: number,
  locale: string = 'en-US',
  currency: string = 'USD',
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatNumber = (
  number: number,
  locale: string = 'en-US',
): string => {
  return new Intl.NumberFormat(locale).format(number);
};

