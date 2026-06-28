// src/app/doctors/[id]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import DoctorBackLink from '../../components/doctor/DoctorBackLink';
import DoctorInfo from '../../components/doctor/DoctorInfo';
import BookingCalendar from '../../components/doctor/BookingCalendar';
import ContactMethods from '../../components/doctor/ContactMethods';
import ReviewsSection from '../../components/doctor/ReviewsSection';
import { getDoctorById, getReviewsByDoctorId } from '../../data/doctorDetails';

// ✅ تابع async شد
export default async function DoctorPage({ params }: { params: Promise<{ id: string }> }) {
  // ✅ با await params را unwrap می‌کنیم
  const { id } = await params;
  
  const doctor = getDoctorById(id);
  const reviews = getReviewsByDoctorId(id);

  // اگر پزشک پیدا نشد، صفحه 404 نمایش بده
  if (!doctor) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1440px] mx-auto py-8">
        {/* Main Content: دو ستونه */}
        <div className="flex gap-6 px-[110px]">
          
          {/* ستون راست */}
          <div className="flex flex-col gap-6">
            <DoctorBackLink />
            <DoctorInfo doctor={doctor} />
            <ContactMethods doctor={doctor} />
            <ReviewsSection
              doctorId={doctor.id} 
              doctorName={doctor.name}
              reviews={reviews}
              rating={doctor.rating}
              reviewCount={doctor.reviewCount}
            />
          </div>
          
          {/* ستون چپ */}
          <BookingCalendar doctor={doctor} />
        </div>
      </div>

      <Footer />
    </main>
  );
}