"use client";

import React, { useState } from 'react';

// 👈 اصلاح مسیرهای ایمپورت بر اساس ساختار واقعی پروژه برای حل ارور کامپایل
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SearchHero from '../components/search/SearchHero';
import FilterSidebar from '../components/search/FilterSidebar';
import DoctorList from '../components/search/DoctorList';

export interface FilterState {
  searchQuery: string;
  specialty: string;
  insurance: string;
  experience: string;
  hasEmptySlot: boolean;
  canVisit: boolean;
  isOnline: boolean;
  canInPerson: boolean;
  selectedProvince: string;
  cities: string[];
  gender: string[];
}

export default function SearchPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    specialty: '',
    insurance: '',
    experience: '',
    hasEmptySlot: false,
    canVisit: false,
    isOnline: false,
    canInPerson: false,
    selectedProvince: '',
    cities: [],
    gender: [],
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // تابع کمکی برای آپدیت فیلد متنی جستجوی بالای صفحه (از طرف SearchHero)
  const handleSearchChange = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
    setCurrentPage(1);
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // بازگشت به صفحه اول بعد از اعمال فیلتر
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: '',
      specialty: '',
      insurance: '',
      experience: '',
      hasEmptySlot: false,
      canVisit: false,
      isOnline: false,
      canInPerson: false,
      selectedProvince: '',
      cities: [],
      gender: [],
    });
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* 👈 اضافه کردن مقادیر برای مانیتور کردن و تغییر متن جستجو */}
      <SearchHero 
        searchQuery={filters.searchQuery} 
        onSearchChange={handleSearchChange} 
      />
      
      <div className="max-w-[1440px] mx-auto py-8 px-4 md:px-[110px]">
        <div className="flex flex-col lg:flex-row gap-6">
          
          <FilterSidebar 
            filters={filters}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
          
          <DoctorList 
            currentPage={currentPage}
            onPageChange={handlePageChange}
            filters={filters}
          />

        </div>
      </div>

      <Footer />
    </main>
  );
}