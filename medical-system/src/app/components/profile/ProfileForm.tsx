// src/app/components/profile/ProfileForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import ProfileField from './ProfileField';
import { useAuthStore } from '../../store/authStore';

const ProfileForm = () => {
  const { user } = useAuthStore();  // ✅ گرفتن اطلاعات کاربر از استور
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nationalCode: '',
    birthDate: '',
    gender: '',
    city: '',
    phone: '',
    email: '',
    address: '',
    postalCode: '',
  });

  // ✅ پر کردن فرم با اطلاعات کاربر از استور
  useEffect(() => {
    if (user) {
      // فرض کنیم اسم کاربر به صورت کامل توی user.name ذخیره شده
      const nameParts = user.name?.split(' ') || ['', ''];
      setFormData({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        nationalCode: '',
        birthDate: '',
        gender: '',
        city: '',
        phone: user.phone || '',
        email: '',
        address: '',
        postalCode: '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useAuthStore.getState().token}`,
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('اطلاعات با موفقیت ذخیره شد!');
        setIsEditing(false);
        // به‌روزرسانی استور
        useAuthStore.getState().updateUser({ 
          name: `${formData.firstName} ${formData.lastName}`.trim() 
        });
      } else {
        alert(data.message || 'خطا در ذخیره اطلاعات');
      }
    } catch (error) {
      alert('خطا در ارتباط با سرور');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E7E7E7] p-8 w-full max-w-[800px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileField
          label="نام"
          name="firstName"
          value={formData.firstName}
          isEditing={isEditing}
          onChange={handleChange}
        />
        <ProfileField
          label="نام خانوادگی"
          name="lastName"
          value={formData.lastName}
          isEditing={isEditing}
          onChange={handleChange}
        />
        <ProfileField
          label="کد ملی"
          name="nationalCode"
          value={formData.nationalCode}
          isEditing={isEditing}
          onChange={handleChange}
        />
        <ProfileField
          label="تاریخ تولد"
          name="birthDate"
          value={formData.birthDate}
          isEditing={isEditing}
          onChange={handleChange}
        />
        <ProfileField
          label="جنسیت"
          name="gender"
          value={formData.gender}
          isEditing={isEditing}
          onChange={handleChange}
        />
        <ProfileField
          label="شهر"
          name="city"
          value={formData.city}
          isEditing={isEditing}
          onChange={handleChange}
        />
        <ProfileField
          label="شماره موبایل"
          name="phone"
          value={formData.phone}
          isEditing={isEditing}
          onChange={handleChange}
        />
        <ProfileField
          label="ایمیل"
          name="email"
          value={formData.email}
          isEditing={isEditing}
          onChange={handleChange}
        />
        <div className="md:col-span-2">
          <ProfileField
            label="آدرس"
            name="address"
            value={formData.address}
            isEditing={isEditing}
            onChange={handleChange}
          />
        </div>
        <ProfileField
          label="کد پستی"
          name="postalCode"
          value={formData.postalCode}
          isEditing={isEditing}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end gap-3 mt-8">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-2.5 rounded-lg border border-[#E7E7E7] text-[#666666] font-vazirmatn font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              انصراف
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-lg bg-[#4179F0] text-white font-vazirmatn font-medium text-sm hover:bg-[#3565d0] transition-colors"
            >
              ذخیره تغییرات
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2.5 rounded-lg bg-[#4179F0] text-white font-vazirmatn font-medium text-sm hover:bg-[#3565d0] transition-colors"
          >
            ویرایش اطلاعات
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;