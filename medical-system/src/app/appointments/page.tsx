// src/app/appointments/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuthStore } from '../store/authStore';
import Link from 'next/link';

export default function AppointmentsPage() {
  const router = useRouter();
  const { token, isAuthenticated } = useAuthStore();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments/patient', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('📦 Full API response:', data);
        
        if (data.success) {
          setAppointments(data.appointments || []);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [token, isAuthenticated, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4179F0] mx-auto mb-4"></div>
            <p className="text-gray-500">در حال بارگذاری نوبت‌ها...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <Header />
      
      <div className="max-w-[1440px] mx-auto py-8 px-4 md:px-[110px]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#2E2E2E] text-right">
            نوبت‌های من
          </h1>
          <Link href="/doctors">
            <button className="px-4 py-2 text-sm bg-[#4179F0] text-white rounded-lg hover:bg-[#3565d0] transition-colors">
              + نوبت جدید
            </button>
          </Link>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-[#E7E7E7]">
            <p className="text-[#666666]">هیچ نوبتی ثبت نشده است.</p>
            <Link href="/doctors" className="text-[#4179F0] hover:underline mt-2 inline-block">
              رزرو نوبت جدید
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {appointments.map((appointment: any) => {
              // اطلاعات پزشک رو از populate بگیر
              const doctor = appointment.doctorId || {};
              const doctorId = doctor._id || appointment.doctorId?._id || '';

              return (
                <div key={appointment._id} className="bg-white rounded-xl border border-[#E7E7E7] p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    
                    {/* سمت راست: اطلاعات پزشک */}
                    <div className="text-right">
                      <h3 className="font-bold text-lg text-[#2E2E2E]">
                        {doctor.name || 'پزشک'}
                      </h3>
                      <p className="text-sm text-[#666666]">
                        {doctor.specialty || 'تخصص نامشخص'}
                      </p>
                      <p className="text-xs text-[#888888] mt-1">
                        کد نظام پزشکی: {doctor.medicalCode || '---'}
                      </p>
                    </div>

                    {/* سمت چپ: اطلاعات نوبت */}
                    <div className="text-left md:text-center">
                      <p className="text-sm font-medium text-[#2E2E2E]">
                        📅 {appointment.date || 'تاریخ نامشخص'}
                      </p>
                      <p className="text-sm text-[#4179F0]">
                        🕐 {appointment.time || 'ساعت نامشخص'}
                      </p>
                      <p className="text-xs text-[#888888] mt-1">
                        کد پیگیری: {appointment._id?.slice(-6) || '---'}
                      </p>
                    </div>

                    {/* دکمه مشاهده پروفایل پزشک */}
                    <div className="flex gap-2">
                      {doctorId ? (
                        <Link href={`/doctors/${doctorId}`}>
                          <button className="px-4 py-2 text-sm border border-[#4179F0] text-[#4179F0] rounded-lg hover:bg-blue-50 transition-colors">
                            مشاهده پروفایل
                          </button>
                        </Link>
                      ) : (
                        <span className="text-sm text-[#888888]">پروفایل موجود نیست</span>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}