// src/app/doctors/[id]/payment/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PaymentBackLink from '@/components/payment/PaymentBackLink';
import PaymentAlert from '@/components/payment/PaymentAlert';
import DoctorSummaryCard from '@/components/payment/DoctorSummaryCard';
import TrustBox from '@/components/payment/TrustBox';
import PaymentDetails from '@/components/payment/PaymentDetails';
import PaymentGateway from '@/components/payment/PaymentGateway';
import { getDoctorById } from '@/data/doctorDetails';

export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const [doctor, setDoctor] = useState<any>(null);
  const [appointmentData, setAppointmentData] = useState({
    date: 'دوشنبه ۲۴ دی',
    time: '۹:۳۰',
    patientName: 'علی مهدوی',
  });

  useEffect(() => {
    const loadDoctor = async () => {
      const { id } = await params;
      const doc = getDoctorById(id);
      if (!doc) {
        notFound();
      }
      setDoctor(doc);

      const savedDate = localStorage.getItem('selectedDate');
      const savedTime = localStorage.getItem('selectedTime');
      
      if (savedDate && savedTime) {
        setAppointmentData({
          date: `${savedDate} دی ۱۴۰۳`,
          time: savedTime,
          patientName: 'علی مهدوی',
        });
      }
    };

    loadDoctor();
  }, []);

  if (!doctor) {
    return <div className="text-center py-10">در حال بارگذاری...</div>;
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1440px] mx-auto py-8">
        <div className="flex flex-col gap-6 px-[110px]">
          
          <PaymentBackLink backUrl={`/doctors/${doctor.id}/booking`} />
          <PaymentAlert />
          
          <div className="flex gap-6">
            {/* ستون راست */}
            <div className="flex-1 flex flex-col gap-6">
              <DoctorSummaryCard 
                doctor={doctor}
                appointmentDate={appointmentData.date}
                appointmentTime={appointmentData.time}
                patientName={appointmentData.patientName}
              />
              <TrustBox />
            </div>
            
            {/* ستون چپ */}
            <div className="w-[394px] flex flex-col gap-6">
              <PaymentDetails />
              <PaymentGateway doctorId={doctor.id} />
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}