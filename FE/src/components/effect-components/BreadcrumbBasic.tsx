import { Breadcrumb } from 'antd';
import Link from 'next/link';
import React from 'react';

interface BreadcrumbBasicProps {
  items?: any[];
}

const BreadcrumbBasic: React.FC<BreadcrumbBasicProps> = ({ items = [] }) => {
  const baseItems = [
    {
      title: <Link href="/dashboard">Trang chủ</Link>,
    },
  ];
  const newItems = [...baseItems, ...items];
  return (
    <div className="w-full flex justify-between align-items-center pb-2 border-b border-gray-300 mb-2 relative z-10">
      <Breadcrumb items={newItems} />
    </div>
  );
};

export default BreadcrumbBasic;
