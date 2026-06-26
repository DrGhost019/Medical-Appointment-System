// src/components/payment/PaymentGateway.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface PaymentGatewayProps {
  doctorId: string;
}

const PaymentGateway = ({ doctorId }: PaymentGatewayProps) => {
  const router = useRouter();
  const [selectedBank, setSelectedBank] = useState<'saman' | 'parsian'>('saman');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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

  // ✅ تابع جدید برای ذخیره نوبت و هدایت
  const handlePayment = (isSuccess: boolean) => {
    // خواندن اطلاعات از localStorage
    const selectedDate = localStorage.getItem('selectedDate') || '۱۴۰۳/۱۰/۲۴';
    const selectedTime = localStorage.getItem('selectedTime') || '۱۴:۳۰';
    const selectedPatient = localStorage.getItem('selectedPatient') || 'خودم';

    // ساخت object نوبت
    const newAppointment = {
      doctorId: doctorId,
      date: selectedDate,
      time: selectedTime,
      patient: selectedPatient,
      trackingCode: Math.floor(Math.random() * 10000000).toString(),
    };

    // ذخیره در localStorage
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    localStorage.setItem('appointments', JSON.stringify([...existingAppointments, newAppointment]));

    // هدایت به صفحه موفقیت یا شکست
    router.push(`/doctors/${doctorId}/success?success=${isSuccess}`);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      
      {/* باکس انتخاب بانک */}
      <div 
        className="w-full rounded-xl border border-[#E7E7E7] bg-white flex flex-col"
        style={{
          padding: '20px',
          gap: '11px',
          borderBottomRightRadius: '12px',
          borderBottomLeftRadius: '12px',
        }}
      >
        {/* عنوان */}
        <h3 className="font-vazirmatn font-bold text-base text-[#2E2E2E]">
          درگاه پرداخت آنلاین
        </h3>

        {/* لیست بانک‌ها */}
        <div className="flex flex-col gap-3">
          {banks.map((bank) => (
            <label
              key={bank.id}
              className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* Radio Button سفارشی */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  selectedBank === bank.id
                    ? 'border-[#4179F0]'
                    : 'border-[#CCCCCC]'
                }`}
                onClick={() => setSelectedBank(bank.id)}
              >
                {selectedBank === bank.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4179F0]"></div>
                )}
              </div>

              {/* لوگوی بانک */}
              <img
                src={bank.image}
                alt={bank.name}
                className="w-12 h-8 object-contain"
              />

              {/* نام بانک */}
              <span className="font-vazirmatn font-medium text-sm text-[#2E2E2E]">
                {bank.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* باکس چک‌باکس قوانین + دکمه پرداخت */}
      <div 
        className="w-full rounded-xl border border-[#E7E7E7] bg-white flex flex-col"
        style={{
          padding: '16px 20px',
          gap: '8px',
        }}
      >
        {/* چک‌باکس قوانین */}
        <label className="flex items-start gap-2 cursor-pointer">
          {/* Checkbox سفارشی */}
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

          {/* متن قوانین */}
          <span className="font-vazirmatn font-normal text-xs text-[#666666] leading-[180%]">
            پرداخت به منزله پذیرش <span className="text-[#4179F0] underline">شرایط و قوانین</span> است.
          </span>
        </label>

        {/* ✅ دکمه پرداخت - موفق (تغییر یافته) */}
        <button
          onClick={() => handlePayment(true)}
          disabled={!agreedToTerms}
          className={`w-full h-10 rounded-lg font-vazirmatn font-medium text-sm flex items-center justify-center gap-1.5 transition-colors mb-2 ${
            agreedToTerms
              ? 'bg-[#4179F0] text-white hover:bg-[#3565d0] cursor-pointer'
              : 'bg-[#CCCCCC] text-white cursor-not-allowed'
          }`}
          style={{
            paddingTop: '10px',
            paddingRight: '10px',
            paddingBottom: '10px',
            paddingLeft: '8px',
          }}
        >
          <ArrowLeft size={16} />
          پرداخت (موفق)
        </button>

        {/* ✅ دکمه تست - ناموفق (تغییر یافته) */}
        <button
          onClick={() => handlePayment(false)}
          className="w-full h-10 rounded-lg border border-[#E7E7E7] font-vazirmatn font-medium text-sm text-[#666666] flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={16} />
          پرداخت (ناموفق - تست)
        </button>
      </div>

    </div>
  );
};

export default PaymentGateway;