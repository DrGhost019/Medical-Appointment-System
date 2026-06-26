import React from 'react';
import { Check, MapPin, Clock, User, Stethoscope } from 'lucide-react';

// 👈 تبدیل آدرس الیاس (@) به آدرس‌های کامل و نسبی محلی برای حل ارور ماژول
import { DoctorDetail } from '../../data/doctorDetails';
import { toPersianNumber } from '../../lib/persianNumber';

interface DoctorSummaryCardProps {
  doctor: DoctorDetail;
  appointmentDate: string;
  appointmentTime: string;
  patientName: string;
}

const DoctorSummaryCard = ({ 
  doctor, 
  appointmentDate, 
  appointmentTime, 
  patientName 
}: DoctorSummaryCardProps) => {
  return (
    <div className="w-full rounded-xl border border-[#E7E7E7] bg-white p-6 flex flex-col gap-5">
      
      {/* بخش بالا: تصویر + اطلاعات پزشک */}
      <div className="flex items-start gap-4">
        {/* تصویر پزشک */}
        <div className="w-[120px] h-[150px] rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* اطلاعات پزشک */}
        <div className="flex-1 flex flex-col gap-2">
          {/* نام + کد نظام پزشکی */}
          <div className="flex items-center justify-between">
            <h3 className="font-vazirmatn font-bold text-lg text-[#2E2E2E]">
              {doctor.name}
            </h3>
            <div className="flex items-center gap-1.5">
              <span className="font-vazirmatn font-normal text-xs text-[#666666]">
                کد نظام پزشکی: {doctor.medicalCode}
              </span>
              <div className="w-4 h-4 rounded-full border border-[#4CAF50] flex items-center justify-center">
                <Check size={10} className="text-[#4CAF50]" />
              </div>
            </div>
          </div>

          {/* تخصص */}
          <p className="font-vazirmatn font-normal text-sm text-[#666666]">
            {doctor.specialty}
          </p>

          {/* امتیاز */}
          <div className="flex items-center gap-1.5">
            {/* 👈 استفاده از flex-row-reverse برای پر شدن صحیح ستاره‌ها از راست به چپ در RTL */}
            <div className="flex items-center flex-row-reverse">
              {[5, 4, 3, 2, 1].map((star) => (
                <svg
                  key={star}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={star <= Math.floor(doctor.rating) ? '#FFB800' : '#E0E0E0'}
                  className="mr-0.5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="font-vazirmatn font-bold text-xs text-[#FFB800]">
              {toPersianNumber(doctor.rating)}
            </span>
            <span className="font-vazirmatn font-normal text-xs text-[#888888]">
              ({toPersianNumber(doctor.reviewCount)} نظر)
            </span>
          </div>
        </div>
      </div>

      {/* خط جداکننده */}
      <div className="border-t border-[#E7E7E7]"></div>

      {/* اطلاعات نوبت */}
      <div className="flex flex-col gap-3">
        {/* آدرس مطب */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#666666]" />
            <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E]">
              آدرس مطب
            </span>
          </div>
          <span className="font-vazirmatn font-normal text-sm text-[#666666] text-left">
            {doctor.address}
          </span>
        </div>

        {/* نوع نوبت - با آیکون */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stethoscope size={16} className="text-[#666666]" />
            <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E]">
              نوع نوبت
            </span>
          </div>
          <span className="font-vazirmatn font-medium text-sm text-[#4179F0]">
            حضوری
          </span>
        </div>

        {/* زمان نوبت - داینامیک */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[#666666]" />
            <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E]">
              زمان نوبت
            </span>
          </div>
          <span className="font-vazirmatn font-medium text-sm text-[#2E2E2E]">
            {appointmentDate} ساعت {appointmentTime}
          </span>
        </div>

        {/* مراجعه کننده */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User size={16} className="text-[#666666]" />
            <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E]">
              مراجعه کننده
            </span>
          </div>
          <span className="font-vazirmatn font-medium text-sm text-[#2E2E2E]">
            {patientName}
          </span>
        </div>
      </div>

    </div>
  );
};

export default DoctorSummaryCard;