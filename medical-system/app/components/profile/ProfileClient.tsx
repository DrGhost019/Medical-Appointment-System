"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// 👈 تبدیل آدرس الیاس (@) به آدرس‌های کامل و نسبی محلی برای حل ارور ماژول
import { getUser } from '../../lib/auth';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

// آدرس‌دهی کامپوننت‌های هم‌پوشه
import ProfileImageSection from './ProfileImageSection';
import ProfileForm from './ProfileForm';

const ProfileClient = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.push('/');
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="font-vazirmatn text-[#666666]">در حال بارگذاری...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1440px] mx-auto py-8 px-[110px]">
        <div className="flex flex-col gap-6">
          
          {/* عنوان صفحه */}
          <h1 className="font-vazirmatn font-bold text-2xl text-[#2E2E2E] text-right">
            پروفایل کاربری
          </h1>

          {/* ردیف اصلی: تصویر + فرم */}
          <div className="flex items-start gap-6">
            {/* سمت راست در حالت RTL: تصویر پروفایل */}
            <ProfileImageSection />

            {/* سمت چپ در حالت RTL: فرم اطلاعات */}
            <ProfileForm />
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ProfileClient;