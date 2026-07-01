"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth'; // 👈 اضافه کردن هوک احراز هویت خودمان

// تابع تبدیل اعداد انگلیسی به فارسی
const toPersianNumber = (value: string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return value.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

export default function LoginPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  
  // 🔐 استخراج متدها و وضعیت‌ها از هوک کاملاً متصل به بک‌آند
  const { sendOTP, isLoading, error: apiError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!phoneNumber) return;
    
    // تبدیل دقیق شماره فارسی به انگلیسی برای ارسال استاندارد به بک‌آند
    const rawPhone = phoneNumber.replace(/[۰-۹]/g, (persianDigit) => {
      const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return persianDigits.indexOf(persianDigit).toString();
    });

    // اعتبار سنجی طول شماره موبایل ایران
    if (rawPhone.length !== 11 || !rawPhone.startsWith('09')) {
      setLocalError('لطفاً یک شماره موبایل معتبر (مثل ۰۹۱۲۳۴۵۶۷۸۹) وارد کنید.');
      return;
    }
    
    try {
      // 🚀 درخواست مستقیم به API بک‌آند ما برای ارسال کد OTP
      await sendOTP(rawPhone);
      
      // ذخیره شماره موبایل تمیز شده جهت استفاده در صفحه تایید کد
      localStorage.setItem('pending_phone', rawPhone);
      
      // هدایت امن به صفحه وارد کردن کد تایید
      router.push('/auth/otp');
    } catch (err) {
      // خطاها توسط هوک مدیریت می‌شوند و در کامپوننت نمایش داده خواهند شد
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // تبدیل اعداد انگلیسی به فارسی
    value = toPersianNumber(value);
    
    // فقط اعداد فارسی مجاز باشند
    value = value.replace(/[^۰-۹]/g, '');
    
    // محدودیت ۱۱ رقم
    if (value.length > 11) return;
    
    setPhoneNumber(value);
  };

  return (
    <main className="min-h-screen bg-white flex" dir="rtl" style={{ height: '100vh' }}>
      
      {/* سمت راست: فرم */}
      <div
        className="flex flex-col items-center justify-start"
        style={{
          width: '730px',
          minWidth: '730px',
          height: '100vh',
          paddingTop: '40px',
          paddingBottom: '40px',
          gap: '32px',
          borderRadius: '8px',
          border: '1px solid #E7E7E7',
          boxShadow: '0px 6px 32px 0px #0000000D',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* لوگو پلاس */}
        <div className="flex items-center justify-center" style={{ marginTop: '80px' }}>
          <img
            src="/assets/plus.png"
            alt="دکتر رزرو"
            className="w-20 h-20"
          />
        </div>

        {/* عنوان */}
        <h1 className="font-vazirmatn font-bold text-[24px] text-[#2E2E2E] text-center">
          به دکتر رزرو خوش آمدید
        </h1>

        {/* زیرعنوان */}
        <p className="font-vazirmatn font-normal text-[16px] text-[#666666] text-center">
          برای ادامه شماره موبایل خود را وارد نمایید.
        </p>

        {/* فرم */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 px-16" style={{ marginTop: '20px' }}>
          <div className="flex flex-col gap-2">
            <label className="font-vazirmatn font-medium text-[14px] text-[#2E2E2E] text-right">
              شماره موبایل
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
              className="w-full h-12 rounded-lg border border-[#E7E7E7] bg-white px-4 font-vazirmatn font-normal text-[14px] text-[#2E2E2E] placeholder:text-[#888888] focus:outline-none focus:border-[#4179F0] focus:ring-2 focus:ring-blue-100"
              required
              dir="rtl"
              inputMode="numeric"
              disabled={isLoading}
            />
          </div>

          {/* نمایش پیام‌های خطا در صورت وجود */}
          {(localError || apiError) && (
            <div className="text-red-500 font-vazirmatn text-[13px] text-right px-1">
              {localError || apiError}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full h-12 rounded-lg text-white font-vazirmatn font-medium text-[16px] transition-colors ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#4179F0] hover:bg-[#3565d0]'
            }`}
          >
            {isLoading ? 'در حال ارسال درخواست...' : 'دریافت کد تایید'}
          </button>
        </form>
      </div>

      {/* سمت چپ: تصاویر */}
      <div className="relative flex-1 overflow-hidden bg-white">
        <div
          className="absolute"
          style={{
            top: '42%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '662px',
            height: '785px',
          }}
        >
          <img
            src="/assets/hiddenframe.png"
            alt=""
            className="absolute"
            style={{
              width: '700px',
              height: '493px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(149.12deg)',
              opacity: 0.08,
            }}
          />

          <img
            src="/assets/leftframe.png"
            alt=""
            className="absolute"
            style={{
              width: '145px',
              height: '522px',
              top: '220px',
              left: '0px',
              opacity: 0.8,
              borderRadius: '12px',
              boxShadow: '4px 4px 12.2px 0px #4179F04D',
              objectFit: 'cover',
            }}
          />

          <img
            src="/assets/middleframe.png"
            alt=""
            className="absolute"
            style={{
              width: '144px',
              height: '521px',
              top: '161px',
              left: '183px',
              opacity: 0.8,
              borderRadius: '12px',
              boxShadow: '4px 4px 12.2px 0px #4179F04D',
              objectFit: 'cover',
            }}
          />

          <img
            src="/assets/rightframe.png"
            alt=""
            className="absolute"
            style={{
              width: '145px',
              height: '521px',
              top: '250px',
              left: '365px',
              opacity: 0.8,
              borderRadius: '12px',
              boxShadow: '4px 4px 12.2px 0px #4179F04D',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

    </main>
  );
}