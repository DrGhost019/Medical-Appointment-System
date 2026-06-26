// src/components/review/ReviewSuccessMessage.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

interface ReviewSuccessMessageProps {
  doctorId: string;
  onClose: () => void;
}

const ReviewSuccessMessage = ({ doctorId, onClose }: ReviewSuccessMessageProps) => {
  return (
    // Overlay تیره
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {/* باکس سفید */}
      <div
        className="bg-white rounded-xl flex flex-col items-center"
        style={{
          width: '420px',
          padding: '40px 32px',
          gap: '20px',
        }}
      >
        {/* آیکون تیک سبز در دایره سبز روشن */}
        <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center">
            <Check size={24} className="text-white" strokeWidth={3} />
          </div>
        </div>

        {/* عنوان */}
        <h2 className="font-vazirmatn font-bold text-lg text-[#2E2E2E] text-center">
          نظر شما ثبت شد
        </h2>

        {/* متن توضیح */}
        <p className="font-vazirmatn font-normal text-sm text-[#666666] text-center leading-[180%]">
          نظر شما با موفقیت ثبت شد و پس از بررسی منتشر خواهد شد.
        </p>

        {/* لینک بازگشت */}
        <Link href={`/doctors/${doctorId}`} onClick={onClose}>
          <span className="font-vazirmatn font-medium text-sm text-[#4179F0] hover:text-[#3565d0] transition-colors cursor-pointer">
            بازگشت به صفحه پزشک
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ReviewSuccessMessage;