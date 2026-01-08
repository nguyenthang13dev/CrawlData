import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

interface BackButtonProps {
  onBack: () => void;
  text?: string;
  style?: React.CSSProperties;
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
}

const BackButton: React.FC<BackButtonProps> = ({ 
  onBack, 
  text = "Quay lại", 
  style,
  type = "default" 
}) => {
  return (
    <Button
      type={type}
      icon={<ArrowLeftOutlined />}
      onClick={onBack}
      style={{ 
        marginBottom: 16,
        ...style 
      }}
    >
      {text}
    </Button>
  );
};

export default BackButton;