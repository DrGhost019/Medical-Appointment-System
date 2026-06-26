"use client";

import React from 'react';
import Link from 'next/link';
// 👈 استفاده از ArrowRight به جای ArrowLeft برای سازگاری با زبان فارسی (RTL)
import { ArrowRight } from 'lucide-react';

interface ReviewBackLinkProps {
  doctorId: string;
}

const ReviewBackLink = ({ doctorId }: ReviewBackLinkProps) => {
  return (
    <div className="w-full h-6">
      <Link 
        href={`/doctors/${doctorId}`}
        className="inline-flex items-center gap-2 group cursor-pointer text-[#3D3D3D] hover:text-[#4179F0] transition-colors"
      >
        <ArrowRight 
          size={18} 
          className="transition-colors" 
        />
        <h2 className="font-vazirmatn font-bold text-[20px] leading-[120%] transition-colors">
          ثبت نظر
        </h2>
      </Link>
    </div>
  );
};

export default ReviewBackLink;