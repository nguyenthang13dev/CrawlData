import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

/**
 * Converts a date to an ISO string representing midnight UTC of that date.
 * If the input is null, undefined, or an invalid date, it returns null.
 * @param date The date to convert (can be Dayjs object, string, Date object, null, or undefined).
 * @returns ISO string (e.g., "2023-10-26T00:00:00.000Z") or null.
 */
export const formatDateToUtcStartOfDayISO = (date: any): string | null => {
  if (date === null || typeof date === 'undefined') {
    return null;
  }
  const d = dayjs(date);
  if (!d.isValid()) {
    // Optionally, you could log an error or return the original invalid input,
    // but for consistency with backend expectations of null for bad dates, returning null.
    console.warn('Invalid date provided to formatDateToUtcStartOfDayISO:', date);
    return null;
  }
  // Format to YYYY-MM-DD to effectively strip time, then interpret as UTC, then toISOString.
  // This ensures that if local time was e.g. 2023-10-26 03:00:00 GMT+7,
  // it becomes 2023-10-26T00:00:00.000Z
  return dayjs.utc(d.format('DD/MM/YYYY')).toISOString();
};

