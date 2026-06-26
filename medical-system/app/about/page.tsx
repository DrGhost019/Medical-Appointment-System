// src/app/about/page.tsx
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AboutDoctor from '@/components/about/AboutDoctor';
import WhyDoctorRozro from '@/components/about/WhyDoctorRozro';
import ContactInfo from '@/components/about/ContactInfo';
import TechForHealth from '@/components/about/TechForHealth';
import Achievements from '@/components/about/Achievements';
import OurTeam from '@/components/about/OurTeam';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1440px] mx-auto py-8 px-[110px]">
        {/* کامپوننت درباره دکتر رزرو */}
        <AboutDoctor />

        {/* کامپوننت چرا دکتر رزرو */}
        <WhyDoctorRozro />

        {/* کامپوننت اطلاعات تماس */}
        <ContactInfo />

        {/* کامپوننت تکنولوژی در خدمت سلامت */}
        <TechForHealth />

        {/* کامپوننت افتخارات و دستاوردها */}
        <Achievements />

        {/* کامپوننت تیم ما */}
        <OurTeam />
      </div>

      <Footer />
    </main>
  );
}