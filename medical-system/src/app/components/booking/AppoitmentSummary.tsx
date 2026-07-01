// src/app/components/booking/AppointmentSummary.tsx
"use client";

import React from 'react';
import { useBookingStore } from '../../store/bookingStore';
import { Calendar, Clock, User } from 'lucide-react';

export default function AppointmentSummary() {
  const { selectedDate, selectedSlot, patientInfo } = useBookingStore();

  if (!selectedSlot) {
    return (
      <div className="w-full rounded-xl border border-[#E7E7E7] bg-white p-6 text-center">
        <p className="font-vazirmatn text-sm text-[#666666]">
          هنوز بازه زمانی انتخاب نشده است.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-[#E7E7E7] bg-white p-6">
      <h3 className="font-vazirmatn font-bold text-base text-[#2E2E2E] mb-4 text-right">
        خلاصه نوبت
      </h3>

      <div className="flex flex-col gap-4">
        {/* تاریخ */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-[#4179F0]" />
            <span className="font-vazirmatn font-normal text-sm text-[#666666]">
              تاریخ:
            </span>
          </div>
          <span className="font-vazirmatn font-medium text-sm text-[#2E2E2E]">
            {selectedDate || 'انتخاب نشده'}
          </span>
        </div>

        {/* ساعت */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-[#4179F0]" />
            <span className="font-vazirmatn font-normal text-sm text-[#666666]">
              ساعت:
            </span>
          </div>
          <span className="font-vazirmatn font-medium text-sm text-[#2E2E2E]">
            {selectedSlot.time || 'انتخاب نشده'}
          </span>
        </div>

        {/* مراجعه کننده */}
        {patientInfo?.name && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User size={18} className="text-[#4179F0]" />
              <span className="font-vazirmatn font-normal text-sm text-[#666666]">
                مراجعه کننده:
              </span>
            </div>
            <span className="font-vazirmatn font-medium text-sm text-[#2E2E2E]">
              {patientInfo.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}