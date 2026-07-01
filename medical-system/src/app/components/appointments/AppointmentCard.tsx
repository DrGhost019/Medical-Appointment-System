// src/components/appointment/AppointmentCard.tsx
"use client";

import React, { useState } from 'react';
import { MapPin, Clock, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { toPersianNumber } from '../../lib/persianNumber';
import { useAuthStore } from '../../store/authStore';

interface Doctor {
  id: string;
  _id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviewCount: number;
  medicalCode: string;
  address: string;
}

interface AppointmentCardProps {
  doctor: Doctor;
  appointmentDate: string;
  appointmentTime: string;
  trackingCode: string;
}

export default function AppointmentCard({
  doctor,
  appointmentDate,
  appointmentTime,
  trackingCode,
}: AppointmentCardProps) {
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const { token } = useAuthStore();

  const formatAppointmentDate = () => {
    return `${appointmentDate} - ساعت ${appointmentTime}`;
  };

  const handleCancel = async () => {
    if (!confirm('آیا از لغو این نوبت مطمئن هستید؟')) return;

    setIsCancelling(true);
    setCancelError(null);

    try {
      const response = await fetch('/api/appointments/cancel', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ slotId: doctor._id }),
      });

      const data = await response.json();

      if (data.success) {
        alert('نوبت با موفقیت لغو شد.');
        window.location.reload();
      } else {
        setCancelError(data.message || 'خطا در لغو نوبت');
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      setCancelError('خطا در ارتباط با سرور');
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="w-full bg-white p-6 flex flex-col gap-6 rounded-xl border border-[#E7E7E7]">
      
      {/* ردیف اول: تصویر + اطلاعات پزشک */}
      <div className="flex items-start justify-between gap-4">
        {/* تصویر پزشک */}
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/logo.png';
            }}
          />
        </div>

        {/* اطلاعات پزشک */}
        <div className="flex-1 flex flex-col gap-2">
          <h3 className="font-vazirmatn font-bold text-lg text-[#2E2E2E] text-right">
            {doctor.name}
          </h3>
          <p className="font-vazirmatn font-normal text-sm text-[#666666] text-right">
            {doctor.specialty}
          </p>
          <div className="flex items-center gap-1.5 justify-start">
            <div className="flex items-center flex-row-reverse">
              {[5, 4, 3, 2, 1].map((star) => (
                <svg
                  key={star}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={star <= Math.floor(doctor.rating) ? '#FFB800' : '#E0E0E0'}
                  className="ml-0.5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="font-vazirmatn font-normal text-xs text-[#888888]">
              ({toPersianNumber(doctor.reviewCount)} نظر)
            </span>
          </div>
        </div>

        {/* کد نظام پزشکی */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className="font-vazirmatn font-normal text-sm text-[#666666]">
            کد نظام پزشکی: {toPersianNumber(doctor.medicalCode)}
          </span>
          <CheckCircle size={14} className="text-[#4CAF50]" />
        </div>
      </div>

      {/* خط جداکننده */}
      <div className="border-t border-[#E7E7E7]"></div>

      {/* جزئیات نوبت */}
      <div className="flex flex-col gap-3">
        {/* آدرس مطب */}
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-[#666666] flex-shrink-0" />
          <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E] text-right">
            آدرس مطب: {doctor.address}
          </span>
        </div>

        {/* تاریخ نوبت */}
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-[#666666] flex-shrink-0" />
          <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E]">
            تاریخ نوبت: {formatAppointmentDate()}
          </span>
        </div>

        {/* کد پیگیری */}
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-[#666666] flex-shrink-0" />
          <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E]">
            کد پیگیری: {toPersianNumber(trackingCode)}
          </span>
        </div>
      </div>

      {/* خط جداکننده */}
      <div className="border-t border-[#E7E7E7]"></div>

      {/* پیام خطا */}
      {cancelError && (
        <div className="text-red-500 text-sm font-vazirmatn text-right">
          {cancelError}
        </div>
      )}

      {/* دکمه‌ها */}
      <div className="flex items-center gap-4">
        {/* مشاهده پروفایل */}
        <Link href={`/doctors/${doctor.id}`} className="flex-1">
          <button
            type="button"
            className="w-full h-12 rounded-lg bg-[#4179F0] text-white font-vazirmatn font-medium text-sm hover:bg-[#3565d0] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>مشاهده پروفایل</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </Link>

        {/* لغو نوبت */}
        <button
          type="button"
          onClick={handleCancel}
          disabled={isCancelling}
          className="flex-1 h-12 rounded-lg border border-[#E7E7E7] bg-white text-[#666666] font-vazirmatn font-medium text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isCancelling ? 'در حال لغو...' : 'لغو نوبت'}
        </button>
      </div>
    </div>
  );
}