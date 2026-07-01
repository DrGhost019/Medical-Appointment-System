// src/app/components/home/ArticleCard.tsx
"use client";
import React from 'react';

interface ArticleCardProps {
  imageSrc: string;
  title: string;
  excerpt: string;
  date: string;
}

export default function ArticleCard({ imageSrc, title, excerpt, date }: ArticleCardProps) {
  return (
    <div 
      className="flex-1 rounded-[10px] border border-[#E7E7E7] bg-white overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow flex-shrink-0"
      style={{
        width: '394px',
        height: '375px',
      }}
    >
      {/* Article Image */}
      <div className="w-full h-[200px] overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        
        {/* Title */}
        <h3 className="font-vazirmatn font-medium text-base text-[#2E2E2E] leading-[150%] line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="font-vazirmatn font-normal text-sm text-[#666666] leading-[180%] line-clamp-3">
          {excerpt}
        </p>

        {/* Date + Read More Button */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-vazirmatn font-normal text-xs text-[#888888]">
            {date}
          </span>
          <button className="font-vazirmatn font-medium text-xs text-[#4179F0] hover:text-[#3565d0] transition-colors">
            ادامه مطلب
          </button>
        </div>
      </div>
    </div>
  );
}