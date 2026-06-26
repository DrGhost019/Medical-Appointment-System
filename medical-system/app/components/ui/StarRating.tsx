"use client";

import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
}

const StarRating = ({ 
  rating, 
  maxRating = 5, 
  size = 16,
  className = '' 
}: StarRatingProps) => {
  
  // گرد کردن امتیاز برای مقایسه دقیق ایندکس‌ها
  const validRating = rating ?? 5;

  return (
    // تنظیم کانتینر روی حالت ltr برای تراز درست پر شدن ستاره‌ها از چپ به راست
    <div className={`flex items-center gap-0.5 ${className}`} dir="ltr">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          size={size}
          className="transition-colors duration-200"
          // استفاده از کد رنگی دقیق و هماهنگ #FFB800 برای ستاره‌های پر شده
          fill={index < Math.floor(validRating) ? '#FFB800' : '#E0E0E0'}
          stroke={index < Math.floor(validRating) ? '#FFB800' : '#E0E0E0'}
        />
      ))}
      {/* متن نمایش امتیاز هماهنگ با فونت کل سایت */}
      <span className="ml-1.5 font-vazirmatn font-bold text-sm text-[#FFB800]">
        {validRating}
      </span>
    </div>
  );
};

export default StarRating;