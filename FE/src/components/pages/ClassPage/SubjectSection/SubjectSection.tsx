'use client';

import React from 'react';
import ResourceItem from '../ResourceItem/ResourceItem';
import styles from './SubjectSection.module.css';

import '../page.module.css';

interface Resource {
  title: string;
  href: string;
  bookCat: string;
}

interface SubjectSectionProps {
  title: string;
  resources: Resource[];
}

const SubjectSection: React.FC<SubjectSectionProps> = ({ title, resources }) => {
  return (
    <div className='subject-item'>
      <h2 className='font-opensans-exb'>{title}</h2>
      <div>
        <ul className={styles.resourceList}>
          {resources.map((resource, index) => (
            <ResourceItem
              key={index}
              title={resource.title}
              href={resource.href}
              bookCat={resource.bookCat}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubjectSection;
