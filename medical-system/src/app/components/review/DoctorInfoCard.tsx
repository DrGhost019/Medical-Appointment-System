import React from 'react';
import { Check } from 'lucide-react';

// 👈 تبدیل آدرس الیاس (@) به آدرس کامل و نسبی محلی برای حل ارور ماژول
import { DoctorDetail } from '../../data/doctorDetails';

interface DoctorInfoCardProps {
  doctor: DoctorDetail;
}

const DoctorInfoCard = ({ doctor }: DoctorInfoCardProps) => {
  return (
    <div
      className="flex items-center justify-between w-full"
      style={{
        maxWidth: '760px',
        height: '117px',
        paddingBottom: '16px',
        borderBottom: '1px solid #F0F0F0',
      }}
    >
      {/* مجموعه سمت راست (تصویر و اطلاعات متنی) برای حفظ چیدمان درست در حالت RTL */}
      <div className="flex items-center gap-4 flex-1">
        {/* سمت راست: تصویر پزشک */}
        <div className="w-[100px] h-[117px] rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* وسط: اطلاعات پزشک */}
        <div className="flex flex-col gap-2">
          {/* نام پزشک */}
          <h3 className="font-vazirmatn font-bold text-lg text-[#2E2E2E]">
            {doctor.name}
          </h3>

          {/* تخصص */}
          <p className="font-vazirmatn font-normal text-sm text-[#666666]">
            {doctor.specialty}
          </p>
        </div>
      </div>

      {/* سمت چپ: کد نظام پزشکی */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="font-vazirmatn font-normal text-sm text-[#666666]">
          کد نظام پزشکی: {doctor.medicalCode}
        </span>
        <div className="w-5 h-5 rounded-full border border-[#4CAF50] flex items-center justify-center">
          <Check size={12} className="text-[#4CAF50]" />
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoCard;