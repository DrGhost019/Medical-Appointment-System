// src/components/search/DoctorList.tsx
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Check, MapPin, Clock, ChevronLeft } from 'lucide-react';
import { toPersianNumber } from '../../lib/persianNumber';
import Pagination from './Pagination';
import { FilterState } from '../../../app/search/page';

interface DoctorListProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  filters: FilterState;
}

type SortOption = 'mostBookings' | 'mostPopular' | 'nearestAvailable';

export default function DoctorList({ currentPage, onPageChange, filters }: DoctorListProps) {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSort, setActiveSort] = useState<SortOption>('mostPopular');
  const doctorsPerPage = 4;

  const sortOptions = [
    { id: 'mostPopular' as SortOption, label: 'محبوب‌ترین' },
    { id: 'mostBookings' as SortOption, label: 'بیش‌ترین نوبت‌ها' },
    { id: 'nearestAvailable' as SortOption, label: 'نزدیک‌ترین نوبت آزاد' },
  ];

  // دریافت پزشکان از API
  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        // ساخت query string از فیلترها
        const params = new URLSearchParams();
        if (filters.searchQuery) params.append('search', filters.searchQuery);
        if (filters.specialty) params.append('specialty', filters.specialty);
        if (filters.cities.length > 0) params.append('cities', filters.cities.join(','));
        if (filters.gender.length > 0) params.append('gender', filters.gender.join(','));
        if (filters.hasEmptySlot) params.append('hasSlot', 'true');
        if (filters.isOnline) params.append('isOnline', 'true');
        if (filters.canInPerson) params.append('canInPerson', 'true');
        params.append('page', currentPage.toString());
        params.append('limit', doctorsPerPage.toString());
        params.append('sort', activeSort);

        const response = await fetch(`/api/doctors?${params.toString()}`);
        const data = await response.json();

        if (data.success) {
          setDoctors(data.doctors || []);
          setTotalDoctors(data.pagination?.total || 0);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setDoctors([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, [filters, currentPage, activeSort]);

  const totalPages = Math.max(1, Math.ceil(totalDoctors / doctorsPerPage));

  // حالت بارگذاری
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4179F0] mx-auto mb-4"></div>
            <p className="font-vazirmatn text-sm text-[#666666]">در حال بارگذاری پزشکان...</p>
          </div>
        </div>
      </div>
    );
  }

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
          {toPersianNumber(totalDoctors)} پزشک یافت شد
        </span>
      </div>

      {/* لیست کارت‌های پزشکان */}
      <div className="flex flex-col gap-6">
        {doctors.length > 0 ? (
          doctors.map((doctor: any) => {
            const doctorId = doctor._id?.toString() || doctor.id?.toString() || '';
            console.log('🔍 Doctor ID in List:', doctorId);  // ← اضافه کن
            return (
              <div
                key={doctorId}
                className="w-full rounded-xl border border-[#E7E7E7] bg-white flex flex-col p-5 md:p-6 gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 w-full">
                    <div className="w-[100px] h-[125px] rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                      <img
                        src={doctor.image || doctor.avatar || '/assets/logo.png'}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/logo.png';
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
                      آدرس مطب: {doctor.address || 'تهران'}
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
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}