/**
 * Utility functions cho định dạng tiền tệ VND
 */

// export const formatVND = (value: number | string | null | undefined, showCurrency = true): string => {
//   if (value === null || value === undefined || value === '') {
//     return '';
//   }

//   const numericValue = Number(value);
//   if (isNaN(numericValue)) {
//     return '';
//   }

//   const formatted = new Intl.NumberFormat('vi-VN').format(numericValue);
//   return showCurrency ? `${formatted} ₫` : formatted;
// };

export const formatVND = (
  value: number | string | null | undefined
): string => {
  if (!value) return "0";
  // return new Intl.NumberFormat("vi-VN").format(value).replace("VND", "").trim();
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const parseVND = (value: string | undefined): number => {
  if (!value) return 0;

  return Number(value.replace(/\./g, ""));

  // // Loại bỏ ký hiệu tiền tệ và dấu phân cách
  // const cleaned = value
  //   .replace(/\s?₫/g, "") // bỏ ký hiệu ₫
  //   .replace(/\./g, "") // bỏ dấu . (phân cách nghìn)
  //   .replace(/,/g, "") // bỏ dấu , (phòng TH copy từ nguồn khác)
  //   .replace(/[^\d]/g, ""); // chỉ giữ lại số

  // return cleaned === "" ? 0 : Number(cleaned);
};

export const formatCurrency = (
  value: number | string,
  options?: {
    currency?: string;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string => {
  const {
    currency = "VND",
    locale = "vi-VN",
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options || {};

  const numericValue = Number(value);
  if (isNaN(numericValue)) return "";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(numericValue);
};

// Validator cho số tiền
export const validateMoney = (value: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!value) {
      resolve();
      return;
    }

    const numericValue = Number(value);
    if (isNaN(numericValue)) {
      reject(new Error("Giá trị không hợp lệ"));
      return;
    }

    if (numericValue < 0) {
      reject(new Error("Giá trị không được âm"));
      return;
    }

    if (numericValue > 999999999999) {
      // 999 tỷ
      reject(new Error("Giá trị quá lớn"));
      return;
    }

    resolve();
  });
};
