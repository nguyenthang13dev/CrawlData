// src/utils/formatter.ts

export const formatNumberWithCustomSeparators = (
  value: number | string | undefined | null
): string => {
  if (value === undefined || value === null || value === "") {
    return "--";
  }

  const num = Number(String(value).replace(",", ".")); // Ensure input comma is treated as decimal point for Number()

  if (isNaN(num)) {
    // If the original value was a string that couldn't be converted to a number,
    // and it's not an empty string (already handled), return it as is.
    return String(value);
  }

  // Format the number to a string with a period for thousands and comma for decimal.
  const parts = num.toFixed(10).split("."); // Use toFixed to handle potential floating point inaccuracies and get a consistent decimal part
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const decimalPart = parts[1] ? parts[1].replace(/0+$/, "") : ""; // Remove trailing zeros

  if (decimalPart.length > 0) {
    return `${integerPart},${decimalPart}`;
  }
  return integerPart;
};
