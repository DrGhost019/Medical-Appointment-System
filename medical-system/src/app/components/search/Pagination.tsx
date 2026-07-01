"use client";

import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// 👈 تبدیل آدرس الیاس (@) به آدرس کامل و نسبی محلی
import { toPersianNumber } from '../../lib/persianNumber';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // تولید آرایه‌ای از شماره صفحات
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // اگه کل صفحات کمه، همه رو نشون بده
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // همیشه صفحه اول رو نشون بده
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // صفحات اطراف صفحه فعلی
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // همیشه صفحه آخر رو نشون بده
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* دکمه قبلی */}
      <button
        type="button"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-10 h-10 rounded-lg border border-[#E7E7E7] flex items-center justify-center transition-colors ${
          currentPage === 1
            ? 'text-[#CCCCCC] cursor-not-allowed'
            : 'text-[#666666] hover:bg-gray-50 cursor-pointer'
        }`}
      >
        <ChevronRight size={18} />
      </button>

      {/* شماره صفحات */}
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          type="button"
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`w-10 h-10 rounded-lg font-vazirmatn font-medium text-sm transition-colors ${
            page === currentPage
              ? 'bg-[#4179F0] text-white border border-[#4179F0] cursor-pointer'
              : page === '...'
              ? 'text-[#666666] cursor-default'
              : 'border border-[#E7E7E7] text-[#666666] hover:bg-gray-50 cursor-pointer'
          }`}
        >
          {typeof page === 'number' ? toPersianNumber(page) : page}
        </button>
      ))}

      {/* دکمه بعدی */}
      <button
        type="button"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 rounded-lg border border-[#E7E7E7] flex items-center justify-center transition-colors ${
          currentPage === totalPages
            ? 'text-[#CCCCCC] cursor-not-allowed'
            : 'text-[#666666] hover:bg-gray-50 cursor-pointer'
        }`}
      >
        <ChevronLeft size={18} />
      </button>
    </div>
  );
};

export default Pagination;