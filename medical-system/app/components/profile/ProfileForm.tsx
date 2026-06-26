// src/components/profile/ProfileForm.tsx
"use client";

import React from 'react';
import ProfileField from './ProfileField';

const ProfileForm = () => {
  return (
    <div
      className="bg-white flex flex-col"
      style={{
        width: '800px',
        minHeight: '711px',
        padding: '32px',
        gap: '32px',
        borderRadius: '12px',
        border: '1px solid #E7E7E7',
      }}
    >
      {/* ردیف 1: نام و نام خانوادگی */}
      <div className="flex items-start justify-between gap-8">
        <ProfileField label="نام:" placeholder="فاطمه" />
        <ProfileField label="نام خانوادگی:" placeholder="طیبی" />
      </div>

      {/* ردیف 2: کد ملی و سال تولد */}
      <div className="flex items-start justify-between gap-8">
        <ProfileField label="کد ملی:" placeholder="۳۷۹۰۰۹۷۲۳۲" />
        <ProfileField label="سال تولد:" placeholder="۱۳۶۷/۱۲/۲۲" />
      </div>

      {/* ردیف 3: جنسیت و شهر */}
      <div className="flex items-start justify-between gap-8">
        <ProfileField label="جنسیت:" placeholder="خانم" />
        <ProfileField label="شهر:" placeholder="تهران" />
      </div>

      {/* ردیف 4: شماره موبایل و ایمیل */}
      <div className="flex items-start justify-between gap-8">
        <ProfileField label="شماره موبایل:" placeholder="۰۹۱۲۷۸۲۹۳۸۷" />
        <ProfileField label="ایمیل:" placeholder="ایمیل خود را وارد کن" />
      </div>

      {/* دکمه ویرایش اطلاعات */}
      <div className="flex justify-end mt-auto">
        <button
          className="flex items-center justify-center font-vazirmatn font-medium text-base text-white bg-[#4179F0] hover:bg-[#3565d0] transition-colors"
          style={{
            width: '144px',
            height: '48px',
            minWidth: '144px',
            padding: '12px 12px 12px 10px',
            gap: '8px',
            borderRadius: '8px',
          }}
        >
          ویرایش اطلاعات
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;