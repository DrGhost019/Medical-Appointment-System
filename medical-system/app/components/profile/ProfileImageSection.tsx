// src/components/profile/ProfileImageSection.tsx
"use client";

import React from 'react';
import { Plus } from 'lucide-react';

const ProfileImageSection = () => {
  return (
    <div
      className="flex flex-col items-center bg-white"
      style={{
        width: '225px',
        height: '279px',
        padding: '15px 16px',
        gap: '16px',
        borderRadius: '12px',
        border: '1px solid #E7E7E7',
      }}
    >
      {/* تصویر پروفایل */}
      <div
        className="rounded-full overflow-hidden flex-shrink-0"
        style={{
          width: '193px',
          height: '193px',
          border: '1px solid #F0F5FE',
        }}
      >
        <img
          src="/assets/fatemetayebi.jpg"
          alt="پروفایل کاربر"
          className="w-full h-full object-cover"
        />
      </div>

      {/* دکمه آپلود تصویر */}
      <button
        className="flex items-center justify-center gap-2 rounded-lg border border-[#4179F0] bg-white hover:bg-blue-50 transition-colors flex-shrink-0"
        style={{
          width: '191px',
          height: '40px',
        }}
      >
        <Plus size={18} className="text-[#4179F0]" />
        <span className="font-vazirmatn font-medium text-sm text-[#4179F0]">
          آپلود تصویر
        </span>
      </button>
    </div>
  );
};

export default ProfileImageSection;