"use client";

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore'; // 👈 ایمپورت استور رزرو نوبت

const PatientSelector = () => {
  const setPatientInfoStore = useBookingStore((state) => state.setPatientInfo);
  
  // دیتای پایه؛ در آینده وقتی سیستم احراز هویت کامل شد می‌توانید نام کاربر لاگین شده را اینجا بگذارید
  const patients = [
    {
      id: 'myself',
      name: 'سامان (خودم)', // یا دیتای داینامیک کاربر
      suffix: '(کاربر اصلی)',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
    },
  ];

  const [selectedPatient, setSelectedPatient] = useState<string>('myself');

  // به محض انتخاب یا تغییر مراجع، اطلاعات را در استور Zustand به‌روزرسانی می‌کنیم
  useEffect(() => {
    const currentPatient = patients.find(p => p.id === selectedPatient);
    if (currentPatient) {
      setPatientInfoStore({
        name: currentPatient.name,
        phone: currentPatient.phone,
        nationalId: "0000000000" // مقدار موقت یا فیلد اضافه در آینده
      });
    }
  }, [selectedPatient, setPatientInfoStore]);

  return (
    <div className="w-[805px] rounded-xl border border-[#E7E7E7] bg-white p-4 flex flex-col gap-4" dir="rtl">
      
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
            className="flex items-center gap-3 cursor-pointer"
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
                <span className="font-vazirmatn font-normal text-xs text-[#888888]">
                  {patient.suffix}
                </span>
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
      >
        <Plus size={16} />
        دریافت نوبت برای شخص دیگر
      </button>

    </div>
  );
};

export default PatientSelector;