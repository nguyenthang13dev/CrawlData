'use client';

import React from 'react';
import styles from './ResourceItem.module.css';

import '../page.module.css';

interface ResourceItemProps {
  title: string;
  href: string;
  bookCat: string;
}

const ResourceItem: React.FC<ResourceItemProps> = ({ title, href, bookCat }) => {
  const isDefaultCategory = bookCat === 'book-cat-0';
  const imageUrl = `/themes/images/${bookCat}.png`;

  return (
    <li className={`book-cat ${styles.bookCat} ${styles[bookCat]}`}>
      <a href={href} title={title}>
        {isDefaultCategory ? (
          <img
            className={styles.triangleIcon}
            src="/themes/images/tamgiac.png"
            alt="icon"
          />
        ) : (
          <img
            src={imageUrl}
            alt={title}
            className={styles.categoryImage}
          />
        )}
        <span className={styles.resourceTitle}>{title}</span>
      </a>
    </li>
  );
};

export default ResourceItem;
