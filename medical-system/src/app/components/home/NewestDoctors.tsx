// src/app/components/home/NewestDoctors.tsx
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import DoctorCard from '../search/DoctorCard'; // ✅ تغییر مسیر
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
        <div className="w-[1216px] mx-auto flex flex-col gap-[18px]">
          
          <div className="w-full flex items-center justify-between pr-2">
            <h2 className="font-vazirmatn font-bold text-2xl text-[#000000]">
              جدیدترین پزشکان
            </h2>
            <button className="flex items-center gap-1 text-[#666666] font-vazirmatn font-normal text-sm hover:text-primary-500 transition-colors">
              مشاهده همه
              <ChevronLeft size={16} />
            </button>
          </div>

          <div className="relative w-full">
            <div className="w-full flex items-center justify-between gap-5">
              {doctorsFromDB.map((doctor: any) => (
                <DoctorCard
                  key={doctor._id.toString()}
                  doctorId={doctor._id.toString()}
                  imageSrc={doctor.avatar || doctor.image || '/assets/logo.png'}
                  name={doctor.name}
                  specialty={doctor.specialty}
                  rating={doctor.rating || 5}
                  reviewCount={doctor.reviewCount || 0}
                  location={doctor.location || doctor.address || 'تهران'}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}