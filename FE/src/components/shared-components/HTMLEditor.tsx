import { CodeOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Space, Tabs } from 'antd';
import React, { useCallback, useState } from 'react';
import CodeMirrorEditor from './CodeMirrorEditor';

interface HTMLEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  height?: string;
  disabled?: boolean;
}

const HTMLEditor: React.FC<HTMLEditorProps> = ({
  value = '',
  onChange,
  placeholder = 'Nhập nội dung HTML...',
  height = '200px',
  disabled = false,
}) => {
  const [activeTab, setActiveTab] = useState<string>('editor');

  const handleChange = useCallback((newValue: string) => {
    if (onChange && !disabled) {
      onChange(newValue);
    }
  }, [onChange, disabled]);

  const insertHTML = useCallback((htmlTag: string) => {
    if (onChange && !disabled) {
      const newValue = value + htmlTag;
      onChange(newValue);
    }
  }, [value, onChange, disabled]);

  const toolbarButtons = [
    { label: 'Bold', html: '<b></b>', icon: 'B' },
    { label: 'Italic', html: '<i></i>', icon: 'I' },
    { label: 'Link', html: '<a href=""></a>', icon: 'Link' },
    { label: 'Break', html: '<br/>', icon: 'BR' },
    { label: 'Paragraph', html: '<p></p>', icon: 'P' },
  ];

  const items = [
    {
      key: 'editor',
      label: (
        <span>
          <CodeOutlined />
          HTML Editor
        </span>
      ),
      children: (
        <div>
          <div style={{ marginBottom: '8px' }}>
            <Space wrap>
              {toolbarButtons.map((btn) => (
                <Button
                  key={btn.label}
                  size="small"
                  onClick={() => insertHTML(btn.html)}
                  disabled={disabled}
                  title={`Insert ${btn.label}`}
                >
                  {btn.icon}
                </Button>
              ))}
            </Space>
          </div>
          <CodeMirrorEditor
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            height={height}
            readOnly={disabled}
          />
        </div>
      ),
    },
    {
      key: 'preview',
      label: (
        <span>
          <EyeOutlined />
          Preview
        </span>
      ),
      children: (
        <div
          style={{
            height: height,
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            padding: '10px',
            backgroundColor: '#fafafa',
            overflow: 'auto',
          }}
        >
          {value ? (
            <div dangerouslySetInnerHTML={{ __html: value }} />
          ) : (
            <div style={{ color: '#999', fontStyle: 'italic' }}>
              {placeholder}
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ border: '1px solid #d9d9d9', borderRadius: '6px' }}>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={items}
        size="small"
        style={{ margin: 0 }}
        tabBarStyle={{ 
          margin: 0, 
          padding: '0 16px',
          borderBottom: '1px solid #d9d9d9' 
        }}
      />
    </div>
  );
};

export default HTMLEditor;
