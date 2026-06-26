// src/app/doctors/[id]/review/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ReviewBackLink from '@/components/review/ReviewBackLink';
import ReviewFormContainer from '@/components/review/ReviewFormContainer';
import { getDoctorById } from '@/data/doctorDetails';

export default async function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doctor = getDoctorById(id);

  if (!doctor) {
    notFound();
  }

  // لاگ برای بررسی doctor object
  console.log('Doctor in review page:', doctor);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1440px] mx-auto py-8 px-[110px]">
        <div className="flex flex-col gap-6">
          
          {/* Back Link */}
          <ReviewBackLink doctorId={doctor.id} />

          {/* Review Form Container */}
          <ReviewFormContainer doctor={doctor} />

        </div>
      </div>

      <Footer />
    </main>
  );
}