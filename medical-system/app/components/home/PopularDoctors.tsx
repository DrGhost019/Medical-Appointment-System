// src/components/home/PopularDoctors.tsx
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import DoctorCard from './DoctorCard';

const PopularDoctors = () => {
  const doctors = [
    {
      id: '1',
      name: 'دکتر زهرا وارسته',
      specialty: 'متخصص قلب و عروق',
      rating: 3.5,
      reviewCount: 105,
      location: 'تهران',
      imageSrc: '/assets/zahravarasteh.png',
    },
    {
      id: '2',
      name: 'دکتر علی وارسته',
      specialty: 'متخصص قلب و عروق',
      rating: 3.5,
      reviewCount: 105,
      location: 'تهران',
      imageSrc: '/assets/alivarasteh.png',
    },
    {
      id: '3',
      name: 'دکتر بهنوش حسینی',
      specialty: 'جراح گوش حلق بینی',
      rating: 3.5,
      reviewCount: 105,
      location: 'تهران',
      imageSrc: '/assets/behnoshhosieni.png',
    },
    {
      id: '4',
      name: 'دکتر علی راد',
      specialty: 'متخصص ریه',
      rating: 3.5,
      reviewCount: 105,
      location: 'تهران',
      imageSrc: '/assets/alirad.png',
    },
  ];

  return (
    <section className="w-full bg-white py-6">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Main Container */}
        <div className="w-[1216px] mx-auto flex flex-col gap-[18px]">
          
          {/* Header: Title + View All Button */}
          <div className="w-full flex items-center justify-between pr-2">
            <div className="flex items-center gap-2">
              <h2 className="font-vazirmatn font-bold text-2xl text-[#000000]">
                محبوب‌ترین پزشکان
              </h2>
              <span className="font-vazirmatn font-normal text-sm text-[#666666]">
                (بر اساس تعداد نوبت‌های رزرو شده)
              </span>
            </div>
            <button className="flex items-center gap-1 text-[#666666] font-vazirmatn font-normal text-sm hover:text-primary-500 transition-colors">
              مشاهده همه
              <ChevronLeft size={16} />
            </button>
          </div>

          {/* Doctors Cards with Navigation */}
          <div className="relative w-full">
            
            {/* Navigation Button - Right (Previous) */}
            <button className="absolute right-[-18px] top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#F6F6F6] flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm">
              <ChevronLeft size={18} className="text-[#666666] rotate-180" />
            </button>

            {/* Doctors Cards */}
            <div className="w-full flex items-center justify-between gap-5">
              {doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctorId={doctor.id}
                  imageSrc={doctor.imageSrc}
                  name={doctor.name}
                  specialty={doctor.specialty}
                  rating={doctor.rating}
                  reviewCount={doctor.reviewCount}
                  location={doctor.location}
                />
              ))}
            </div>

            {/* Navigation Button - Left (Next) */}
            <button className="absolute left-[-18px] top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#F6F6F6] flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm">
              <ChevronLeft size={18} className="text-[#666666]" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default PopularDoctors;