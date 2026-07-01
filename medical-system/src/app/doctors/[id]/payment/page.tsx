// src/app/doctors/[id]/payment/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import PaymentBackLink from '../../../components/payment/PaymentBackLink';
import PaymentAlert from '../../../components/payment/PaymentAlert';
import DoctorSummaryCard from '../../../components/payment/DoctorSummaryCard';
import TrustBox from '../../../components/payment/TrustBox';
import PaymentDetails from '../../../components/payment/PaymentDetails';
import PaymentGateway from '../../../components/payment/PaymentGateway';

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [appointmentData, setAppointmentData] = useState({
    date: 'دوشنبه ۲۴ دی',
    time: '۹:۳۰',
    patientName: 'کاربر',
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`/api/doctors/${id}`);
        const data = await response.json();
        
        if (data.success) {
          setDoctor({
            ...data.doctor,
            id: data.doctor._id,
          });
        } else {
          router.push('/404');
        }
      } catch (error) {
        console.error('Error fetching doctor:', error);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctor();
    }
  }, [id, router]);

  useEffect(() => {
    try {
      const savedDate = localStorage.getItem('selectedDate');
      const savedTime = localStorage.getItem('selectedTime');
      const savedPatient = localStorage.getItem('selectedPatient');
      
      if (savedDate && savedTime) {
        setAppointmentData({
          date: savedDate,
          time: savedTime,
          patientName: savedPatient || 'کاربر',
        });
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4179F0] mx-auto mb-4"></div>
            <p className="text-gray-500">در حال بارگذاری...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!doctor) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="text-center py-20">
          <p className="text-red-500">پزشک مورد نظر یافت نشد</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1440px] mx-auto py-8 px-4 md:px-[110px]">
        <div className="flex flex-col gap-6">
          
          <PaymentBackLink backUrl={`/doctors/${id}/booking`} />
          <PaymentAlert />
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-6">
              <DoctorSummaryCard 
                doctor={doctor}
                appointmentDate={appointmentData.date}
                appointmentTime={appointmentData.time}
                patientName={appointmentData.patientName}
              />
              <TrustBox />
            </div>
            
            <div className="lg:w-[394px] flex flex-col gap-6">
              <PaymentDetails />
              <PaymentGateway doctorId={id} />
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}