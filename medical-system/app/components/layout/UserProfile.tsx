"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Edit, LogOut, ChevronDown } from 'lucide-react';

// ۱. مطمئن شو که متد onLogout دقیقاً اینجاست 👇
interface UserProfileProps {
  userName: string;
  userAvatar?: string;
  onLogout: () => void; // 👈 تعریف نوع تابع بدون بازگشت
}

const UserProfile = ({ userName, userAvatar, onLogout }: UserProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // بستن دراپ‌داون با کلیک روی خارج از محیط آن
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // مدیریت تصویر پیش‌فرض در صورت نبود آواتار
  const avatarSrc = userAvatar || '/assets/default-avatar.png';

  return (
    <div className="relative" ref={dropdownRef} dir="rtl">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-90 transition-opacity select-none"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#4179F0] bg-gray-100 flex-shrink-0">
          <img
            src={avatarSrc}
            alt={userName}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/default-avatar.png';
            }}
          />
        </div>
        <span className="font-vazirmatn font-medium text-sm text-[#2E2E2E] max-w-[100px] truncate">
          {userName}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-[#666666] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        // تغییر به right-0 برای هماهنگی با چیدمان راست‌چین
        <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-[#E7E7E7] bg-white shadow-lg py-2 z-50 text-right">
          
          <Link href="/profile" onClick={() => setIsOpen(false)}>
            <div className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer">
              <Edit size={16} className="text-[#666666] flex-shrink-0" />
              <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E]">
                ویرایش نمایه
              </span>
            </div>
          </Link>

          <div className="border-t border-[#E7E7E7] my-1"></div>

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-right"
          >
            <LogOut size={16} className="text-[#E53E3E] flex-shrink-0" />
            <span className="font-vazirmatn font-normal text-sm text-[#E53E3E]">
              خروج از حساب
            </span>
          </button>
          
        </div>
      )}
    </div>
  );
};

export default UserProfile;