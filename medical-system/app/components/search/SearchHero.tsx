"use client";

import React from 'react';
import { Search } from 'lucide-react';

// 👈 تعریف تایپ پراپ‌ها برای دریافت استیت و متد تغییر آن از کامپوننت والد (SearchPage)
interface SearchHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchHero = ({ searchQuery, onSearchChange }: SearchHeroProps) => {
  return (
    <section className="w-full relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/docterhand.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay سیاه برای تیره‌تر کردن تصویر */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1216px] mx-auto px-4 py-16 flex flex-col items-center gap-6">
        
        {/* عنوان اصلی */}
        <h1 className="font-vazirmatn font-bold text-[32px] leading-[130%] text-white text-center">
          فقط یک جستجو با بهترین پزشکان فاصله دارید
        </h1>

        {/* زیرعنوان */}
        <p className="font-vazirmatn font-normal text-base leading-[180%] text-white/80 text-center">
          در کمتر از ۱ دقیقه نوبت خود را رزرو کنید
        </p>

        {/* باکس جستجو */}
        <div className="w-full max-w-2xl relative mt-4">
          <input
            type="text"
            value={searchQuery} // 👈 اتصال مستقیم به استیت والد
            onChange={(e) => onSearchChange(e.target.value)} // 👈 فرستادن مقدار جدید به محض تایپ
            placeholder="پزشک یا تخصص مورد نظر خود را جستجو کنید..."
            className="w-full h-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-6 pr-14 pl-6 font-vazirmatn font-normal text-sm text-white placeholder:text-white/60 focus:outline-none focus:border-[#4179F0] focus:ring-2 focus:ring-blue-500/30"
          />
          <Search 
            size={20} 
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" 
          />
        </div>

      </div>
    </section>
  );
};

export default SearchHero;