// src/app/doctors/[id]/booking/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BookingBackLink from '@/components/booking/BookingBackLink';
import SelectedDoctorInfo from '@/components/booking/SelectedDoctorInfo';
import PatientSelector from '@/components/booking/PatientSelector';
import ContinueButton from '@/components/booking/ContinueButton';
import { getDoctorById } from '@/data/doctorDetails';

export default async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doctor = getDoctorById(id);

  if (!doctor) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1440px] mx-auto py-8">
        <div className="flex flex-col gap-6 px-[110px]">
          
          {/* عنوان صفحه */}
          <BookingBackLink backUrl={`/doctors/${id}`} />
          
          {/* اطلاعات پزشک */}
          <SelectedDoctorInfo doctor={doctor} />
          
          {/* انتخاب مراجع */}
          <PatientSelector />

          {/* دکمه ادامه */}
          <ContinueButton doctorId={id} />

        </div>
      </div>

      <Footer />
    </main>
  );
}