import { InputNumber, InputNumberProps } from 'antd';
import React from 'react';

interface VndInputNumberProps extends Omit<InputNumberProps<number>, 'formatter' | 'parser'> {
  showCurrency?: boolean; // hiển thị ký hiệu ₫ hay không
}

const VndInputNumber: React.FC<VndInputNumberProps> = ({ 
  showCurrency = true, 
  ...props 
}) => {
  return (
    <InputNumber
      {...props}
      style={{ width: '100%', ...(props.style || {}) }}
      min={props.min ?? 0}
      formatter={(value) => {
        if (value === undefined || value === null ) {
          return '';
        }
        
        const formatted = new Intl.NumberFormat('vi-VN').format(Number(value));
        return showCurrency ? `${formatted} ₫` : formatted;
      }}
      parser={(value) => {
        if (!value) return 0;
        
        // Loại bỏ ký hiệu tiền tệ và dấu phân cách
        const cleaned = value
          .replace(/\s?₫/g, '')    // bỏ ký hiệu ₫
          .replace(/\./g, '')      // bỏ dấu . (phân cách nghìn)
          .replace(/,/g, '')       // bỏ dấu , (phòng TH copy từ nguồn khác)
          .replace(/[^\d]/g, '');  // chỉ giữ lại số
        
        return cleaned === '' ? 0 : Number(cleaned);
      }}
      placeholder={props.placeholder || 'Nhập số tiền'}
    />
  );
};

export default VndInputNumber;
