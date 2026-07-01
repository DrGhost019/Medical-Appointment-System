// src/app/components/home/NewestDoctors.tsx
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import DoctorCard from '../search/DoctorCard';
import connectDB from '../../lib/db';
import Doctor from '../../models/Doctor';

export const dynamic = 'force-dynamic';

export default async function NewestDoctors() {
  await connectDB();

  const doctorsFromDB = await Doctor.find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();

  return (
    <section className="w-full bg-white py-6">
      <div className="max-w-[1440px] mx-auto">
        <div 
          className="mx-auto flex flex-col gap-[18px]"
          style={{ width: '1216px' }}
        >
          {/* Header: عنوان + دکمه مشاهده همه کنار هم */}
          <div 
            className="w-full h-[40px] flex items-center justify-between"
            style={{ paddingRight: '2px' }}
          >
            <h2 className="font-vazirmatn font-bold text-2xl text-[#000000]">
              جدیدترین پزشکان
            </h2>
            <button className="flex items-center gap-1 text-[#666666] font-vazirmatn font-normal text-sm hover:text-[#4179F0] transition-colors">
              مشاهده همه
              <ChevronLeft size={16} />
            </button>
          </div>

          {/* Doctors Cards - کنار هم با gap مساوی */}
          <div className="w-full flex items-stretch gap-5">
            {doctorsFromDB.map((doctor: any) => (
              <div 
                key={doctor._id.toString()}
                className="flex-1 flex"
                style={{ minWidth: 0 }}
              >
                <DoctorCard
                  doctorId={doctor._id.toString()}
                  imageSrc={doctor.avatar || doctor.image || '/assets/logo.png'}
                  name={doctor.name?.trim()}
                  specialty={doctor.specialty?.trim()}
                  rating={doctor.rating || 5}
                  reviewCount={doctor.reviewCount || 0}
                  location={doctor.location || doctor.address?.trim() || 'تهران'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}