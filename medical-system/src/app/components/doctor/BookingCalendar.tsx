// src/components/doctor/BookingCalendar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore';


const toPersianNumber = (value: number | string | undefined | null): string => {
  if (value === undefined || value === null) return '';
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return value.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

// ✅ تعریف تایپ TimeSlot
interface TimeSlot {
  _id: string;
  time: string;
  isReserved: boolean;
}

// ✅ تعریف تایپ Doctor
interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  avatar?: string;
  image?: string;
  availableTimes?: TimeSlot[];
}

interface BookingCalendarProps {
  doctor: Doctor;
}

export default function BookingCalendar({ doctor }: BookingCalendarProps) {
  console.log('🔥 BookingCalendar is rendering!');
console.log('🔥 Doctor in Calendar:', doctor);
console.log('🔥 Doctor ID:', doctor?._id);

  const [selectedDate, setSelectedDate] = useState<number>(15);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const setSelectedDoctorStore = useBookingStore((state) => state.setSelectedDoctor);
  const setSelectedDateStore = useBookingStore((state) => state.setSelectedDate);
  const setSelectedSlotStore = useBookingStore((state) => state.setSelectedSlot);

  // دریافت اسلات‌های آزاد از دیتابیس
  useEffect(() => {
    // src/app/components/doctor/BookingCalendar.tsx
// جایگزین fetchSlots کن:

const fetchSlots = async () => {
  if (!doctor?._id) return;
  
  setIsLoading(true);
  try {
    console.log('📡 Fetching slots for doctor:', doctor._id);
    const response = await fetch(`/api/doctors/${doctor._id}/slots`);
    console.log('📡 Response status:', response.status);
    
    const data = await response.json();
    console.log('📦 Full API response:', data);
    
    if (data.success && data.slots) {
      console.log('📦 Slots from API:', data.slots);
      console.log('📦 Slots count:', data.slots.length);
      
      const formattedSlotsData: TimeSlot[] = data.slots.map((slot: any) => ({
        _id: slot._id.toString(),
        time: slot.time,
        isReserved: slot.isReserved,
      }));
      
      console.log('✅ Formatted slots:', formattedSlotsData);
      setSlots(formattedSlotsData);

      const displaySlots = slots.slice(0, 6);  // ← فقط ۶ تا اول
      
      const firstAvailable = formattedSlotsData.find((slot: TimeSlot) => !slot.isReserved);
      setSelectedSlot(firstAvailable || null);
    } else {
      console.warn('⚠️ No slots in response or success false:', data);
    }
  } catch (error) {
    console.error('❌ Error fetching slots:', error);
  } finally {
    setIsLoading(false);
  }
};

    fetchSlots();
  }, [doctor?._id]);

  // ذخیره اطلاعات در استور
  useEffect(() => {
    if (!doctor?._id) return;

    setSelectedDoctorStore({
      _id: doctor._id,
      name: doctor.name,
      specialty: doctor.specialty,
      avatar: doctor.avatar || doctor.image,
    });
    
    setSelectedDateStore(`۱۴۰۳/۱۰/${selectedDate}`);
    
    if (selectedSlot) {
      setSelectedSlotStore({
        _id: selectedSlot._id,
        doctorId: doctor._id,
        date: `۱۴۰۳/۱۰/${selectedDate}`,
        time: selectedSlot.time,
        isReserved: selectedSlot.isReserved,
      });
    }
  }, [selectedDate, selectedSlot, doctor, setSelectedDoctorStore, setSelectedDateStore, setSelectedSlotStore]);

  const daysOfWeek = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const fridays = [7, 14, 21, 28];

  if (isLoading) {
    return (
      <div className="w-[392px] rounded-xl border border-[#E7E7E7] bg-white p-4 flex items-center justify-center" style={{ height: '571px' }}>
        <p className="font-vazirmatn text-sm text-[#666666]">در حال بارگذاری...</p>
      </div>
    );
  }

  // src/app/components/doctor/BookingCalendar.tsx
// قبل از return:
console.log('Doctor in BookingCalendar:', doctor);
console.log('Doctor ID:', doctor?._id);
  return (
    <div className="w-[392px] rounded-xl border border-[#E7E7E7] bg-white p-4 flex flex-col gap-2" style={{ height: '571px' }} dir="rtl">
      
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
        <button type="button" className="w-7 h-7 rounded-full border border-[#E7E7E7] flex items-center justify-center hover:bg-gray-50 transition-colors">
          <ChevronRight size={14} className="text-[#666666]" />
        </button>
        <span className="font-vazirmatn font-medium text-sm text-[#2E2E2E]">
          دی ماه ۱۴۰۳
        </span>
        <button type="button" className="w-7 h-7 rounded-full border border-[#E7E7E7] flex items-center justify-center hover:bg-gray-50 transition-colors">
          <ChevronLeft size={14} className="text-[#666666]" />
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 mt-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-vazirmatn font-normal text-xs text-[#888888] py-1">
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
      <div className="grid grid-cols-3 gap-2 mt-1 max-h-[120px] overflow-y-auto">
        {slots.map((slot: TimeSlot, index: number) => {
          const isSelected = selectedSlot?._id === slot?._id;
          const uniqueKey = slot._id || `slot-${slot.time}-${index}`;
          
          return (
            <button
              key={uniqueKey}
              type="button"
              disabled={slot.isReserved}
              onClick={() => setSelectedSlot(slot)}
              className={`h-7 rounded-lg font-vazirmatn font-normal text-xs transition-all ${
                slot.isReserved
                  ? 'bg-[#F5F5F5] text-[#A0A0A0] border border-[#E0E0E0] line-through cursor-not-allowed'
                  : isSelected
                  ? 'bg-[#4179F0] text-white'
                  : 'border border-[#E7E7E7] text-[#2E2E2E] hover:border-[#4179F0] hover:text-[#4179F0]'
              }`}
            >
              {toPersianNumber(slot.time || '')}
            </button>
          );
        })}
      </div>

      {/* Book Button */}
      {/*<Link href={doctor?._id ? `/doctors/${doctor._id}/booking` : '#'} className="mt-auto w-full">
        <button
          type="button"
          disabled={!selectedSlot || !doctor?._id}
          className="w-full h-11 rounded-lg bg-[#4179F0] text-white font-vazirmatn font-medium text-sm hover:bg-[#3565d0] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          رزرو نوبت
        </button>
      </Link>*/}
    </div>
  );
}