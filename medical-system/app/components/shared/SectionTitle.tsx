"use client";

import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  onViewAll?: () => void;
}

const SectionTitle = ({ title, subtitle, onViewAll }: SectionTitleProps) => {
  return (
    <div className="w-full flex items-center justify-between mb-6" dir="rtl">
      
      {/* سمت راست: عنوان و زیرعنوان بخش */}
      <div className="flex flex-col gap-1 text-right">
        <h2 className="text-2xl font-vazirmatn font-bold text-[#2E2E2E]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm font-vazirmatn font-normal text-[#666666]">
            {subtitle}
          </p>
        )}
      </div>

      {/* سمت چپ: دکمه مشاهده همه (در صورت وجود اکشن) */}
      {onViewAll && (
        <button
          type="button"
          onClick={onViewAll}
          className="flex items-center gap-0.5 text-[#4179F0] hover:text-[#3565d0] transition-colors font-vazirmatn font-medium text-sm"
        >
          مشاهده همه
          <ChevronLeft size={16} className="mt-0.5" />
        </button>
      )}
      
    </div>
  );
};

export default SectionTitle;