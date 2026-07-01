// src/components/booking/SelectedDoctorInfo.tsx
"use client";

import React from 'react';
import { Check, MapPin, Clock } from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore';

// تابع تبدیل اعداد به فارسی
const toPersianNumber = (value: number | string | undefined): string => {
  if (value === undefined || value === null) return '۰';
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return value.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

// ✅ تعریف تایپ Doctor
interface Doctor {
  _id: string;
  id: string;
  name: string;
  specialty: string;
  avatar?: string;
  image?: string;
  medicalCode?: string;
  rating?: number;
  reviewCount?: number;
  address?: string;
  firstAvailable?: string;
}

interface SelectedDoctorInfoProps {
  doctor?: Doctor;
}

export default function SelectedDoctorInfo({ doctor: propsDoctor }: SelectedDoctorInfoProps) {
  // اگر کامپوننت پروپز نگرفته بود، دیتای پزشک انتخابی را از Zustand می‌خواند
  const storeDoctor = useBookingStore((state) => state.selectedDoctor);
  
  // اولویت با دیتای ورودی است، اگر نبود از استور استفاده می‌شود
  const doctor = propsDoctor || storeDoctor;

  // لایه محافظ: اگر هیچ دیتایی نبود
  if (!doctor) {
    return (
      <div className="w-[804px] h-[184px] rounded-[10px] border border-[#E7E7E7] bg-white p-4 flex items-center justify-center font-vazirmatn text-sm text-gray-400">
        در حال بارگذاری اطلاعات پزشک...
      </div>
    );
  }

  // مدیریت فیلدهای تصویر و مقادیر تهی
  const doctorImage = doctor.avatar || doctor.image || '/assets/logo.png';
  const rating = doctor.rating ?? 5;
  const reviewCount = doctor.reviewCount ?? 0;
  const medicalCode = doctor.medicalCode || 'ثبت نشده';
  const address = doctor.address || 'مطب پزشک (ثبت نشده)';
  const firstAvailable = doctor.firstAvailable || 'شنبه هفته آینده';

  return (
    <div className="w-[804px] rounded-[10px] border border-[#E7E7E7] bg-white p-4 flex items-start gap-4" dir="rtl">
      
      {/* تصویر دکتر */}
      <div className="w-[120px] h-[150px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 relative">
        <img
          src={doctorImage}
          alt={doctor.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/logo.png';
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
            {toPersianNumber(rating)}
          </span>
          <span className="font-vazirmatn font-normal text-xs text-[#888888]">
            ({toPersianNumber(reviewCount)} نظر)
          </span>
        </div>

        {/* آدرس مطب */}
        <div className="flex items-center gap-2 mt-1">
          <MapPin size={16} className="text-[#666666] flex-shrink-0" />
          <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E]">
            آدرس مطب: {address}
          </span>
        </div>

        {/* اولین نوبت */}
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-[#666666] flex-shrink-0" />
          <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E]">
            اولین نوبت در دسترس: {firstAvailable}
          </span>
        </div>
      </div>
    </div>
  );
}