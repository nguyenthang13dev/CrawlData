'use client';

import HeaderOut from '@/components/layout-components/HeaderOut/page';
import MainSectionPage from '@/components/layout-components/Main/page';
import SectionHotPage from '@/components/layout-components/SectionHot/page';

import './main.css';

export default function HomePage() {


  return (
    <div className="min-h-screen bg-gray-50">
        {/* Header */}
          
          <HeaderOut />

      <div className="v2">
          <SectionHotPage />

        

        <section className="v2-main">
          <div className="container v2-layout">

          <MainSectionPage />

          </div>
        </section>
          </div>
      
         
    </div>
  );
}
