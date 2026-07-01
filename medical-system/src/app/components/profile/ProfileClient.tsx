// src/app/components/profile/ProfileClient.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';  // ✅ تغییر
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ProfileImageSection from './ProfileImageSection';
import ProfileForm from './ProfileForm';

export default function ProfileClient() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();  // ✅ تغییر
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/');
    }
    setIsLoading(false);
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="font-vazirmatn text-[#666666]">در حال بارگذاری...</p>
      </main>
    );
  }

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1440px] mx-auto py-8 px-[110px]">
        <div className="flex flex-col gap-6">
          
          <h1 className="font-vazirmatn font-bold text-2xl text-[#2E2E2E] text-right">
            پروفایل کاربری
          </h1>

          <div className="flex items-start gap-6">
            <ProfileImageSection />
            <ProfileForm />
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}