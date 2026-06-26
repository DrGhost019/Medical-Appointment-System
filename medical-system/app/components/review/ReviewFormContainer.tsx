"use client";

import React from 'react';

// 👈 تبدیل آدرس الیاس (@) به آدرس کامل و نسبی محلی برای حل ارور ماژول
import { DoctorDetail } from '../../data/doctorDetails';

import DoctorInfoCard from './DoctorInfoCard';
import ReviewFormClient from './ReviewFormClient';

interface ReviewFormContainerProps {
  doctor: DoctorDetail;
}

const ReviewFormContainer = ({ doctor }: ReviewFormContainerProps) => {
  // لاگ برای بررسی doctor.id
  console.log('Doctor in container:', doctor);
  console.log('Doctor ID:', doctor.id);

  return (
    <div
      className="rounded-xl border border-[#E7E7E7] bg-white flex flex-col mx-auto w-full"
      style={{
        maxWidth: '808px',
        minHeight: '429px',
        padding: '24px 24px 8px 24px',
        gap: '16px',
      }}
    >
      {/* Doctor Info Card */}
      <DoctorInfoCard doctor={doctor} />

      {/* Review Form Client */}
      <ReviewFormClient doctorId={doctor.id} />
    </div>
  );
};

export default ReviewFormContainer;