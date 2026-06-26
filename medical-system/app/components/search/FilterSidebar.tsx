"use client";

import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Check, ChevronDown, ChevronUp } from 'lucide-react';

// آرس کامل و نسبی به صفحه سرچ برای خواندن تایپ FilterState
import { FilterState } from '../../search/page';

interface FilterSidebarProps {
  filters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const FilterSidebar = ({ filters, onApplyFilters, onClearFilters }: FilterSidebarProps) => {
  // State محلی برای تغییرات قبل از اعمال
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  const [expandedProvince, setExpandedProvince] = useState<string>('آذربایجان غربی');

  // سنک کردن با فیلترهای بیرونی در صورت تغییر
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
    setExpandedProvince('');
    onClearFilters();
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
  };

  const toggleCity = (city: string) => {
    setLocalFilters((prev: FilterState) => ({
      ...prev,
      // 👈 اضافه شدن تایپ string به متغیر c در متد filter
      cities: prev.cities.includes(city)
        ? prev.cities.filter((c: string) => c !== city)
        : [...prev.cities, city],
    }));
  };

  const toggleGender = (gender: string) => {
    setLocalFilters((prev: FilterState) => ({
      ...prev,
      // 👈 اضافه شدن تایپ string به متغیر g در متد filter
      gender: prev.gender.includes(gender)
        ? prev.gender.filter((g: string) => g !== gender)
        : [...prev.gender, gender],
    }));
  };

  const selectProvince = (province: string) => {
    if (expandedProvince === province) {
      setExpandedProvince('');
    } else {
      setExpandedProvince(province);
      // اضافه شدن تایپ FilterState برای حل ارور implicit any
      setLocalFilters((prev: FilterState) => ({
        ...prev,
        selectedProvince: province,
        cities: [],
      }));
    }
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
    'آذربایجان شرقی',
    'آذربایجان غربی',
    'اردبیل',
    'اصفهان',
    'البرز',
    'ایلام',
    'بوشهر',
    'تهران',
    'چهارمحال و بختیاری',
    'خراسان جنوبی',
    'خراسان رضوی',
    'خراسان شمالی',
    'خوزستان',
    'زنجان',
    'سمنان',
    'سیستان و بلوچستان',
    'فارس',
    'قزوین',
    'قم',
    'کردستان',
    'کرمان',
    'کرمانشاه',
    'کهگیلویه و بویراحمد',
    'گلستان',
    'گیلان',
    'لرستان',
    'مازندران',
    'مرکزی',
    'هرمزگان',
    'همدان',
    'یزد',
  ];

  const provinceCities: Record<string, string[]> = {
    'آذربایجان غربی': ['ارومیه', 'خوی', 'مهاباد', 'بوکان', 'سلماس'],
    'تهران': ['تهران', 'شمیرانات', 'ری', 'اسلامشهر'],
    'اصفهان': ['اصفهان', 'کاشان', 'خمینی‌شهر'],
    'فارس': ['شیراز', 'مرودشت', 'جهرم'],
    'خراسان رضوی': ['مشهد', 'نیشابور', 'سبزوار'],
  };

  const getCurrentCities = () => {
    return provinceCities[expandedProvince] || [];
  };

