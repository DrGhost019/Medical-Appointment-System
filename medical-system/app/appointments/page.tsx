// src/app/appointments/page.tsx
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppointmentContainer from '@/components/appointments/AppointmentContainer';

export default function AppointmentsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1440px] mx-auto py-8 px-[110px]">
        <div className="flex flex-col gap-6">
          
          {/* عنوان صفحه */}
          <h1 className="font-vazirmatn font-bold text-2xl text-[#2E2E2E] text-right">
            لیست نوبت‌ها
          </h1>

          {/* باکس نوبت‌ها - وسط‌چین */}
          <div className="flex justify-center">
            <AppointmentContainer />
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}