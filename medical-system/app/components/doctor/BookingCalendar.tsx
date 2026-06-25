"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore'; // 👈 اضافه کردن استور رزرو خودمان

// تابع تبدیل ساده اعداد انگلیسی به فارسی (جایگزین لایبرری فرضی برای جلوگیری از ارور مسیر)
const toPersianNumber = (value: number | string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return value.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

// هماهنگ کردن ساختار داکتر با مدل واقعی بک‌آند شما
interface BookingCalendarProps {
  doctor: {
    _id: string;
    name: string;
    specialty: string;
    avatar?: string;
    // فرض می‌کنیم بک‌آند لیست اسلات‌های زمانی یا ساعت‌های فعال را اینطور می‌فرستد:
    availableTimes?: string[]; 
  };
}

const BookingCalendar = ({ doctor }: BookingCalendarProps) => {
  // تایم‌های پیش‌فرض در صورتی که داکتر در بک‌آند تایمی ست نکرده باشد
  const defaultTimes = ['۱۰:۱۵', '۱۱:۰۰', '۱۴:۳۰', '۱۶:۱۵', '۱۸:۰۰'];
  const timesToRender = doctor.availableTimes || defaultTimes;

  const [selectedDate, setSelectedDate] = useState<number>(15);
  const [selectedTime, setSelectedTime] = useState<string>(timesToRender[0] || '۱۰:۱۵');

  // 🔐 استخراج متدهای ذخیره‌سازی از Zustand Store
  const setSelectedDoctorStore = useBookingStore((state) => state.setSelectedDoctor);
  const setSelectedDateStore = useBookingStore((state) => state.setSelectedDate);
  const setSelectedSlotStore = useBookingStore((state) => state.setSelectedSlot);

  // هماهنگ‌سازی دیتای انتخابی با استور جهانی برنامه جهت استفاده در صفحه نهایی رزرو
  useEffect(() => {
    // ۱. ذخیره اطلاعات پزشک
    setSelectedDoctorStore({
      _id: doctor._id,
      name: doctor.name,
      specialty: doctor.specialty,
      avatar: doctor.avatar
    });
    
    // ۲. ذخیره تاریخ به صورت یک رشته استاندارد (مثلاً: "1403/10/15")
    setSelectedDateStore(`1403/10/${selectedDate}`);
    
    // ۳. ذخیره اسلات انتخابی
    setSelectedSlotStore({
      _id: `slot_${doctor._id}_${selectedDate}`,
      doctorId: doctor._id,
      date: `1403/10/${selectedDate}`,
      time: selectedTime,
      isReserved: false
    });
  }, [selectedDate, selectedTime, doctor, setSelectedDoctorStore, setSelectedDateStore, setSelectedSlotStore]);

  const daysOfWeek = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const fridays = [7, 14, 21, 28];

  return (
    <div 
      className="w-[392px] rounded-xl border border-[#E7E7E7] bg-white p-4 flex flex-col gap-2"
      style={{ height: '571px' }}
      dir="rtl"
    >
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-vazirmatn font-bold text-base text-[#2E2E2E]">
          تقویم رزرو
        </h3>
        <span className="font-vazirmatn font-normal text-sm text-[#666666]">
          {toPersianNumber(selectedDate)} دی ماه ۱۴۰۳
        </span>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mt-2">
        <button className="w-7 h-7 rounded-full border border-[#E7E7E7] flex items-center justify-center hover:bg-gray-50 transition-colors">
          <ChevronRight size={14} className="text-[#666666]" />
        </button>
        <span className="font-vazirmatn font-medium text-sm text-[#2E2E2E]">
          دی ماه ۱۴۰۳
        </span>
        <button className="w-7 h-7 rounded-full border border-[#E7E7E7] flex items-center justify-center hover:bg-gray-50 transition-colors">
          <ChevronLeft size={14} className="text-[#666666]" />
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 mt-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center font-vazirmatn font-normal text-xs text-[#888888] py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((day) => {
          const isFriday = fridays.includes(day);
          const isSelected = day === selectedDate;
          
          return (
            <button
              key={day}
              type="button"
              onClick={() => !isFriday && setSelectedDate(day)}
              disabled={isFriday}
              className={`w-9 h-9 rounded-full font-vazirmatn font-normal text-xs transition-colors ${
                isSelected
                  ? 'bg-[#4179F0] text-white'
                  : isFriday
                  ? 'text-[#CCCCCC] cursor-not-allowed'
                  : 'text-[#2E2E2E] hover:bg-gray-100'
              }`}
            >
              {toPersianNumber(day)}
            </button>
          );
        })}
      </div>

      {/* Time Slots */}
      <div className="font-vazirmatn font-medium text-xs text-[#2E2E2E] mt-3 text-right">
        ساعت‌های در دسترس:
      </div>
      <div className="grid grid-cols-3 gap-2 mt-1">
        {timesToRender.map((time) => {
          const isSelected = time === selectedTime;
          
          return (
            <button
              key={time}
              type="button"
              onClick={() => setSelectedTime(time)}
              className={`h-9 rounded-lg font-vazirmatn font-normal text-xs transition-colors ${
                isSelected
                  ? 'bg-[#4179F0] text-white'
                  : 'border border-[#E7E7E7] text-[#2E2E2E] hover:border-[#4179F0] hover:text-[#4179F0]'
              }`}
            >
              {toPersianNumber(time)}
            </button>
          );
        })}
      </div>

      {/* Book Button */}
      <Link href={`/doctors/${doctor._id}/booking`} className="mt-auto w-full">
        <button className="w-full h-11 rounded-lg bg-[#4179F0] text-white font-vazirmatn font-medium text-sm hover:bg-[#3565d0] transition-colors">
          رزرو نوبت
        </button>
      </Link>

    </div>
  );
};

export default BookingCalendar;