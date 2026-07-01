// src/components/payment/PaymentDetails.tsx
import React from 'react';
import { toPersianNumber } from '../../lib/persianNumber';

interface PaymentDetailsProps {
  visitFee?: number;
  serviceFee?: number;
  discount?: number;
}

export default function PaymentDetails({ 
  visitFee = 200000, 
  serviceFee = 20000, 
  discount = 0 
}: PaymentDetailsProps) {
  const totalAmount = visitFee + serviceFee - discount;

  // تبدیل اعداد به فرمت سه رقم سه رقم فارسی
  const formatNumber = (num: number): string => {
    return toPersianNumber(num.toLocaleString('en-US'));
  };

  return (
    <div className="w-full rounded-xl border border-[#E7E7E7] bg-white p-6">
      {/* عنوان */}
      <h3 className="font-vazirmatn font-bold text-base text-[#2E2E2E] mb-5 text-right">
        جزئیات پرداخت
      </h3>

      {/* ردیف‌ها */}
      <div className="flex flex-col gap-4">
        {/* مبلغ ویزیت */}
        <div className="flex items-center justify-between">
          <span className="font-vazirmatn font-normal text-sm text-[#666666]">
            مبلغ ویزیت:
          </span>
          <span className="font-vazirmatn font-medium text-sm text-[#2E2E2E]">
            {formatNumber(visitFee)} تومان
          </span>
        </div>

        {/* هزینه کارمزد */}
        <div className="flex items-center justify-between">
          <span className="font-vazirmatn font-normal text-sm text-[#666666]">
            هزینه کارمزد:
          </span>
          <span className="font-vazirmatn font-medium text-sm text-[#2E2E2E]">
            {formatNumber(serviceFee)} تومان
          </span>
        </div>

        {/* تخفیف (در صورت وجود) */}
        {discount > 0 && (
          <div className="flex items-center justify-between text-green-600">
            <span className="font-vazirmatn font-normal text-sm">
              تخفیف:
            </span>
            <span className="font-vazirmatn font-medium text-sm">
              -{formatNumber(discount)} تومان
            </span>
          </div>
        )}

        {/* خط جداکننده */}
        <div className="border-t border-[#E7E7E7]"></div>

        {/* مبلغ نهایی */}
        <div className="flex items-center justify-between">
          <span className="font-vazirmatn font-bold text-sm text-[#2E2E2E]">
            مبلغ نهایی:
          </span>
          <span className="font-vazirmatn font-bold text-base text-[#2E2E2E]">
            {formatNumber(totalAmount)} تومان
          </span>
        </div>
      </div>
    </div>
  );
}