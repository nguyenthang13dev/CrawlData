export interface FormatConfig {
  id?: string;
  fieldName: string;
  formatType: 'currency' | 'number' | 'percent' | 'phone' | 'custom';
  separator: 'dot' | 'comma'; // dấu chấm hoặc phẩy
  suffix: string; // ₫, VNĐ, %, etc.
  prefix?: string; // tiền tố nếu cần
  decimalPlaces?: number; // số chữ số thập phân
  showSymbol: boolean; // hiển thị ký hiệu hay không
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FormatConfigCreateOrUpdate {
  id?: string;
  fieldName: string;
  formatType: 'currency' | 'number' | 'percent' | 'phone' | 'custom';
  separator: 'dot' | 'comma';
  suffix: string;
  prefix?: string;
  decimalPlaces?: number;
  showSymbol: boolean;
  isActive: boolean;
}
