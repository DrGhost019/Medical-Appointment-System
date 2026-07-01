// src/components/booking/PatientSelector.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore';
import { useAuthStore } from '../../store/authStore';

interface Patient {
  id: string;
  name: string;
  suffix?: string;
  phone: string;
}

export default function PatientSelector() {
  const { user } = useAuthStore();
  const setPatientInfoStore = useBookingStore((state) => state.setPatientInfo);
  const [selectedPatient, setSelectedPatient] = useState<string>('myself');
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 'myself',
      name: user?.name || 'کاربر',
      suffix: '(خودم)',
      phone: user?.phone || '۰۹۱۲۳۴۵۶۷۸۹',
    },
  ]);

  // به‌روزرسانی اطلاعات کاربر در صورت تغییر
  useEffect(() => {
    if (user?.name) {
      setPatients([
        {
          id: 'myself',
          name: user.name,
          suffix: '(خودم)',
          phone: user.phone || '۰۹۱۲۳۴۵۶۷۸۹',
        },
      ]);
    }
  }, [user]);

  // ذخیره اطلاعات بیمار انتخاب شده در استور
  useEffect(() => {
    const currentPatient = patients.find(p => p.id === selectedPatient);
    if (currentPatient) {
      setPatientInfoStore({
        name: currentPatient.name,
        phone: currentPatient.phone,
        nationalId: "۰۰۰۰۰۰۰۰۰۰",
      });
    }
  }, [selectedPatient, patients, setPatientInfoStore]);

  return (
    <div 
      className="rounded-xl border border-[#E7E7E7] bg-white flex flex-col"
      style={{
        width: '805px',
        padding: '20px',
        gap: '16px',
      }}
      dir="rtl"
    >
      {/* عنوان و زیرعنوان */}
      <div className="flex flex-col gap-1 text-right">
        <h3 className="font-vazirmatn font-bold text-base text-[#2E2E2E]">
          مراجعه کننده
        </h3>
        <p className="font-vazirmatn font-normal text-sm text-[#666666]">
          برای چه کسی نوبت می‌گیرید؟
        </p>
      </div>

      {/* باکس انتخاب بیمار */}
      <div className="border border-[#E7E7E7] rounded-lg p-4 text-right">
        {patients.map((patient) => (
          <div
            key={patient.id}
            onClick={() => setSelectedPatient(patient.id)}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
          >
            {/* Radio Button سفارشی */}
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                selectedPatient === patient.id
                  ? 'border-[#4179F0]'
                  : 'border-[#CCCCCC]'
              }`}
            >
              {selectedPatient === patient.id && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#4179F0]"></div>
              )}
            </div>

            {/* اطلاعات بیمار */}
            <div className="flex flex-col gap-0.5 select-none">
              <div className="flex items-center gap-1.5">
                <span className="font-vazirmatn font-medium text-sm text-[#2E2E2E]">
                  {patient.name}
                </span>
                {patient.suffix && (
                  <span className="font-vazirmatn font-normal text-xs text-[#888888]">
                    {patient.suffix}
                  </span>
                )}
              </div>
              <span className="font-vazirmatn font-normal text-xs text-[#888888]" dir="ltr">
                {patient.phone}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* دکمه افزودن شخص دیگر */}
      <button 
        type="button"
        className="flex items-center justify-center gap-2 text-[#4179F0] font-vazirmatn font-medium text-sm hover:text-[#3565d0] transition-colors py-2"
        onClick={() => alert('این قابلیت به زودی اضافه می‌شود.')}
      >
        <Plus size={16} />
        دریافت نوبت برای شخص دیگر
      </button>
    </div>
  );
}