// src/components/home/SpecialtiesList.tsx
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import SpecialtyCard from './SpecialtyCard';

const SpecialtiesList = () => {
  const specialties = [
    {
      id: '1',
      name: 'قلب و عروق',
      iconSrc: '/assets/heart.png',
      doctorCount: 145,
    },
    {
      id: '2',
      name: 'ارتوپدی',
      iconSrc: '/assets/orthopedist.png',
      doctorCount: 128,
    },
    {
      id: '3',
      name: 'مغز و اعصاب',
      iconSrc: '/assets/brainandnerves.png',
      doctorCount: 96,
    },
    {
      id: '4',
      name: 'دستگاه تنفسی',
      iconSrc: '/assets/respiratorysystem.png',
      doctorCount: 87,
    },
    {
      id: '5',
      name: 'چشم پزشکی',
      iconSrc: '/assets/ophthalmology.png',
      doctorCount: 112,
    },
    {
      id: '6',
      name: 'اطفال',
      iconSrc: '/assets/pediatrics.png',
      doctorCount: 134,
    },
    {
      id: '7',
      name: 'گوش، حلق، بینی',
      iconSrc: '/assets/earnoseandthroat.png',
      doctorCount: 78,
    },
  ];

  return (
    <section className="w-full bg-white py-6">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-[18px]">
        
        {/* Header: Title + View All Button */}
        <div 
          className="h-[40px] flex items-center justify-between gap-2"
          style={{ width: '1216px' }}
        >
          <h2 className="font-vazirmatn font-medium text-[24px] leading-[100%] text-[#000000]">
            لیست تخصص‌ها
          </h2>
          <button className="flex items-center gap-1 text-[#666666] font-vazirmatn font-normal text-sm hover:text-[#4179F0] transition-colors">
            مشاهده همه
            <ChevronLeft size={16} />
          </button>
        </div>

        {/* Specialties Cards */}
        <div 
          className="h-[165px] flex items-center justify-between"
          style={{ width: '1216px' }}
        >
          {specialties.map((specialty) => (
            <SpecialtyCard
              key={specialty.id}
              iconSrc={specialty.iconSrc}
              name={specialty.name}
              doctorCount={specialty.doctorCount}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SpecialtiesList;