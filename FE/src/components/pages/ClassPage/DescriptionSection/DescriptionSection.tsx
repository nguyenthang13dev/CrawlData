'use client';

import React from 'react';
import styles from './DescriptionSection.module.css';

interface DescriptionSectionProps {
  title?: string;
  description: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ 
  title = 'LỚP 12', 
  description 
}) => {
  return (
    <div className={styles.descriptionContainer}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default DescriptionSection;
