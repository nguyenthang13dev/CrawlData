import Footer from '@/components/layout-components/Footer/Footer';
import HeaderOut from '@/components/layout-components/HeaderOut/page';
import React from 'react';
import './main.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <HeaderOut />
        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Layout;