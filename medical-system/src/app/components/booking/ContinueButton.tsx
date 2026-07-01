// src/components/booking/ContinueButton.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore';

interface ContinueButtonProps {
  doctorId: string;
  disabled?: boolean;
}

export default function ContinueButton({ doctorId, disabled = false }: ContinueButtonProps) {
  const router = useRouter();
  const { selectedSlot, patientInfo } = useBookingStore();

  const handleNavigation = () => {
    // بررسی اینکه آیا اطلاعات لازم برای ادامه وجود دارد
    if (!selectedSlot) {
      alert('لطفاً ابتدا یک بازه زمانی را انتخاب کنید.');
      return;
    }

    if (!patientInfo?.name) {
      alert('لطفاً اطلاعات مراجعه کننده را تکمیل کنید.');
      return;
    }

    // ذخیره اطلاعات در localStorage برای صفحه پرداخت
    localStorage.setItem('selectedDate', selectedSlot.date || '');
    localStorage.setItem('selectedTime', selectedSlot.time || '');
    localStorage.setItem('selectedPatient', patientInfo.name || '');

    // هدایت به صفحه پرداخت
    router.push(`/doctors/${doctorId}/payment`);
  };

  return (
    <div className="w-[805px] flex justify-center" dir="rtl">
      <button
        type="button"
        disabled={disabled}
        onClick={handleNavigation}
        className={`w-[394px] h-10 rounded-lg font-vazirmatn font-medium text-sm flex items-center justify-center gap-1.5 transition-colors ${
          disabled
            ? 'bg-[#CCCCCC] text-white cursor-not-allowed'
            : 'bg-[#4179F0] text-white hover:bg-[#3565d0] cursor-pointer'
        }`}
      >
        ادامه
        <ArrowLeft size={16} className="mr-1" />
      </button>
    </div>
  );
}