// src/app/auth/otp/page.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export default function OTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [timer, setTimer] = useState(95);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { verifyOTP, sendOTP, isLoading, error: apiError } = useAuth();

  useEffect(() => {
    const savedPhone = localStorage.getItem('pending_phone');
    if (savedPhone) {
      setPhoneNumber(savedPhone);
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  const getMaskedPhone = (phone: string): string => {
    if (!phone || phone.length < 11) return phone;
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const toPersian = (num: string) => num.replace(/\d/g, (d) => persianDigits[parseInt(d)]);
    
    const start = phone.substring(0, 4);
    const end = phone.substring(8, 11);
    return toPersian(`${start}***${end}`);
  };

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (index: number, value: string) => {
    if (value && !/^[0-9۰-۹]$/.test(value)) {
      setErrorMessage('فقط عدد وارد کنید');
      setTimeout(() => setErrorMessage(''), 2000);
      return;
    }

    if (value.length > 1) return;
    
    const newOtp = [...otp];
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishValue = value.replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d).toString());
    
    newOtp[index] = englishValue;
    setOtp(newOtp);
    setIsError(false);
    setIsSuccess(false);

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ✅ اصلاح شده: بررسی کامل بودن پروفایل بعد از ورود
  const handleVerify = async () => {
    const enteredOTP = otp.join('');
    
    if (enteredOTP.length !== 5) {
      setErrorMessage('لطفاً کد ۵ رقمی را کامل وارد کنید');
      setTimeout(() => setErrorMessage(''), 2000);
      return;
    }

    try {
      const response = await verifyOTP(phoneNumber, enteredOTP);
      
      setIsSuccess(true);
      setIsError(false);
      localStorage.removeItem('pending_phone');
      
      // ✅ بررسی کامل بودن پروفایل
      if (response.user && !response.user.name) {
        setTimeout(() => {
          router.push('/profile/complete');
        }, 1000);
      } else {
        setTimeout(() => {
          router.push('/');
        }, 1000);
      }

    } catch (err) {
      setIsError(true);
      setIsSuccess(false);
    }
  };

  const handleResend = async () => {
    try {
      await sendOTP(phoneNumber);
      setTimer(95);
      setOtp(['', '', '', '', '']);
      setIsError(false);
      setIsSuccess(false);
      setErrorMessage('');
    } catch (err) {
      setErrorMessage('خطا در ارسال مجدد کد');
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div
        className="flex flex-col items-center"
        style={{
          width: '420px',
          paddingTop: '40px',
          paddingRight: '64px',
          paddingBottom: '40px',
          paddingLeft: '64px',
          gap: '32px',
          borderRadius: '8px',
          border: '1px solid #E7E7E7',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-center">
          <img
            src="/assets/plus.png"
            alt="دکتر رزرو"
            className="w-20 h-20"
          />
        </div>

        <h1 className="font-vazirmatn font-bold text-[24px] text-[#2E2E2E] text-center">
          به دکتر رزرو خوش آمدید
        </h1>

        <p className="font-vazirmatn font-normal text-[16px] text-[#666666] text-center" dir="rtl">
          کد ارسال شده به شماره {getMaskedPhone(phoneNumber)} را وارد کنید
        </p>

        {(errorMessage || apiError) && (
          <p className="font-vazirmatn font-normal text-[14px] text-[#E53E3E] text-center">
            {errorMessage || apiError}
          </p>
        )}

        <div className="flex items-center gap-3" dir="ltr">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={isLoading || isSuccess}
              className={`w-14 h-14 rounded-lg border-2 text-center font-vazirmatn font-bold text-xl focus:outline-none transition-colors ${
                isSuccess
                  ? 'border-[#4CAF50] bg-green-50'
                  : isError
                  ? 'border-[#E53E3E] bg-red-50'
                  : 'border-[#E7E7E7] focus:border-[#4179F0]'
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="font-vazirmatn font-bold text-[18px] text-[#2E2E2E]">
            {formatTime(timer)}
          </span>
          {timer > 0 ? (
            <span className="font-vazirmatn font-normal text-[14px] text-[#666666]">
              تا دریافت مجدد کد
            </span>
          ) : (
            <button
              onClick={handleResend}
              disabled={isLoading}
              className="font-vazirmatn font-medium text-[14px] text-[#4179F0] hover:text-[#3565d0] transition-colors disabled:text-gray-400"
            >
              {isLoading ? 'در حال ارسال...' : 'دریافت مجدد کد'}
            </button>
          )}
        </div>

        <button
          onClick={handleVerify}
          disabled={otp.some((d) => !d) || isLoading || isSuccess}
          className={`w-full max-w-[200px] h-12 rounded-lg font-vazirmatn font-medium text-[16px] transition-colors ${
            otp.some((d) => !d) || isLoading || isSuccess
              ? 'bg-[#CCCCCC] text-white cursor-not-allowed'
              : 'bg-[#4179F0] text-white hover:bg-[#3565d0]'
          }`}
        >
          {isLoading ? 'در حال بررسی...' : 'ورود'}
        </button>

      </div>
    </main>
  );
}