// src/components/profile/ProfileImageSection.tsx
"use client";
import React, { useRef, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const ProfileImageSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, updateUser } = useAuthStore();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // بارگذاری آواتار از localStorage در ابتدا
  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setAvatarPreview(savedAvatar);
      updateUser({ avatar: savedAvatar });
    }
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // بررسی نوع فایل (فقط عکس)
    if (!file.type.startsWith('image/')) {
      alert('لطفاً فقط فایل تصویری انتخاب کنید');
      return;
    }

    // تبدیل به base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setAvatarPreview(base64String);
      localStorage.setItem('userAvatar', base64String);
      updateUser({ avatar: base64String });
    };
    reader.readAsDataURL(file);
  };

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
      {/* تصویر پروفایل - با placeholder اگر عکسی نباشد */}
      <div
        className="rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center bg-gray-100"
        style={{
          width: '193px',
          height: '193px',
          border: '1px solid #F0F5FE',
        }}
      >
        {avatarPreview ? (
          <img
            src={avatarPreview}
            alt="پروفایل کاربر"
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#CCCCCC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}
      </div>

      {/* Input مخفی برای انتخاب فایل */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* دکمه آپلود تصویر */}
      <button
        type="button"
        onClick={handleImageClick}
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