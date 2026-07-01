// src/components/search/FilterSidebar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { FilterState } from '../../../app/search/page';

interface FilterSidebarProps {
  filters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({ filters, onApplyFilters, onClearFilters }: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  const [expandedProvince, setExpandedProvince] = useState<string>('');

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const hasActiveFilters = () => {
    return (
      localFilters.searchQuery !== '' ||
      localFilters.specialty !== '' ||
      localFilters.insurance !== '' ||
      localFilters.experience !== '' ||
      localFilters.hasEmptySlot ||
      localFilters.canVisit ||
      localFilters.isOnline ||
      localFilters.canInPerson ||
      localFilters.cities.length > 0 ||
      localFilters.gender.length > 0
    );
  };

  const handleClearAll = () => {
    setLocalFilters({
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
    onClearFilters();
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
  };

  const toggleCity = (city: string) => {
    setLocalFilters((prev: FilterState) => ({
      ...prev,
      cities: prev.cities.includes(city)
        ? prev.cities.filter((c: string) => c !== city)
        : [...prev.cities, city],
    }));
  };

  const toggleGender = (gender: string) => {
    setLocalFilters((prev: FilterState) => ({
      ...prev,
      gender: prev.gender.includes(gender)
        ? prev.gender.filter((g: string) => g !== gender)
        : [...prev.gender, gender],
    }));
  };

  const specialties = [
    'متخصص قلب و عروق',
    'متخصص مغز و اعصاب',
    'جراح عمومی',
    'متخصص ریه',
    'متخصص اطفال',
    'متخصص روماتولوژی',
    'متخصص گوش و حلق و بینی',
    'دندانپزشک',
  ];

  const insurances = [
    'تأمین اجتماعی',
    'بیمه سلامت',
    'بیمه نیروهای مسلح',
    'بیمه ایران',
    'بیمه آسیا',
  ];

  const experiences = [
    '۵ سال به بالا',
    '۱۰ سال به بالا',
    '۱۵ سال به بالا',
    '۲۰ سال به بالا',
  ];

  const provinces = [
    'آذربایجان شرقی', 'آذربایجان غربی', 'اردبیل', 'اصفهان', 'البرز',
    'ایلام', 'بوشهر', 'تهران', 'چهارمحال و بختیاری', 'خراسان جنوبی',
    'خراسان رضوی', 'خراسان شمالی', 'خوزستان', 'زنجان', 'سمنان',
    'سیستان و بلوچستان', 'فارس', 'قزوین', 'قم', 'کردستان',
    'کرمان', 'کرمانشاه', 'کهگیلویه و بویراحمد', 'گلستان', 'گیلان',
    'لرستان', 'مازندران', 'مرکزی', 'هرمزگان', 'همدان', 'یزد',
  ];

  const provinceCities: Record<string, string[]> = {
    'آذربایجان غربی': ['ارومیه', 'خوی', 'مهاباد', 'بوکان', 'سلماس'],
    'تهران': ['تهران', 'شمیرانات', 'ری', 'اسلامشهر', 'شهرری'],
    'اصفهان': ['اصفهان', 'کاشان', 'خمینی‌شهر', 'نجف‌آباد'],
    'فارس': ['شیراز', 'مرودشت', 'جهرم', 'فسا'],
    'خراسان رضوی': ['مشهد', 'نیشابور', 'سبزوار', 'قوچان'],
    'مازندران': ['ساری', 'بابل', 'آمل', 'قائم‌شهر'],
    'گیلان': ['رشت', 'انزلی', 'لاهیجان', 'رودسر'],
  };

  const getCurrentCities = () => {
    return provinceCities[expandedProvince] || [];
  };

  return (
    <div className="w-[289px] flex-shrink-0 rounded-lg border border-[#E7E7E7] bg-white p-4" style={{ height: 'fit-content' }}>
      <div className="flex flex-col gap-0">
        
        {/* Header */}
        <div className="w-full flex items-center justify-between h-[47px]">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-[#2E2E2E]" />
            <h3 className="font-vazirmatn font-bold text-base text-[#2E2E2E]">
              فیلترها
            </h3>
          </div>
          {hasActiveFilters() && (
            <button
              type="button"
              onClick={handleClearAll}
              className="flex items-center gap-1 text-[#4179F0] font-vazirmatn font-normal text-xs hover:text-[#3565d0] transition-colors cursor-pointer"
            >
              <X size={14} />
              حذف همه
            </button>
          )}
        </div>

        <div className="border-t border-[#E7E7E7]"></div>

        {/* جستجو */}
        <div className="w-full flex flex-col py-3 gap-2.5">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو پزشک"
              value={localFilters.searchQuery}
              onChange={(e) =>
                setLocalFilters((prev: FilterState) => ({ ...prev, searchQuery: e.target.value }))
              }
              className="w-full h-10 rounded-lg border border-[#E7E7E7] bg-white px-4 pr-10 font-vazirmatn font-normal text-sm text-[#2E2E2E] placeholder:text-[#888888] focus:outline-none focus:border-[#4179F0]"
            />
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888]" />
          </div>
        </div>

        <div className="border-t border-[#E7E7E7]"></div>

        {/* تخصص‌ها */}
        <div className="w-full flex flex-col py-4 gap-3">
          <span className="font-vazirmatn font-bold text-sm text-[#2E2E2E]">
            تخصص‌ها
          </span>
          <select
            value={localFilters.specialty}
            onChange={(e) =>
              setLocalFilters((prev: FilterState) => ({ ...prev, specialty: e.target.value }))
            }
            className="w-full h-10 rounded-lg border border-[#E7E7E7] bg-white px-4 font-vazirmatn font-normal text-sm text-[#2E2E2E] focus:outline-none focus:border-[#4179F0]"
          >
            <option value="">همه تخصص‌ها</option>
            {specialties.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t border-[#E7E7E7]"></div>

        {/* بیمه */}
        <div className="w-full flex flex-col py-4 gap-3">
          <span className="font-vazirmatn font-bold text-sm text-[#2E2E2E]">
            بیمه
          </span>
          <select
            value={localFilters.insurance}
            onChange={(e) =>
              setLocalFilters((prev: FilterState) => ({ ...prev, insurance: e.target.value }))
            }
            className="w-full h-10 rounded-lg border border-[#E7E7E7] bg-white px-4 font-vazirmatn font-normal text-sm text-[#2E2E2E] focus:outline-none focus:border-[#4179F0]"
          >
            <option value="">همه بیمه‌ها</option>
            {insurances.map((ins) => (
              <option key={ins} value={ins}>
                {ins}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t border-[#E7E7E7]"></div>

        {/* تجربه کاری */}
        <div className="w-full flex flex-col py-4 gap-3">
          <span className="font-vazirmatn font-bold text-sm text-[#2E2E2E]">
            تجربه کاری
          </span>
          <select
            value={localFilters.experience}
            onChange={(e) =>
              setLocalFilters((prev: FilterState) => ({ ...prev, experience: e.target.value }))
            }
            className="w-full h-10 rounded-lg border border-[#E7E7E7] bg-white px-4 font-vazirmatn font-normal text-sm text-[#2E2E2E] focus:outline-none focus:border-[#4179F0]"
          >
            <option value="">همه</option>
            {experiences.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t border-[#E7E7E7]"></div>

        {/* وضعیت نوبت‌دهی */}
        <div className="w-full flex flex-col py-4 gap-3">
          <span className="font-vazirmatn font-bold text-sm text-[#2E2E2E]">
            وضعیت نوبت‌دهی
          </span>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setLocalFilters(prev => ({ ...prev, hasEmptySlot: !prev.hasEmptySlot }))}
                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${localFilters.hasEmptySlot ? 'bg-[#4179F0] border-[#4179F0]' : 'border-[#CCCCCC] bg-white'}`}
              >
                {localFilters.hasEmptySlot && <Check size={10} className="text-white" />}
              </div>
              <span className="font-vazirmatn font-normal text-xs text-[#2E2E2E]">
                پزشکان دارای نوبت خالی
              </span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setLocalFilters(prev => ({ ...prev, isOnline: !prev.isOnline }))}
                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${localFilters.isOnline ? 'bg-[#4179F0] border-[#4179F0]' : 'border-[#CCCCCC] bg-white'}`}
              >
                {localFilters.isOnline && <Check size={10} className="text-white" />}
              </div>
              <span className="font-vazirmatn font-normal text-xs text-[#2E2E2E]">
                مشاوره آنلاین
              </span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setLocalFilters(prev => ({ ...prev, canInPerson: !prev.canInPerson }))}
                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${localFilters.canInPerson ? 'bg-[#4179F0] border-[#4179F0]' : 'border-[#CCCCCC] bg-white'}`}
              >
                {localFilters.canInPerson && <Check size={10} className="text-white" />}
              </div>
              <span className="font-vazirmatn font-normal text-xs text-[#2E2E2E]">
                ویزیت حضوری
              </span>
            </label>
          </div>
        </div>

        <div className="border-t border-[#E7E7E7]"></div>

        {/* شهر */}
        <div className="w-full flex flex-col py-4 gap-3">
          <span className="font-vazirmatn font-bold text-sm text-[#2E2E2E]">
            شهر
          </span>
          <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
            {provinces.map((province) => (
              <div key={province}>
                <button
                  type="button"
                  onClick={() => setExpandedProvince(expandedProvince === province ? '' : province)}
                  className="flex items-center justify-between w-full text-right hover:bg-gray-50 rounded px-2 py-1 transition-colors cursor-pointer"
                >
                  <span className="font-vazirmatn font-normal text-xs text-[#2E2E2E]">
                    {province}
                  </span>
                  {expandedProvince === province ? (
                    <ChevronUp size={14} className="text-[#666666]" />
                  ) : (
                    <ChevronDown size={14} className="text-[#666666]" />
                  )}
                </button>
                
                {expandedProvince === province && (
                  <div className="flex flex-col gap-2 mt-2 pr-4">
                    {getCurrentCities().length > 0 ? (
                      getCurrentCities().map((city) => (
                        <label key={city} className="flex items-center gap-2 cursor-pointer select-none">
                          <div
                            onClick={() => toggleCity(city)}
                            className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${localFilters.cities.includes(city) ? 'bg-[#4179F0] border-[#4179F0]' : 'border-[#CCCCCC] bg-white'}`}
                          >
                            {localFilters.cities.includes(city) && <Check size={10} className="text-white" />}
                          </div>
                          <span className="font-vazirmatn font-normal text-xs text-[#2E2E2E]">
                            {city}
                          </span>
                        </label>
                      ))
                    ) : (
                      <p className="font-vazirmatn font-normal text-xs text-[#888888] pr-4">
                        شهری ثبت نشده
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#E7E7E7]"></div>

        {/* جنسیت */}
        <div className="w-full flex flex-col py-4 gap-3">
          <span className="font-vazirmatn font-bold text-sm text-[#2E2E2E]">
            جنسیت پزشک
          </span>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => toggleGender('male')}
                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${localFilters.gender.includes('male') ? 'bg-[#4179F0] border-[#4179F0]' : 'border-[#CCCCCC] bg-white'}`}
              >
                {localFilters.gender.includes('male') && <Check size={10} className="text-white" />}
              </div>
              <span className="font-vazirmatn font-normal text-xs text-[#2E2E2E]">
                آقا
              </span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => toggleGender('female')}
                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${localFilters.gender.includes('female') ? 'bg-[#4179F0] border-[#4179F0]' : 'border-[#CCCCCC] bg-white'}`}
              >
                {localFilters.gender.includes('female') && <Check size={10} className="text-white" />}
              </div>
              <span className="font-vazirmatn font-normal text-xs text-[#2E2E2E]">
                خانم
              </span>
            </label>
          </div>
        </div>

        <div className="border-t border-[#E7E7E7]"></div>

        {/* دکمه اعمال */}
        <button
          type="button"
          onClick={handleApply}
          className="w-full h-[42px] rounded-lg bg-[#4179F0] text-white font-vazirmatn font-medium text-sm hover:bg-[#3565d0] transition-colors mt-4 cursor-pointer"
        >
          اعمال فیلترها
        </button>
      </div>
    </div>
  );
}