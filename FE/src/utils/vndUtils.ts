/**
 * Utility functions đơn giản cho format tiền Việt Nam
 */

// Format số thành tiền VND
export const formatVndCurrency = (
  value: number | string, 
  options?: {
    showSymbol?: boolean;
    useDotSeparator?: boolean;
  }
): string => {
  const { showSymbol = true, useDotSeparator = true } = options || {};
  
  const numericValue = Number(value);
  if (isNaN(numericValue)) return '';
  
  let formatted: string;
  
  if (useDotSeparator) {
    // Định dạng Việt Nam: 1.000.000
    formatted = new Intl.NumberFormat('vi-VN').format(numericValue);
  } else {
    // Định dạng Mỹ: 1,000,000
    formatted = new Intl.NumberFormat('en-US').format(numericValue);
  }
  
  return showSymbol ? `${formatted} ₫` : formatted;
};

// Parse chuỗi tiền VND thành số
export const parseVndCurrency = (value: string): number => {
  if (!value) return 0;
  
  // Loại bỏ ký hiệu tiền tệ và dấu phân cách
  const cleaned = value
    .replace(/\s?₫/g, '')      // bỏ ký hiệu ₫
    .replace(/\./g, '')        // bỏ dấu . 
    .replace(/,/g, '')         // bỏ dấu ,
    .replace(/[^\d]/g, '');    // chỉ giữ lại số
  
  return cleaned === '' ? 0 : Number(cleaned);
};

// Validator cho input tiền
export const validateVndAmount = (value: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!value) {
      resolve();
      return;
    }
    
    const numericValue = Number(value);
    if (isNaN(numericValue)) {
      reject(new Error('Số tiền không hợp lệ'));
      return;
    }
    
    if (numericValue < 0) {
      reject(new Error('Số tiền không được âm'));
      return;
    }
    
    if (numericValue > 999999999999) { // 999 tỷ
      reject(new Error('Số tiền quá lớn (tối đa 999 tỷ)'));
      return;
    }
    
    resolve();
  });
};

// Format cho hiển thị trong bảng (ngắn gọn)
export const formatVndShort = (value: number): string => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)} tỷ`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)} tr`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)} k`;
  }
  return value.toString();
};
