'use client';

import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

import '../page.css';

interface BookCategory {
  id: string;
  name: string;
  imageKey: string;
}

interface Props {
  categories: BookCategory[];
  onCategorySelect?: (categoryId: string) => void;
}

const BookCategoryDropdown: React.FC<Props> = ({ categories, onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (categoryId: string) => {
    onCategorySelect?.(categoryId);
    setIsOpen(false);
  };

  return (
    <div className={'selectBookCat'}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={'dropdownToggle'}
      >
        Tất cả
        <ChevronDown className={'chevronIcon'} />
      </button>

      {isOpen && (
        <ul className={'dropdownMenu'}>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); handleSelect('0'); }}>
              Tất cả
            </a>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSelect(cat.id); }}>
                <img
                  width={30}
                  src={`/themes/images/${cat.imageKey}`}
                  alt={cat.name}
                />
                {cat.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookCategoryDropdown;
