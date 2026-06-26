"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Check, MapPin, Clock, ChevronLeft } from 'lucide-react';

// دو پوشه به عقب (خروج از search، خروج از components و ورود به data)
import { allDoctors, DoctorDetail } from '../../data/doctorDetails';
import { toPersianNumber } from '../../lib/persianNumber';
import Pagination from './Pagination';

type SortOption = 'mostBookings' | 'mostPopular' | 'nearestAvailable';

interface FilterState {
  searchQuery: string;
  specialty: string;
  cities: string[];
  hasEmptySlot: boolean;
  canVisit: boolean;
  isOnline: boolean;
  canInPerson: boolean;
}

interface DoctorListProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  filters: FilterState;
}

const DoctorList = ({ currentPage, onPageChange, filters }: DoctorListProps) => {
  const [activeSort, setActiveSort] = useState<SortOption>('mostBookings');
  const doctorsPerPage = 4;

  const sortOptions = [
    { id: 'mostBookings' as SortOption, label: 'بیش‌ترین نوبت‌ها' },
    { id: 'mostPopular' as SortOption, label: 'محبوب‌ترین' },
    { id: 'nearestAvailable' as SortOption, label: 'نزدیک‌ترین نوبت آزاد' },
  ];

  // اعمال فیلترها - تعریف تایپ دقیق به جای any
  const filteredDoctors = useMemo(() => {
    return allDoctors.filter((doctor: DoctorDetail) => {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = doctor.name?.toLowerCase().includes(query);
        const matchesSpecialty = doctor.specialty?.toLowerCase().includes(query);
        if (!matchesName && !matchesSpecialty) return false;
      }

      if (filters.specialty && doctor.specialty !== filters.specialty) {
        return false;
      }

      if (filters.cities && filters.cities.length > 0) {
        const addressMatches = filters.cities.some((city) =>
          doctor.address?.includes(city)
        );
        if (!addressMatches) return false;
      }

      // استفاده از ویژگی‌های موجود یا آپشنال اختیاری برای جلوگیری از خطای ران‌تایم
      if (filters.isOnline && !('isOnline' in doctor ? (doctor as any).isOnline : false)) return false;
      if (filters.canInPerson && !('canInPerson' in doctor ? (doctor as any).canInPerson : false)) return false;
      if (filters.hasEmptySlot && doctor.firstAvailable === 'بدون نوبت آزاد') return false;

      return true;
    });
  }, [filters]);

  // مرتب‌سازی
  const sortedDoctors = useMemo(() => {
    const sorted = [...filteredDoctors].sort((a, b) => {
      if (activeSort === 'mostBookings') {
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      } else if (activeSort === 'mostPopular') {
        return (b.rating || 0) - (a.rating || 0);
      } else {
        return 0;
      }
    });
    return sorted;
  }, [filteredDoctors, activeSort]);

  const totalPages = Math.max(1, Math.ceil(sortedDoctors.length / doctorsPerPage));
  const startIndex = (currentPage - 1) * doctorsPerPage;
  const endIndex = startIndex + doctorsPerPage;
  const currentDoctors = sortedDoctors.slice(startIndex, endIndex);

  return (
    <div className="flex-1 flex flex-col gap-6" dir="rtl">
      
      {/* بخش مرتب‌سازی */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="font-vazirmatn font-bold text-sm text-[#2E2E2E]">
          مرتب سازی بر اساس:
        </span>
        <div className="flex items-center gap-4">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setActiveSort(option.id);
                onPageChange(1);
              }}
              className={`font-vazirmatn text-sm transition-colors cursor-pointer ${
                activeSort === option.id
                  ? 'text-[#4179F0] font-bold'
                  : 'text-[#666666] hover:text-[#4179F0] font-normal'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <span className="font-vazirmatn font-normal text-xs text-[#888888] mr-auto">
          {toPersianNumber(sortedDoctors.length)} پزشک یافت شد
        </span>
      </div>

      {/* لیست کارت‌های پزشکان */}
      <div className="flex flex-col gap-6">
        {currentDoctors.length > 0 ? (
          currentDoctors.map((doctor: DoctorDetail) => {
            // 👈 رفع خطای سیستم: استفاده مستقیم از id پروژه بدون ارجاع به فیلد ناموجود _id
            const doctorId = doctor.id;
            
            return (
              <div
                key={doctorId}
                className="w-full rounded-xl border border-[#E7E7E7] bg-white flex flex-col p-5 md:p-6 gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 w-full">
                    <div className="w-[100px] h-[125px] rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                      <img
                        src={doctor.image || '/assets/default-doctor.png'}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/default-doctor.png';
                        }}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 flex-1 text-right">
                      <h3 className="font-vazirmatn font-bold text-lg text-[#2E2E2E]">
                        {doctor.name}
                      </h3>
                      <p className="font-vazirmatn font-normal text-sm text-[#666666]">
                        {doctor.specialty}
                      </p>
                      
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="flex items-center flex-row-reverse">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill={star <= Math.floor(doctor.rating || 5) ? '#FFB800' : '#E0E0E0'}
                              stroke={star <= Math.floor(doctor.rating || 5) ? '#FFB800' : '#E0E0E0'}
                              className="ml-0.5"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                        <span className="font-vazirmatn font-bold text-xs text-[#FFB800] mr-1">
                          {toPersianNumber(doctor.rating || 5)}
                        </span>
                        <span className="font-vazirmatn font-normal text-xs text-[#888888]">
                          ({toPersianNumber(doctor.reviewCount || 0)} نظر)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0 sm:self-start bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                    <span className="font-vazirmatn font-normal text-xs text-[#666666]">
                      کد نظام پزشکی: {toPersianNumber(doctor.medicalCode || '---')}
                    </span>
                    <div className="w-4 h-4 rounded-full border border-[#4CAF50] flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-[#4CAF50] stroke-[3]" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#E7E7E7] my-1"></div>

                <div className="flex flex-col gap-2.5 text-right">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#888888] flex-shrink-0" />
                    <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E]">
                      آدرس مطب: {doctor.address}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-[#888888] flex-shrink-0" />
                    <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E]">
                      اولین نوبت در دسترس: <span className="font-bold text-[#4179F0]">{doctor.firstAvailable || 'تعیین نشده'}</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-2 pt-2">
                  <Link href={`/doctors/${doctorId}`} className="w-full sm:w-auto sm:flex-1 sm:max-w-[200px]">
                    <button type="button" className="w-full h-10 rounded-lg bg-[#4179F0] text-white font-vazirmatn font-medium text-sm hover:bg-[#3565d0] transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                      رزرو نوبت
                      <ChevronLeft size={16} className="mt-0.5" />
                    </button>
                  </Link>

                  <Link href={`/doctors/${doctorId}`} className="w-full sm:w-auto sm:flex-1 sm:max-w-[200px]">
                    <button type="button" className="w-full h-10 rounded-lg border border-[#E7E7E7] bg-white text-[#666666] font-vazirmatn font-medium text-sm hover:bg-gray-50 transition-colors cursor-pointer">
                      مشاهده پروفایل
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full rounded-xl border border-[#E7E7E7] bg-white p-12 text-center">
            <p className="font-vazirmatn font-bold text-base text-[#2E2E2E]">
              پزشکی با این مشخصات یافت نشد
            </p>
            <p className="font-vazirmatn font-normal text-sm text-[#888888] mt-2">
              لطفاً فیلترهای دیگری را انتخاب یا عبارت جستجو را تغییر دهید.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default DoctorList;