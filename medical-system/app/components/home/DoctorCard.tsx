// src/components/home/DoctorCard.tsx
import React from 'react';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';

interface DoctorCardProps {
  imageSrc: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  location: string;
  doctorId: string; // اضافه شد
}

// تابع تبدیل اعداد انگلیسی به فارسی
const toPersianNumber = (num: number): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

const DoctorCard = ({ imageSrc, name, specialty, rating, reviewCount, location, doctorId }: DoctorCardProps) => {
  return (
    <div className="w-[289px] h-[363px] rounded-[10px] border border-[#E7E7E7] bg-white pb-4 flex flex-col cursor-pointer hover:shadow-lg transition-shadow">
      
      {/* Doctor Image */}
      <Link href={`/doctors/${doctorId}`}>
        <div className="w-[289px] h-[200px] rounded-t-[10px] overflow-hidden bg-gray-100">
          <img
            src={imageSrc}
            alt={name}
            className="w-[289px] h-[200px] object-contain"
          />
        </div>
      </Link>

      {/* Doctor Info */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        
        {/* Row 1: Name + Rating + Review Count */}
        <div className="flex items-center justify-between">
          <h3 className="font-vazirmatn font-medium text-base text-[#000000]">
            {name}
          </h3>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-[#FFB800] text-[#FFB800]" />
            <span className="font-vazirmatn font-bold text-sm text-[#FFB800]">
              {toPersianNumber(rating)}
            </span>
            <span className="font-vazirmatn font-normal text-xs text-[#888888] mr-1">
              ({toPersianNumber(reviewCount)} نظر)
            </span>
          </div>
        </div>

        {/* Row 2: Specialty + Location */}
        <div className="flex items-center justify-between">
          <p className="font-vazirmatn font-normal text-sm text-[#666666]">
            {specialty}
          </p>
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-[#666666]" />
            <span className="font-vazirmatn font-normal text-xs text-[#666666]">
              {location}
            </span>
          </div>
        </div>

        {/* Book Button */}
        <Link href={`/doctors/${doctorId}`}>
          <button className="w-full h-10 mt-auto rounded-lg border-2 border-[#4179F0] text-[#4179F0] font-vazirmatn font-medium text-sm hover:bg-blue-50 transition-colors">
            دریافت نوبت
          </button>
        </Link>

      </div>
    </div>
  );
};

export default DoctorCard;