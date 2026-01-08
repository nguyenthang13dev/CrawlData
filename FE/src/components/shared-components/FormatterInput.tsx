import { Input, InputNumber, InputNumberProps, InputProps } from 'antd';
import React from 'react';

export type FormatterType = 
  | 'currency-vnd'      // 100.000 ₫
  | 'currency-vnd-comma' // 100,000 ₫  
  | 'number-dot'        // 100.000
  | 'number-comma'      // 100,000
  | 'percent'           // 25%
  | 'decimal'           // 100.50
  | 'phone'             // 0123-456-789
  | 'none';             // không format

interface FormatterInputProps extends Omit<InputNumberProps<number>, 'formatter' | 'parser'> {
  formatterType?: FormatterType;
  showCurrency?: boolean;
  decimalPlaces?: number;
  customSuffix?: string;
  useInputNumber?: boolean; // true = InputNumber, false = Input
}

const FormatterInput: React.FC<FormatterInputProps> = ({
  formatterType = 'none',
  showCurrency = true,
  decimalPlaces = 0,
  customSuffix,
  useInputNumber = true,
  ...props
}) => {
  
  // Di chuyển useState và useEffect ra ngoài để tránh conditional hooks
  const [displayValue, setDisplayValue] = React.useState('');
  
  const getFormatter = React.useCallback((type: FormatterType) => {
    return (value: any): string => {
      if (value === undefined || value === null || value === '') {
        return '';
      }

      const numericValue = Number(value);
      if (isNaN(numericValue)) return '';

      switch (type) {
        case 'currency-vnd':
          const formatted = new Intl.NumberFormat('vi-VN', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
          }).format(numericValue);
          return showCurrency ? `${formatted} ₫` : formatted;

        case 'currency-vnd-comma':
          const formattedComma = numericValue.toLocaleString('en-US', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
          });
          return showCurrency ? `${formattedComma} ₫` : formattedComma;

        case 'number-dot':
          return new Intl.NumberFormat('vi-VN', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
          }).format(numericValue);

        case 'number-comma':
          return numericValue.toLocaleString('en-US', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
          });

        case 'percent':
          return `${numericValue}%`;

        case 'decimal':
          return numericValue.toFixed(decimalPlaces);

        case 'phone':
          const phoneStr = String(numericValue).replace(/\D/g, '');
          if (phoneStr.length >= 10) {
            return phoneStr.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3');
          }
          return phoneStr;

        default:
          return String(numericValue);
      }
    };
  }, [decimalPlaces, showCurrency]);

  const getParser = React.useCallback((type: FormatterType) => {
    return (value: string | undefined): number => {
      if (!value) return 0;

      let cleaned = value;
      
      switch (type) {
        case 'currency-vnd':
        case 'currency-vnd-comma':
        case 'number-dot':
          cleaned = value
            .replace(/\s?₫/g, '')
            .replace(/\./g, '')
            .replace(/,/g, '')
            .replace(/[^\d]/g, '');
          break;

        case 'number-comma':
          cleaned = value
            .replace(/\s?₫/g, '')
            .replace(/,/g, '')
            .replace(/[^\d.]/g, '');
          break;

        case 'percent':
          cleaned = value.replace(/%/g, '').replace(/[^\d.]/g, '');
          break;

        case 'phone':
          cleaned = value.replace(/[^\d]/g, '');
          break;

        default:
          cleaned = value.replace(/[^\d.]/g, '');
      }

      const result = cleaned === '' ? 0 : Number(cleaned);
      return isNaN(result) ? 0 : result;
    };
  }, []);

  React.useEffect(() => {
    if (props.value !== undefined && !useInputNumber) {
      setDisplayValue(getFormatter(formatterType)(props.value));
    }
  }, [props.value, formatterType, getFormatter, useInputNumber]);

  const commonProps = {
    style: { width: '100%', ...(props.style || {}) },
    placeholder: props.placeholder || getPlaceholder(formatterType),
  };

  if (useInputNumber) {
    return (
      <InputNumber
        {...props}
        {...commonProps}
        formatter={getFormatter(formatterType)}
        parser={getParser(formatterType)}
      />
    );
  } else {
    // Sử dụng Input thường với onChange tự format
    return (
      <Input
        {...(props as InputProps)}
        {...commonProps}
        value={displayValue}
        onChange={(e) => {
          const rawValue = e.target.value;
          const parsedValue = getParser(formatterType)(rawValue);
          const formattedValue = getFormatter(formatterType)(parsedValue);
          
          setDisplayValue(formattedValue);
          
          if (props.onChange) {
            props.onChange(parsedValue as any);
          }
        }}
      />
    );
  }
};

const getPlaceholder = (type: FormatterType): string => {
  switch (type) {
    case 'currency-vnd':
      return 'Nhập số tiền (VD: 100.000 ₫)';
    case 'currency-vnd-comma':
      return 'Nhập số tiền (VD: 100,000 ₫)';
    case 'number-dot':
      return 'Nhập số (VD: 100.000)';
    case 'number-comma':
      return 'Nhập số (VD: 100,000)';
    case 'percent':
      return 'Nhập % (VD: 25%)';
    case 'decimal':
      return 'Nhập số thập phân';
    case 'phone':
      return 'Nhập số điện thoại';
    default:
      return 'Nhập giá trị';
  }
};

export default FormatterInput;
