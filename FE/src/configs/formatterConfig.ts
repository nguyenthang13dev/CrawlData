import { FormatterType } from '../components/shared-components/FormatterInput';

export interface FormatterConfig {
  type: FormatterType;
  label: string;
  description: string;
  example: string;
  defaultProps?: {
    min?: number;
    max?: number;
    decimalPlaces?: number;
    showCurrency?: boolean;
    useInputNumber?: boolean;
  };
}

export const FORMATTER_CONFIGS: FormatterConfig[] = [
  {
    type: 'currency-vnd',
    label: 'Tiền VND (dấu chấm)',
    description: 'Định dạng tiền Việt Nam với dấu chấm phân cách nghìn',
    example: '1.000.000 ₫',
    defaultProps: {
      min: 0,
      showCurrency: true,
      decimalPlaces: 0,
      useInputNumber: true
    }
  },
  {
    type: 'currency-vnd-comma',
    label: 'Tiền VND (dấu phẩy)',
    description: 'Định dạng tiền Việt Nam với dấu phẩy phân cách nghìn',
    example: '1,000,000 ₫',
    defaultProps: {
      min: 0,
      showCurrency: true,
      decimalPlaces: 0,
      useInputNumber: true
    }
  },
  {
    type: 'number-dot',
    label: 'Số (dấu chấm)',
    description: 'Định dạng số với dấu chấm phân cách nghìn',
    example: '1.000.000',
    defaultProps: {
      min: 0,
      showCurrency: false,
      decimalPlaces: 0,
      useInputNumber: true
    }
  },
  {
    type: 'number-comma',
    label: 'Số (dấu phẩy)',
    description: 'Định dạng số với dấu phẩy phân cách nghìn',
    example: '1,000,000',
    defaultProps: {
      min: 0,
      showCurrency: false,
      decimalPlaces: 0,
      useInputNumber: true
    }
  },
  {
    type: 'percent',
    label: 'Phần trăm',
    description: 'Định dạng phần trăm với ký hiệu %',
    example: '25%',
    defaultProps: {
      min: 0,
      max: 100,
      decimalPlaces: 0,
      useInputNumber: true
    }
  },
  {
    type: 'decimal',
    label: 'Số thập phân',
    description: 'Định dạng số thập phân với số chữ số sau dấu phẩy cố định',
    example: '123.45',
    defaultProps: {
      decimalPlaces: 2,
      useInputNumber: true
    }
  },
  {
    type: 'phone',
    label: 'Số điện thoại',
    description: 'Định dạng số điện thoại Việt Nam',
    example: '0123-456-789',
    defaultProps: {
      useInputNumber: false
    }
  },
  {
    type: 'none',
    label: 'Không định dạng',
    description: 'Input thường không có định dạng đặc biệt',
    example: '123456',
    defaultProps: {
      useInputNumber: true
    }
  }
];

// Utility function để lấy config theo type
export const getFormatterConfig = (type: FormatterType): FormatterConfig | undefined => {
  return FORMATTER_CONFIGS.find(config => config.type === type);
};

// Utility function để lấy options cho Select dropdown
export const getFormatterOptions = () => {
  return FORMATTER_CONFIGS.map(config => ({
    label: `${config.label} (${config.example})`,
    value: config.type,
    description: config.description
  }));
};
