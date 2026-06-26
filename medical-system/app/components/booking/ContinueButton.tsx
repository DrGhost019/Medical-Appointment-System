"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react'; // برای رفتن به جلو در ساختار RTL، فلش باید به سمت چپ (جلو) باشد

interface ContinueButtonProps {
  doctorId: string;
  disabled?: boolean;
}

const ContinueButton = ({ doctorId, disabled = false }: ContinueButtonProps) => {
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
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
            : 'bg-[#4179F0] text-white hover:bg-[#3565d0]'
        }`}
        style={{
          paddingTop: '10px',
          paddingRight: '10px',
          paddingBottom: '10px',
          paddingLeft: '8px',
        }}
      >
        ادامه
        <ArrowLeft size={16} className="mr-1" /> {/* فلش بعد از متن برای هدایت به جلو */}
      </button>
    </div>
  );
};

export default ContinueButton;