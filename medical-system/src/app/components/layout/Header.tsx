// src/app/components/layout/Header.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UserProfile from './UserProfile';
import { useAuthStore } from '../../store/authStore';

const Header = () => {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ اصلاح: لیست پزشکان به /doctors
  const navItems = [
    { label: 'لیست پزشکان', href: '/doctors' },
    { label: 'سوالات متداول', href: '/faq' },
    { label: 'درباره ما', href: '/about' },
    { label: 'تماس با ما', href: '/contact' },
  ];

  const handleLoginClick = () => {
    router.push('/auth/login');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="w-full bg-white border-b border-[#E7E7E7]" dir="rtl">
      <div className="max-w-[1440px] mx-auto px-[110px] h-[80px] flex items-center justify-between">
        
        {/* لوگو */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer flex-shrink-0">
          <img
            src="/assets/logo.png"
            alt="دکتر رزرو"
            className="h-10 w-auto"
          />
        </Link>

        {/* منوی اصلی */}
        <nav className="flex items-center gap-12 px-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="font-vazirmatn font-normal text-base leading-[100%] text-[#262626] hover:text-[#4179F0] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* دکمه ورود / پروفایل */}
        <div className="flex items-center justify-end min-w-[140px]">
          {!isMounted ? (
            <div className="w-[140px] h-10 bg-gray-50 rounded-lg animate-pulse" />
          ) : isAuthenticated() && user ? (
            <UserProfile 
              userName={user.name || 'کاربر'}
              userAvatar={user.avatar}
              onLogout={handleLogout}
            />
          ) : (
            <button 
              type="button"
              onClick={handleLoginClick}
              className="w-[140px] h-10 rounded-lg border border-[#4179F0] text-[#4179F0] font-vazirmatn font-medium text-sm hover:bg-blue-50 transition-colors"
            >
              ورود / ثبت نام
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;