import { InputNumber, InputNumberProps } from 'antd';
import React from 'react';

interface VndCurrencyInputProps extends Omit<InputNumberProps<number>, 'formatter' | 'parser'> {
  showSymbol?: boolean; // hiển thị ký hiệu ₫
  useDotSeparator?: boolean; // true: 1.000.000, false: 1,000,000
}

const VndCurrencyInput: React.FC<VndCurrencyInputProps> = ({
  showSymbol = true,
  useDotSeparator = true,
  ...props
}) => {
  
  const formatter = (value: any): string => {
    if (value === undefined || value === null || value === '') {
      return '';
    }
    
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

  const parser = (value: string | undefined): number => {
    if (!value) return 0;
    
    // Loại bỏ ký hiệu tiền tệ và dấu phân cách
    const cleaned = value
      .replace(/\s?₫/g, '')      // bỏ ký hiệu ₫
      .replace(/\./g, '')        // bỏ dấu . 
      .replace(/,/g, '')         // bỏ dấu ,
      .replace(/[^\d]/g, '');    // chỉ giữ lại số
    
    return cleaned === '' ? 0 : Number(cleaned);
  };

  return (
    <InputNumber
      {...props}
      style={{ width: '100%', ...(props.style || {}) }}
      min={props.min ?? 0}
      formatter={formatter}
      parser={parser}
      placeholder={props.placeholder || (useDotSeparator ? 'VD: 1.000.000' : 'VD: 1,000,000')}
    />
  );
};

export default VndCurrencyInput;
