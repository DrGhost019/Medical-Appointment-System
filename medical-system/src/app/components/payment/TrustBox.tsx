// src/components/payment/TrustBox.tsx
import React from 'react';
import { CheckCircle } from 'lucide-react';

const TrustBox = () => {
  const benefits = [
    'امکان لغو نوبت',
    'امکان بازگشت وجه',
    'امکان ویرایش نوبت',
  ];

  return (
    <div className="w-full rounded-xl border border-[#E7E7E7] bg-white p-6">
      {/* عنوان */}
      <h3 className="font-vazirmatn font-bold text-base text-[#2E2E2E] mb-4">
        با اطمینان نوبت خود را ثبت کنید
      </h3>

      {/* لیست مزایا */}
      <ul className="flex flex-col gap-3">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckCircle size={16} className="text-[#4CAF50] flex-shrink-0" />
            <span className="font-vazirmatn font-normal text-sm text-[#666666]">
              {benefit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrustBox;