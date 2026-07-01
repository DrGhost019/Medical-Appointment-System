// src/components/payment/PaymentGateway.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useBookingStore } from '../../store/bookingStore';

interface PaymentGatewayProps {
  doctorId: string;
}

export default function PaymentGateway({ doctorId }: PaymentGatewayProps) {
  const router = useRouter();
  const { token } = useAuthStore();
  const { selectedDate, selectedSlot, patientInfo } = useBookingStore();
  
  const [selectedBank, setSelectedBank] = useState<'saman' | 'parsian'>('saman');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const banks = [
    {
      id: 'saman' as const,
      name: 'بانک سامان',
      image: '/assets/saman.png',
    },
    {
      id: 'parsian' as const,
      name: 'بانک پارسیان',
      image: '/assets/parsian.png',
    },
  ];

  const handlePayment = async (isSuccess: boolean) => {
    // اگر پرداخت ناموفق باشه، مستقیم به صفحه خطا می‌ره
    if (!isSuccess) {
      router.push(`/doctors/${doctorId}/success?success=false`);
      return;
    }

    // اعتبارسنجی قبل از پرداخت
    if (!selectedSlot) {
      setError('لطفاً یک بازه زمانی را انتخاب کنید.');
      return;
    }

    if (!agreedToTerms) {
      setError('لطفاً با شرایط و قوانین موافقت کنید.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // ۱. رزرو نوبت در دیتابیس
      const bookingResponse = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          slotId: selectedSlot._id,
          patientName: patientInfo?.name || 'کاربر',
          patientPhone: patientInfo?.phone || '',
        }),
      });

      const bookingData = await bookingResponse.json();

      if (!bookingData.success) {
        setError(bookingData.message || 'خطا در رزرو نوبت');
        setIsProcessing(false);
        return;
      }

      // ۲. پرداخت موفق - ذخیره اطلاعات در localStorage برای نمایش
      const appointmentData = {
        doctorId: doctorId,
        date: selectedDate || '۱۴۰۳/۱۰/۲۴',
        time: selectedSlot.time,
        patient: patientInfo?.name || 'کاربر',
        trackingCode: bookingData.appointment?.trackingCode || Math.floor(Math.random() * 10000000).toString(),
      };

      // ذخیره در localStorage
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      localStorage.setItem('appointments', JSON.stringify([...existingAppointments, appointmentData]));

      // ۳. هدایت به صفحه موفقیت
      router.push(`/doctors/${doctorId}/success?success=true`);

    } catch (error) {
      console.error('Payment error:', error);
      setError('خطا در ارتباط با سرور');
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      
      {/* باکس انتخاب بانک */}
      <div className="w-full rounded-xl border border-[#E7E7E7] bg-white p-5 flex flex-col gap-3">
        <h3 className="font-vazirmatn font-bold text-base text-[#2E2E2E]">
          درگاه پرداخت آنلاین
        </h3>

        {/* لیست بانک‌ها */}
        <div className="flex flex-col gap-3">
          {banks.map((bank) => (
            <label
              key={bank.id}
              className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setSelectedBank(bank.id)}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  selectedBank === bank.id
                    ? 'border-[#4179F0]'
                    : 'border-[#CCCCCC]'
                }`}
              >
                {selectedBank === bank.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4179F0]"></div>
                )}
              </div>

              <img
                src={bank.image}
                alt={bank.name}
                className="w-12 h-8 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />

              <span className="font-vazirmatn font-medium text-sm text-[#2E2E2E]">
                {bank.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* باکس چک‌باکس قوانین + دکمه پرداخت */}
      <div className="w-full rounded-xl border border-[#E7E7E7] bg-white p-4 flex flex-col gap-3">
        
        {/* چک‌باکس قوانین */}
        <label className="flex items-start gap-2 cursor-pointer">
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
              agreedToTerms
                ? 'bg-[#4179F0] border-[#4179F0]'
                : 'border-[#CCCCCC] bg-white'
            }`}
            onClick={() => setAgreedToTerms(!agreedToTerms)}
          >
            {agreedToTerms && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </div>
          <span className="font-vazirmatn font-normal text-xs text-[#666666] leading-[180%]">
            پرداخت به منزله پذیرش <span className="text-[#4179F0] underline">شرایط و قوانین</span> است.
          </span>
        </label>

        {/* نمایش خطا */}
        {error && (
          <div className="text-red-500 text-xs font-vazirmatn text-right">
            {error}
          </div>
        )}

        {/* دکمه پرداخت موفق */}
        <button
          onClick={() => handlePayment(true)}
          disabled={!agreedToTerms || isProcessing}
          className={`w-full h-10 rounded-lg font-vazirmatn font-medium text-sm flex items-center justify-center gap-1.5 transition-colors ${
            !agreedToTerms || isProcessing
              ? 'bg-[#CCCCCC] text-white cursor-not-allowed'
              : 'bg-[#4179F0] text-white hover:bg-[#3565d0] cursor-pointer'
          }`}
        >
          {isProcessing ? 'در حال پردازش...' : 'پرداخت'}
          <ArrowLeft size={16} />
        </button>

        {/* دکمه تست - ناموفق */}
        <button
          onClick={() => handlePayment(false)}
          disabled={isProcessing}
          className="w-full h-10 rounded-lg border border-[#E7E7E7] font-vazirmatn font-medium text-sm text-[#666666] flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={16} />
          پرداخت (ناموفق - تست)
        </button>
      </div>
    </div>
  );
}