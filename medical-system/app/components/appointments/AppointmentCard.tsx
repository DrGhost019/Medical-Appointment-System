"use client";

import React from 'react';
import { MapPin, Clock, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';

// 👈 تبدیل آدرس الیاس (@) به آدرس‌های کامل و نسبی محلی برای حل ارور ماژول
import { DoctorDetail } from '../../data/doctorDetails';
import { toPersianNumber } from '../../lib/persianNumber';

interface AppointmentCardProps {
  doctor: DoctorDetail;
  appointmentDate: string;
  appointmentTime: string;
  trackingCode: string;
}

const AppointmentCard = ({ 
  doctor, 
  appointmentDate, 
  appointmentTime, 
  trackingCode 
}: AppointmentCardProps) => {
  const formatAppointmentDate = () => {
    return `${appointmentDate} - ساعت ${appointmentTime}`;
  };

  return (
    <div className="w-full bg-white p-6 flex flex-col gap-6 rounded-xl border border-[#E7E7E7]">
      {/* ردیف اول: تصویر + اطلاعات پزشک + کد نظام */}
      <div className="flex items-start justify-between gap-4">
        {/* سمت راست: تصویر پزشک */}
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* وسط: اطلاعات پزشک */}
        <div className="flex-1 flex flex-col gap-2">
          <h3 className="font-vazirmatn font-bold text-lg text-[#2E2E2E] text-right">
            {doctor.name}
          </h3>
          <p className="font-vazirmatn font-normal text-sm text-[#666666] text-right">
            {doctor.specialty}
          </p>
          <div className="flex items-center gap-1.5 justify-start">
            {/* استفاده از flex-row-reverse برای پر شدن صحیح ستاره‌ها از راست به چپ در RTL */}
            <div className="flex items-center flex-row-reverse">
              {[5, 4, 3, 2, 1].map((star) => (
                <svg
                  key={star}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={star <= Math.floor(doctor.rating) ? '#FFB800' : '#E0E0E0'}
                  className="ml-0.5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="font-vazirmatn font-normal text-xs text-[#888888]">
              ({toPersianNumber(doctor.reviewCount)} نظر)
            </span>
          </div>
        </div>

        {/* سمت چپ: کد نظام پزشکی */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className="font-vazirmatn font-normal text-sm text-[#666666]">
            کد نظام پزشکی: {toPersianNumber(doctor.medicalCode)}
          </span>
          <CheckCircle size={14} className="text-[#4CAF50]" />
        </div>
      </div>

      {/* خط جداکننده */}
      <div className="border-t border-[#E7E7E7]"></div>

      {/* جزئیات نوبت */}
      <div className="flex flex-col gap-3">
        {/* آدرس مطب */}
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-[#666666] flex-shrink-0" />
          <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E] text-right">
            آدرس مطب: {doctor.address || 'تهران، ستارخان، خیابان هفتم، پلاک ۴۰'}
          </span>
        </div>

        {/* تاریخ نوبت */}
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-[#666666] flex-shrink-0" />
          <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E]">
            تاریخ نوبت: {formatAppointmentDate()}
          </span>
        </div>

        {/* کد پیگیری */}
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-[#666666] flex-shrink-0" />
          <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E]">
            کد پیگیری: {toPersianNumber(trackingCode)}
          </span>
        </div>
      </div>

      {/* خط جداکننده */}
      <div className="border-t border-[#E7E7E7]"></div>

      {/* دکمه‌ها */}
      <div className="flex items-center gap-4">
        {/* دکمه مشاهده پروفایل (سمت راست) */}
        <Link href={`/doctors/${doctor.id}`} className="flex-1 cursor-pointer">
          <button 
            type="button" 
            className="w-full h-12 rounded-lg bg-[#4179F0] text-white font-vazirmatn font-medium text-sm hover:bg-[#3565d0] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>مشاهده پروفایل</span>
            {/* تغییر فلش به سمت راست یا جلو هماهنگ با جریان طراحی فارسی */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </Link>

        {/* دکمه لغو نوبت (سمت چپ) */}
        <Link href="/appointments/cancelled" className="flex-1 cursor-pointer">
          <button 
            type="button" 
            className="w-full h-12 rounded-lg border border-[#E7E7E7] bg-white text-[#666666] font-vazirmatn font-medium text-sm hover:bg-gray-50 transition-colors cursor-pointer"
          >
            لغو نوبت
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AppointmentCard;