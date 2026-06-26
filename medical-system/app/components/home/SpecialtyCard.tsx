// src/components/home/SpecialtyCard.tsx
import React from 'react';

interface SpecialtyCardProps {
  iconSrc: string;
  name: string;
  doctorCount: number;
}

// تابع تبدیل اعداد انگلیسی به فارسی
const toPersianNumber = (num: number): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

const SpecialtyCard = ({ iconSrc, name, doctorCount }: SpecialtyCardProps) => {
  return (
    <div className="w-[162px] h-[165px] rounded-[10px] border border-[#E7E7E7] bg-white p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md hover:border-primary-500 transition-all">
      <div className="w-14 h-14 flex items-center justify-center">
        <img 
          src={iconSrc} 
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="font-vazirmatn font-medium text-base text-[#000000]">
          {name}
        </h3>
        <span className="font-vazirmatn font-normal text-xs text-[#888888]">
          +{toPersianNumber(doctorCount)} پزشک
        </span>
      </div>
    </div>
  );
};

export default SpecialtyCard;