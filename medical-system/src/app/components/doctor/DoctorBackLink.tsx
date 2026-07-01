"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const DoctorBackLink = () => {
  return (
    <div className="w-full h-6 text-right" dir="rtl">
      <Link 
        href="/"
        className="inline-flex items-center gap-2 group"
      >
        <ArrowRight
          size={18}
          className="text-[#3D3D3D] group-hover:text-[#4179F0] transition-colors"
        />
        <h2 className="font-vazirmatn font-bold text-[20px] leading-[120%] text-[#3D3D3D]">
          صفحه پزشک
        </h2>
      </Link>
    </div>
  );
};

export default DoctorBackLink;