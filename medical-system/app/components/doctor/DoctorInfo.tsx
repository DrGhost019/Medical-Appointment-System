"use client";

import React, { useState } from 'react';
import { Check, MapPin, Clock, ChevronDown } from 'lucide-react';

// توابع داخلی برای تبدیل و بومی‌سازی فرمت نمایش اعداد
const toPersianNumber = (value: number | string | undefined): string => {
  if (value === undefined || value === null) return '۰';
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return value.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

const toPersianRating = (value: number | undefined): string => {
  if (value === undefined || value === null) return '۰.۰';
  const rating = value % 1 === 0 ? `${value}.0` : value.toString();
  return toPersianNumber(rating);
};

// قالب‌بندی اینترفیس مطابق با خروجی‌های واقعی دیتابیس مدل داکتر
interface DoctorInfoProps {
  doctor: {
    _id: string;
    name: string;
    specialty: string;
    avatar?: string;
    image?: string;
    medicalCode?: string;
    rating?: number;
    reviewCount?: number;
    address?: string;
    firstAvailable?: string;
    about?: string;
  };
}

const DoctorInfo = ({ doctor }: DoctorInfoProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // انتخاب تصویر پزشک به صورت پویا و ست کردن یک تصویر آواتار پیش‌فرض در صورت نبود آن
  const doctorImage = doctor.avatar || doctor.image || '/assets/default-avatar.png';
  
  // دیتای پشتیبان در صورت ثبت نشدن جزییات در دیتابیس
  const rating = doctor.rating ?? 5;
  const reviewCount = doctor.reviewCount ?? 0;
  const medicalCode = doctor.medicalCode || 'ثبت نشده';
  const address = doctor.address || 'مطب پزشک (ثبت نشده)';
  const firstAvailable = doctor.firstAvailable || 'شنبه هفته آینده';
  const aboutText = doctor.about || 'توضیحات و بیوگرافی برای این پزشک ثبت نشده است.';

  return (
    <div className="w-[804px] rounded-[10px] border border-[#E7E7E7] overflow-hidden" dir="rtl">
      
      {/* بخش نمایه دکتر */}
      <div 
        className="w-full bg-white border-b border-[#E7E7E7]"
        style={{
          padding: '12px',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
        }}
      >
        {/* ردیف اول: تصویر + نام + کد نظام پزشکی */}
        <div className="flex items-start gap-4 mb-3">
          {/* تصویر دکتر */}
          <div className="w-[120px] h-[150px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 relative">
            <img
              src={doctorImage}
              alt={doctor.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // اگر عکس لود نشد، آواتار پیش‌فرض جایگزین شود
                (e.target as HTMLImageElement).src = '/assets/default-avatar.png';
              }}
            />
          </div>

          {/* اطلاعات */}
          <div className="flex-1 flex flex-col gap-2 text-right">
            {/* نام + کد نظام پزشکی */}
            <div className="flex items-center justify-between">
              <h2 className="font-vazirmatn font-bold text-xl text-[#2E2E2E]">
                {doctor.name}
              </h2>
              <div className="flex items-center gap-1.5">
                <span className="font-vazirmatn font-normal text-sm text-[#666666]">
                  کد نظام پزشکی: {toPersianNumber(medicalCode)}
                </span>
                <div className="w-5 h-5 rounded-full border border-[#4CAF50] flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-[#4CAF50]" />
                </div>
              </div>
            </div>

            {/* تخصص */}
            <p className="font-vazirmatn font-normal text-sm text-[#666666]">
              {doctor.specialty}
            </p>

            {/* امتیاز */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center" dir="ltr">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={star <= Math.floor(rating) ? '#FFB800' : '#E0E0E0'}
                    className="mr-0.5"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="font-vazirmatn font-bold text-sm text-[#FFB800] mr-1">
                {toPersianRating(rating)}
              </span>
              <span className="font-vazirmatn font-normal text-xs text-[#888888]">
                ({toPersianNumber(reviewCount)} نظر)
              </span>
            </div>
          </div>
        </div>

        {/* آدرس مطب */}
        <div className="flex items-center gap-2 mb-2 text-right">
          <MapPin size={16} className="text-[#666666] flex-shrink-0" />
          <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E]">
            آدرس مطب: {address}
          </span>
        </div>

        {/* اولین نوبت */}
        <div className="flex items-center gap-2 text-right">
          <Clock size={16} className="text-[#666666] flex-shrink-0" />
          <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E]">
            اولین نوبت در دسترس: {firstAvailable}
          </span>
        </div>
      </div>

      {/* بخش درباره دکتر */}
      <div className="w-full bg-white p-5 text-right">
        <h3 className="font-vazirmatn font-bold text-base text-[#2E2E2E] mb-4">
          درباره {doctor.name}
        </h3>
        
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[1000px]' : 'max-h-20'}`}>
          <p className="font-vazirmatn font-normal text-sm text-[#666666] leading-[200%] whitespace-pre-line">
            {aboutText}
          </p>
        </div>
      </div>

      {/* دکمه فلش جهت باز و بسته کردن متن درباره داکتر */}
      <div className="w-full flex justify-center pb-4 bg-white">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-8 h-8 rounded-full bg-[#F7F7F7] flex items-center justify-center hover:bg-gray-200 transition-colors focus:outline-none"
        >
          <ChevronDown 
            size={18} 
            className={`text-[#666666] transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
      </div>

    </div>
  );
};

export default DoctorInfo;