// src/app/contact/page.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  const router = useRouter();

  const handleReload = () => {
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* باکس اصلی صفحه 404 - با position relative */}
      <div
        className="relative mx-auto"
        style={{
          width: '1440px',
          height: '900px',
        }}
      >
        {/* تصویر سمت راست */}
        <img
          src="/assets/mrerror.png"
          alt="404 Error"
          className="absolute object-contain"
          style={{
            width: '788px',
            height: '738px',
            top: '143px',
            left: '613px',
          }}
        />

        {/* متن سمت چپ */}
        <div
          className="absolute flex flex-col"
          style={{
            width: '531px',
            height: '150px',
            top: '437px',
            left: '38px',
            gap: '24px',
          }}
        >
          {/* عنوان */}
          <h1 className="font-vazirmatn font-bold text-[28px] text-[#000000] leading-[150%] text-right">
            صفحه مورد نظر در دسترس نیست!
          </h1>

          {/* زیرعنوان */}
          <p className="font-vazirmatn font-normal text-[16px] text-[#666666] leading-[150%] text-right">
            دسترسی خود به اینترنت را بررسی کنید!
          </p>

          {/* دکمه بارگذاری مجدد */}
          <button
            onClick={handleReload}
            className="font-vazirmatn font-medium text-[14px] text-[#4179F0] border border-[#4179F0] rounded-lg hover:bg-blue-50 transition-colors self-start"
            style={{
              width: '140px',
              height: '44px',
            }}
          >
            بارگذاری مجدد
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}