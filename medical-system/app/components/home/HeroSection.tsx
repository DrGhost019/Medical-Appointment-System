// src/components/home/HeroSection.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import FeatureCard from './FeatureCard';

const HeroSection = () => {
  const router = useRouter();

  const features = [
    {
      iconSrc: '/assets/setting-04.png',
      title: 'مدیریت و تغییر نوبت‌دهی',
      description: 'به راحتی نوبت‌های خود را مدیریت و تغییر دهید',
    },
    {
      iconSrc: '/assets/comment-01.png',
      title: 'اطمینان از انتخاب مجرب‌ترین پزشکان',
      description: 'دسترسی به لیست پزشکان متخصص و باتجربه',
    },
    {
      iconSrc: '/assets/clock-02.png',
      title: 'دسترسی ۲۴ ساعته به پزشکان',
      description: 'در هر ساعت از شبانه‌روز نوبت رزرو کنید',
    },
  ];

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1216px] mx-auto px-4 py-10">
        
        {/* Hero Main Section */}
        <div className="flex items-center justify-between gap-8 mb-0">
          
          {/* Right Side - Text & Buttons */}
          <div className="w-[490px] flex flex-col gap-4">
            <h1 className="font-vazirmatn font-bold text-[36px] leading-[130%] text-[#262626] whitespace-nowrap">
              سلامت شما، رسالت ما
            </h1>
            <p className="font-vazirmatn font-normal text-base leading-[180%] text-[#666666]">
              بهترین پزشکان در دسترس شما، نوبت‌دهی آنلاین مطمئن فقط با چند کلیک.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4 mt-4">
              <button 
                onClick={() => router.push('/search')}
                className="w-[184px] h-[56px] min-w-[144px] rounded-lg bg-[#4179F0] text-white font-vazirmatn font-medium text-base py-3 px-[12px] hover:bg-[#3565d0] transition-colors cursor-pointer"
              >
                رزرو نوبت
              </button>
              <button className="w-[160px] h-[56px] min-w-[144px] rounded-lg bg-white border-[1.5px] border-[#E7E7E7] text-[#262626] font-vazirmatn font-medium text-base py-3 px-[12px] hover:bg-gray-50 transition-colors">
                پشتیبانی
              </button>
            </div>
          </div>

          {/* Left Side - Image */}
          <div className="w-[950px] h-[530px] flex-shrink-0">
            <img
              src="/assets/doctors.png"
              alt="پزشکان دکتر رزرو"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 3 Feature Boxes */}
        <div className="grid grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              iconSrc={feature.iconSrc}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;