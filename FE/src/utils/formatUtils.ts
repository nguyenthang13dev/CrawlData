/**
 * Format a number as Vietnamese currency
 * @param value The number to format
 * @param currency The currency symbol (default: 'VND')
 * @returns Formatted currency string (e.g., "1.000.000 VND")
 */
export const formatCurrency = (value?: number | null, currency: string = 'VND'): string => {
  if (value == null) return '0 ' + currency;

  return new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(value) + ' ' + currency;
};

/**
 * Format a number with thousand separators
 * @param value The number to format
 * @returns Formatted number string with thousand separators (e.g., "1.000.000")
 */
export const formatNumber = (value?: number | null): string => {
  if (value == null) return '0';

  return new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(value);
};
