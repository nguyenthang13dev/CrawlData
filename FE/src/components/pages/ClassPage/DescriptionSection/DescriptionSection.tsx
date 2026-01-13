'use client';

import React from 'react';
import '../page.css';
interface DescriptionSectionProps {
  title?: string;
  description: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ 
    title = 'LỚP 12', 
    description 
}) => {
  return (
    <div className={'top-title'}>
      <span>{description}</span>
    </div>
  );
};

export default DescriptionSection;
