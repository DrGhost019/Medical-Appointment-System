// src/components/home/SearchSection.tsx
"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // بعداً به صفحه جستجو هدایت می‌شود
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-[1216px] mx-auto px-4">
        
        {/* Main Search Box */}
        <div
          className="relative w-full h-[300px] rounded-2xl overflow-hidden flex items-center justify-center"
          style={{
            backgroundImage: `url('/assets/docterhand.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay سیاه نیمه‌شفاف */}
          <div className="absolute inset-0 bg-[#11111166]"></div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-[616px] flex flex-col items-center gap-6 px-4">
            
            {/* Title */}
            <h2 
              className="font-vazirmatn font-medium text-[32px] leading-[100%] text-white text-center"
              style={{ textShadow: '0px 4px 2px rgba(0, 0, 0, 0.25)' }}
            >
              فقط یک جستجو با بهترین پزشکان فاصله دارید
            </h2>

            {/* Subtitle */}
            <p 
              className="font-vazirmatn font-medium text-[20px] leading-[120%] text-[#FCFCFC] text-center"
              style={{ textShadow: '0px 3px 2px rgba(0, 0, 0, 0.25)' }}
            >
              در کمتر از ۱ دقیقه نوبت خود را رزرو کنید
            </p>

            {/* Search Input */}
            <form 
              onSubmit={handleSearch}
              className="w-full h-[56px] bg-white rounded-lg flex items-center gap-1 px-4"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="پزشک یا تخصص مورد نظر خود را جستجو کنید..."
                className="flex-1 h-full bg-transparent outline-none font-vazirmatn font-normal text-sm leading-[150%] text-[#262626] placeholder:text-[#888888] text-right"
              />
              {/* آیکون ذره‌بین بدون دایره آبی - هم‌رنگ placeholder */}
              <Search size={20} className="text-[#888888] flex-shrink-0" />
            </form>

          </div>
        </div>

      </div>
    </section>
  );
};

export default SearchSection;