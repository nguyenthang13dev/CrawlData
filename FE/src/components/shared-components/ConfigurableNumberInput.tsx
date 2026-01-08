import { Card, Col, Input, InputNumber, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';

export interface NumberFormatConfig {
  thousandSeparator: ',' | '.';  // Dấu phân cách nghìn
  decimalSeparator: ',' | '.';   // Dấu phân cách thập phân  
  suffix: string;                // Hậu tố (₫, VNĐ, %, etc.)
  prefix: string;                // Tiền tố ($, etc.)
  decimalPlaces: number;         // Số chữ số thập phân
}

interface ConfigurableNumberInputProps {
  value?: number;
  onChange?: (value: number | null) => void;
  onFormatChange?: (config: NumberFormatConfig) => void;
  initialConfig?: NumberFormatConfig;
  showConfigPanel?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
}

const DEFAULT_CONFIG: NumberFormatConfig = {
  thousandSeparator: '.',
  decimalSeparator: ',',
  suffix: ' ₫',
  prefix: '',
  decimalPlaces: 0
};

const ConfigurableNumberInput: React.FC<ConfigurableNumberInputProps> = ({
  value,
  onChange,
  onFormatChange,
  initialConfig = DEFAULT_CONFIG,
  showConfigPanel = true,
  placeholder = 'Nhập số',
  min = 0,
  max,
  disabled = false
}) => {
  const [config, setConfig] = useState<NumberFormatConfig>(initialConfig);
  const [previewValue, setPreviewValue] = useState<number>(1234567.89);

  // Format number theo config
  const formatNumber = (num: number | null | undefined, cfg: NumberFormatConfig): string => {
    if (num === null || num === undefined || isNaN(num)) return '';
    
    const { thousandSeparator, decimalSeparator, suffix, prefix, decimalPlaces } = cfg;
    
    // Làm tròn theo số chữ số thập phân
    const rounded = Number(num.toFixed(decimalPlaces));
    
    // Tách phần nguyên và thập phân
    const parts = rounded.toString().split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '';
    
    // Format phần nguyên với dấu phân cách nghìn
    let formattedInteger = integerPart;
    if (thousandSeparator) {
      formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
    }
    
    // Ghép phần thập phân nếu có
    let result = formattedInteger;
    if (decimalPlaces > 0 && decimalPart) {
      const paddedDecimal = decimalPart.padEnd(decimalPlaces, '0');
      result += decimalSeparator + paddedDecimal;
    } else if (decimalPlaces > 0) {
      result += decimalSeparator + '0'.repeat(decimalPlaces);
    }
    
    return prefix + result + suffix;
  };

  // Parse formatted string thành number
  const parseNumber = (str: string, cfg: NumberFormatConfig): number => {
    if (!str) return 0;
    
    const { thousandSeparator, decimalSeparator, suffix, prefix } = cfg;
    
    let cleaned = str;
    
    // Loại bỏ prefix và suffix
    if (prefix) cleaned = cleaned.replace(new RegExp('^' + prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), '');
    if (suffix) cleaned = cleaned.replace(new RegExp(suffix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$'), '');
    
    // Thay thế dấu phân cách thập phân về dấu chấm
    if (decimalSeparator !== '.') {
      cleaned = cleaned.replace(new RegExp('\\' + decimalSeparator, 'g'), '.');
    }
    
    // Loại bỏ dấu phân cách nghìn
    if (thousandSeparator) {
      cleaned = cleaned.replace(new RegExp('\\' + thousandSeparator, 'g'), '');
    }
    
    // Chỉ giữ lại số và dấu chấm
    cleaned = cleaned.replace(/[^\d.]/g, '');
    
    const result = parseFloat(cleaned);
    return isNaN(result) ? 0 : result;
  };

  const handleConfigChange = (newConfig: Partial<NumberFormatConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    onFormatChange?.(updatedConfig);
  };

  const handleValueChange = (val: number | null) => {
    onChange?.(val);
  };

  useEffect(() => {
    setConfig(initialConfig);
  }, [initialConfig]);

  return (
    <div>
      <InputNumber
        style={{ width: '100%' }}
        value={value}
        onChange={handleValueChange}
        min={min}
        max={max}
        disabled={disabled}
        placeholder={placeholder}
        formatter={(val) => formatNumber(val as number, config)}
        parser={(str) => parseNumber(str || '', config)}
      />
      
      {showConfigPanel && (
        <Card 
          title="Cấu hình định dạng số" 
          size="small" 
          style={{ marginTop: 8 }}
          bodyStyle={{ padding: 12 }}
        >
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <label style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
                Dấu phân cách nghìn:
              </label>
              <Select
                size="small"
                value={config.thousandSeparator}
                onChange={(val) => handleConfigChange({ thousandSeparator: val })}
                options={[
                  { label: 'Dấu chấm (.)', value: '.' },
                  { label: 'Dấu phẩy (,)', value: ',' }
                ]}
              />
            </Col>
            
            <Col span={12}>
              <label style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
                Dấu phân cách thập phân:
              </label>
              <Select
                size="small"
                value={config.decimalSeparator}
                onChange={(val) => handleConfigChange({ decimalSeparator: val })}
                options={[
                  { label: 'Dấu phẩy (,)', value: ',' },
                  { label: 'Dấu chấm (.)', value: '.' }
                ]}
              />
            </Col>
            
            <Col span={8}>
              <label style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
                Tiền tố:
              </label>
              <Input
                size="small"
                value={config.prefix}
                onChange={(e) => handleConfigChange({ prefix: e.target.value })}
                placeholder="$, €, ..."
                maxLength={10}
              />
            </Col>
            
            <Col span={8}>
              <label style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
                Hậu tố:
              </label>
              <Select
                size="small"
                value={config.suffix}
                onChange={(val) => handleConfigChange({ suffix: val })}
                options={[
                  { label: ' ₫', value: ' ₫' },
                  { label: ' VNĐ', value: ' VNĐ' },
                  { label: ' đ', value: ' đ' },
                  { label: '%', value: '%' },
                  { label: ' USD', value: ' USD' },
                  { label: 'Tùy chỉnh', value: 'custom' }
                ]}
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    {config.suffix === 'custom' && (
                      <div style={{ padding: 8, borderTop: '1px solid #f0f0f0' }}>
                        <Input
                          size="small"
                          placeholder="Nhập hậu tố tùy chỉnh"
                          onChange={(e) => handleConfigChange({ suffix: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                )}
              />
            </Col>
            
            <Col span={8}>
              <label style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
                Số chữ số thập phân:
              </label>
              <InputNumber
                size="small"
                min={0}
                max={10}
                value={config.decimalPlaces}
                onChange={(val) => handleConfigChange({ decimalPlaces: val || 0 })}
              />
            </Col>
          </Row>
          
          <div style={{ marginTop: 12, padding: 8, backgroundColor: '#f9f9f9', borderRadius: 4 }}>
            <div style={{ fontSize: 12, marginBottom: 4 }}>Xem trước:</div>
            <div style={{ fontWeight: 'bold', color: '#1890ff' }}>
              {formatNumber(previewValue, config)}
            </div>
            <Input
              size="small"
              type="number"
              value={previewValue}
              onChange={(e) => setPreviewValue(Number(e.target.value) || 0)}
              style={{ marginTop: 4 }}
              placeholder="Thay đổi giá trị để xem trước"
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default ConfigurableNumberInput;
