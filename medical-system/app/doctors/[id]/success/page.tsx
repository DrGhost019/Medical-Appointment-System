// src/app/doctors/[id]/success/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Check, AlertCircle } from 'lucide-react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const success = searchParams.get('success');
    setIsSuccess(success === 'true');
  }, [searchParams]);

  if (isSuccess === null) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4179F0] mx-auto mb-4"></div>
            <p className="text-gray-500">در حال پردازش...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="min-h-screen flex items-center justify-center px-4">
        {isSuccess ? (
          <div className="w-full max-w-md rounded-2xl border border-[#E7E7E7] bg-white p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#E8F5E9] flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-[#4CAF50]" />
            </div>

            <h1 className="font-vazirmatn font-bold text-xl text-[#2E2E2E] mb-3">
              تراکنش موفق
            </h1>

            <p className="font-vazirmatn font-normal text-sm text-[#666666] mb-6">
              نوبت شما با موفقیت رزرو شد
            </p>

            {/* ✅ تغییر: لینک به /appointments */}
            <button
              onClick={() => router.push('/appointments')}
              className="font-vazirmatn font-medium text-sm text-[#4179F0] hover:text-[#3565d0] transition-colors"
            >
              مشاهده نوبت‌ها
            </button>
          </div>
        ) : (
          <div className="w-full max-w-md rounded-2xl border border-[#E7E7E7] bg-white p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF8E1] flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={32} className="text-[#FFA000]" />
            </div>

            <h1 className="font-vazirmatn font-bold text-xl text-[#2E2E2E] mb-3">
              پرداخت نامشخص
            </h1>

            <p className="font-vazirmatn font-normal text-sm text-[#666666] mb-6">
              متاسفانه تراکنش شما با مشکل مواجه شد
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => router.back()}
                className="flex-1 h-10 rounded-lg bg-[#4179F0] text-white font-vazirmatn font-medium text-sm hover:bg-[#3565d0] transition-colors"
              >
                بله
              </button>
              <button
                onClick={() => router.push('/')}
                className="flex-1 h-10 rounded-lg border border-[#E7E7E7] text-[#666666] font-vazirmatn font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                خیر
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}