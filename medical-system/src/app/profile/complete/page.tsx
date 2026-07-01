// src/app/profile/complete/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function CompleteProfilePage() {
  const router = useRouter();
  const { user, updateUser, token } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('لطفاً نام خود را وارد کنید.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        updateUser({ name: formData.name, ...data.user });
        router.push('/');
      } else {
        setError(data.message || 'خطا در ذخیره اطلاعات');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[500px] mx-auto py-12 px-4">
        <div className="bg-white rounded-xl border border-[#E7E7E7] p-8">
          <h1 className="text-2xl font-bold text-[#2E2E2E] text-right mb-2">
            تکمیل پروفایل
          </h1>
          <p className="text-sm text-[#666666] text-right mb-6">
            لطفاً نام خود را وارد کنید تا پروفایل شما کامل شود.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-right mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="text-right mb-4">
              <label className="block text-sm font-medium text-[#2E2E2E] mb-1">
                نام و نام خانوادگی <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="مثال: علی محمدی"
                className="w-full px-4 py-2 border border-[#E7E7E7] rounded-lg focus:ring-2 focus:ring-[#4179F0] focus:border-transparent outline-none transition text-[#2E2E2E] placeholder:text-[#999999] text-right"
                required
              />
            </div>

            <div className="text-right mb-6">
              <label className="block text-sm font-medium text-[#2E2E2E] mb-1">
                ایمیل (اختیاری)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@email.com"
                className="w-full px-4 py-2 border border-[#E7E7E7] rounded-lg focus:ring-2 focus:ring-[#4179F0] focus:border-transparent outline-none transition text-[#2E2E2E] placeholder:text-[#999999] text-right"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-[#4179F0] text-white font-vazirmatn font-medium text-sm hover:bg-[#3565d0] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'در حال ذخیره...' : 'تکمیل پروفایل'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}