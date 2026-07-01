"use client";

import React from 'react';
// 👈 ایمپورت تابع تبدیل اعداد به فارسی به صورت نسبی و کامل
import { toPersianNumber } from '../../lib/persianNumber';

interface ReviewTextAreaProps {
  value: string;
  onChange: (value: string) => void;
}

const ReviewTextArea = ({ value, onChange }: ReviewTextAreaProps) => {
  return (
    <div
      className="flex flex-col gap-3 w-full"
      style={{
        maxWidth: '760px',
      }}
    >
      {/* عنوان */}
      <label className="font-vazirmatn font-medium text-sm text-[#2E2E2E]">
        نظر خود را در بخش زیر وارد کنید
      </label>

      {/* Textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="نظر خود را در اینجا وارد کنید"
        className="w-full h-[180px] rounded-lg border border-[#E7E7E7] bg-white p-4 font-vazirmatn font-normal text-sm text-[#2E2E2E] placeholder:text-[#888888] focus:outline-none focus:border-[#4179F0] focus:ring-2 focus:ring-blue-100 resize-none"
        maxLength={500}
      />

      {/* شمارنده کاراکتر */}
      <div className="flex justify-end">
        <span className="font-vazirmatn font-normal text-xs text-[#888888] dir-ltr">
          {toPersianNumber(value.length)} / {toPersianNumber(500)}
        </span>
      </div>
    </div>
  );
};

export default ReviewTextArea;