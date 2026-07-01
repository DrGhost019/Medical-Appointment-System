// src/app/appointments/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AppointmentContainer from '../components/appointments/AppointmentContainer';
import { useAuthStore } from '../store/authStore';

export default function AppointmentsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // بررسی احراز هویت
    if (!isAuthenticated()) {
      router.push('/auth/login');
    }
    setIsLoading(false);
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="font-vazirmatn text-[#666666]">در حال بارگذاری...</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1440px] mx-auto py-8 px-4 md:px-[110px]">
        <div className="flex flex-col gap-6">
          
          {/* عنوان صفحه */}
          <h1 className="font-vazirmatn font-bold text-2xl text-[#2E2E2E] text-right">
            نوبت‌های من
          </h1>

          {/* لیست نوبت‌ها */}
          <AppointmentContainer />

        </div>
      </div>

      <Footer />
    </main>
  );
}