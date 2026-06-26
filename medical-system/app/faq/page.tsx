// src/app/faq/page.tsx
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FAQBackLink from '@/components/faq/FAQBackLink';
import FAQList from '@/components/faq/FAQList';

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1440px] mx-auto py-8 px-[110px]">
        <div className="flex flex-col gap-6">
          
          {/* Back Link با هاور آبی */}
          <FAQBackLink />

          {/* لیست سوالات */}
          <FAQList />

        </div>
      </div>

      <Footer />
    </main>
  );
}