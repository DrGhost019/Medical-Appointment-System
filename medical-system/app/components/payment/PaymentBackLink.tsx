// src/components/payment/PaymentBackLink.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PaymentBackLinkProps {
  backUrl: string;
}

const PaymentBackLink = ({ backUrl }: PaymentBackLinkProps) => {
  return (
    <div className="w-[1218px] h-6">
      <Link 
        href={backUrl}
        className="inline-flex items-center gap-2 group"
      >
        <ArrowLeft 
          size={18} 
          className="text-[#3D3D3D] group-hover:text-[#4179F0] transition-colors" 
        />
        <h2 className="font-vazirmatn font-bold text-[20px] leading-[120%] text-[#3D3D3D]">
          پرداخت و ثبت رزرو
        </h2>
      </Link>
    </div>
  );
};

export default PaymentBackLink;