  return (
    <div
      className="w-[289px] flex-shrink-0 rounded-lg border border-[#E7E7E7] bg-white"
      style={{
        height: '1080px',
        padding: '16px',
      }}
    >
      <div className="flex flex-col" style={{ gap: '0px' }}>
        {/* Header */}
        <div
          className="w-full flex items-center justify-between"
          style={{ height: '47px' }}
        >
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
              حذف همه فیلترها
            </button>
          )}
        </div>

        <div className="border-t border-[#E7E7E7]"></div>

        {/* جستجو پزشک */}
        <div
          className="w-full flex flex-col"
          style={{ paddingTop: '12px', paddingBottom: '12px', gap: '10px' }}
        >
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
            <Search
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888]"
            />
          </div>
          <p className="font-vazirmatn font-normal text-xs text-[#888888]">
            نام یا تخصص مورد نظر را وارد کنید
          </p>
        </div>

        <div className="border-t border-[#E7E7E7]"></div>

        {/* تخصص‌ها */}
        <div className="w-full flex flex-col" style={{ padding: '16px 0', gap: '12px' }}>
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
            <option value="">تخصص مورد نظر را انتخاب کنید</option>
            {specialties.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t border-[#E7E7E7]"></div>

        {/* بیمه */}
        <div className="w-full flex flex-col" style={{ padding: '16px 0', gap: '12px' }}>
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
            <option value="">بیمه مورد نظر را انتخاب کنید</option>
            {insurances.map((ins) => (
              <option key={ins} value={ins}>
                {ins}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t border-[#E7E7E7]"></div>

        {/* تجربه کاری */}
        <div className="w-full flex flex-col" style={{ padding: '16px 0', gap: '12px' }}>
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
            <option value="">تجربه کاری را انتخاب کنید</option>
            {experiences.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t border-[#E7E7E7]"></div>

        {/* وضعیت نوبت‌دهی */}
        <div className="w-full flex flex-col" style={{ padding: '16px 0', gap: '12px' }}>
          <span className="font-vazirmatn font-bold text-sm text-[#2E2E2E]">
            وضعیت نوبت‌دهی
          </span>
          <p className="font-vazirmatn font-normal text-xs text-[#888888]">
            وضعیت مورد نظر خود را انتخاب کنید
          </p>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                  localFilters.hasEmptySlot
                    ? 'bg-[#4179F0] border-[#4179F0]'
                    : 'border-[#CCCCCC] bg-white'
                }`}
                onClick={() =>
                  setLocalFilters((prev: FilterState) => ({
                    ...prev,
                    hasEmptySlot: !prev.hasEmptySlot,
                  }))
                }
              >
                {localFilters.hasEmptySlot && <Check size={10} className="text-white" />}
              </div>
              <span className="font-vazirmatn font-normal text-xs text-[#2E2E2E]">
                پزشکان دارای نوبت خالی
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                  localFilters.canVisit
                    ? 'bg-[#4179F0] border-[#4179F0]'
                    : 'border-[#CCCCCC] bg-white'
                }`}
                onClick={() =>
                  setLocalFilters((prev: FilterState) => ({ ...prev, canVisit: !prev.canVisit }))
                }
              >
                {localFilters.canVisit && <Check size={10} className="text-white" />}
              </div>
              <span className="font-vazirmatn font-normal text-xs text-[#2E2E2E]">
                امکان ویزیت
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                  localFilters.isOnline
                    ? 'bg-[#4179F0] border-[#4179F0]'
                    : 'border-[#CCCCCC] bg-white'
                }`}
                onClick={() =>
                  setLocalFilters((prev: FilterState) => ({ ...prev, isOnline: !prev.isOnline }))
                }
              >
                {localFilters.isOnline && <Check size={10} className="text-white" />}
              </div>
              <span className="font-vazirmatn font-normal text-xs text-[#2E2E2E]">
                آنلاین
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                  localFilters.canInPerson
                    ? 'bg-[#4179F0] border-[#4179F0]'
                    : 'border-[#CCCCCC] bg-white'
                }`}
                onClick={() =>
                  setLocalFilters((prev: FilterState) => ({
                    ...prev,
                    canInPerson: !prev.canInPerson,
                  }))
                }
              >
                {localFilters.canInPerson && <Check size={10} className="text-white" />}
              </div>
              <span className="font-vazirmatn font-normal text-xs text-[#2E2E2E]">
                امکان رزرو حضوری
              </span>
            </label>
          </div>
        </div>

        <div className="border-t border-[#E7E7E7]"></div>

        {/* شهر */}
        <div className="w-full flex flex-col" style={{ padding: '16px 0', gap: '12px' }}>
          <span className="font-vazirmatn font-bold text-sm text-[#2E2E2E]">
            شهر
          </span>
          
          <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
            {provinces.map((province) => (
              <div key={province}>
                <button
                  type="button"
                  onClick={() => selectProvince(province)}
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
                        <label key={city} className="flex items-center gap-2 cursor-pointer">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                              localFilters.cities.includes(city)
                                ? 'bg-[#4179F0] border-[#4179F0]'
                                : 'border-[#CCCCCC] bg-white'
                            }`}
                            onClick={() => toggleCity(city)}
                          >
                            {localFilters.cities.includes(city) && (
                              <Check size={10} className="text-white" />
                            )}
                          </div>
                          <span className="font-vazirmatn font-normal text-xs text-[#2E2E2E]">
                            {city}
                          </span>
                        </label>
                      ))
                    ) : (
                      <p className="font-vazirmatn font-normal text-xs text-[#888888] pr-4">
                        -
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#E7E7E7]"></div>

        {/* جنسیت پزشک */}
        <div
          className="w-full flex flex-col"
          style={{ padding: '16px 0', gap: '12px' }}
        >
          <span className="font-vazirmatn font-bold text-sm text-[#2E2E2E]">
            جنسیت پزشک
          </span>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                  localFilters.gender.includes('male')
                    ? 'bg-[#4179F0] border-[#4179F0]'
                    : 'border-[#CCCCCC] bg-white'
                }`}
                onClick={() => toggleGender('male')}
              >
                {localFilters.gender.includes('male') && (
                  <Check size={10} className="text-white" />
                )}
              </div>
              <span className="font-vazirmatn font-normal text-xs text-[#2E2E2E]">
                آقا
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                  localFilters.gender.includes('female')
                    ? 'bg-[#4179F0] border-[#4179F0]'
                    : 'border-[#CCCCCC] bg-white'
                }`}
                onClick={() => toggleGender('female')}
              >
                {localFilters.gender.includes('female') && (
                  <Check size={10} className="text-white" />
                )}
              </div>
              <span className="font-vazirmatn font-normal text-xs text-[#2E2E2E]">
                خانم
              </span>
            </label>
          </div>
        </div>

        <div className="border-t border-[#E7E7E7]"></div>

        {/* دکمه اعمال فیلتر */}
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
};

export default FilterSidebar;