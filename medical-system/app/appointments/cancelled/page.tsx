// src/app/appointments/cancelled/page.tsx
"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function CancelledPage() {
  const router = useRouter();

  useEffect(() => {
    // حذف نوبت از localStorage
    localStorage.removeItem('appointments');
  }, []);

  return (
    <main className="min-h-screen bg-[#F0F0F0] flex items-center justify-center">
      <div
        className="bg-white rounded-xl flex flex-col items-center mx-auto"
        style={{
          width: '420px',
          padding: '40px 32px',
          gap: '20px',
        }}
      >
        {/* آیکون تیک سبز */}
        <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center">
            <Check size={24} className="text-white" strokeWidth={3} />
          </div>
        </div>

        {/* عنوان */}
        <h2 className="font-vazirmatn font-bold text-lg text-[#2E2E2E] text-center">
          لغو موفق
        </h2>

        {/* متن توضیح */}
        <p className="font-vazirmatn font-normal text-sm text-[#666666] text-center">
          نوبت شما با موفقیت لغو شد
        </p>

        {/* لینک صفحه اصلی */}
        <Link href="/">
          <span className="font-vazirmatn font-medium text-sm text-[#4179F0] hover:text-[#3565d0] transition-colors cursor-pointer">
            صفحه اصلی
          </span>
        </Link>
      </div>
    </main>
  );
}