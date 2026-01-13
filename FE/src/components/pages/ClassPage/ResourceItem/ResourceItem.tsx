'use client';

import React from 'react';

import '../page.css';

interface ResourceItemProps {
  title: string;
  href: string;
  bookCat: string;
}

const ResourceItem: React.FC<ResourceItemProps> = ({ title, href, bookCat }) => {
  const isDefaultCategory = bookCat === 'book-cat-0';
  const imageUrl = `/themes/images/${bookCat}.png`;

  return (
    <li className={`book-cat book-cat-show`}>
      <a href={href} title={title}>
        {isDefaultCategory ? (
          <img
            className={'triangleIcon'}
            src="/themes/images/tamgiac.png"
            alt="icon"
          />
        ) : (
          <img
            src={imageUrl}
            alt={title}
            className={'categoryImage'}
          />
        )}
        <span>{title}</span>
      </a>
    </li>
  );
};

export default ResourceItem;
