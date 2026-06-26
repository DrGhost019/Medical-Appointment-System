// src/components/home/NewestDoctors.tsx
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import DoctorCard from './DoctorCard';

const NewestDoctors = () => {
  const doctors = [
    {
      id: '5',
      name: 'دکتر لعیا زنگنه',
      specialty: 'متخصص قلب و عروق',
      rating: 3.5,
      reviewCount: 105,
      location: 'تهران',
      imageSrc: '/assets/lilazangheneh.png',
    },
    {
      id: '6',
      name: 'دکتر یاشار پناهی',
      specialty: 'متخصص روانشناس بالینی',
      rating: 3.0,
      reviewCount: 100,
      location: 'تهران',
      imageSrc: '/assets/yasharpanahi.png',
    },
    {
      id: '7',
      name: 'دکتر زهرا سعادتی',
      specialty: 'متخصص گوش و حلق و بینی',
      rating: 3.5,
      reviewCount: 250,
      location: 'تهران',
      imageSrc: '/assets/zahrasaadati.png',
    },
    {
      id: '8',
      name: 'دکتر ماهان گروسی',
      specialty: 'فوق تخصص دندانپزشکی',
      rating: 3.5,
      reviewCount: 250,
      location: 'تهران',
      imageSrc: '/assets/mahangorosi.png',
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
                جدیدترین پزشکان
              </h2>
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

export default NewestDoctors;