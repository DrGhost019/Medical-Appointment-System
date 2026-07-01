// src/components/appointment/AppointmentList.tsx
"use client";

import React, { useEffect, useState } from 'react';
import AppointmentCard from './AppointmentCard';
import { useAuthStore } from '../../store/authStore';
import { toPersianNumber } from '../../lib/persianNumber';

interface Appointment {
  _id: string;
  doctorId: {
    _id: string;
    name: string;
    specialty: string;
    image?: string;
    avatar?: string;
    rating?: number;
    reviewCount?: number;
    medicalCode?: string;
    address?: string;
  };
  date: string;
  time: string;
  trackingCode: string;
  isReserved: boolean;
}

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/appointments/patient', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setAppointments(data.appointments || []);
        } else {
          setError(data.message || 'خطا در دریافت نوبت‌ها');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('خطا در ارتباط با سرور');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  if (isLoading) {
    return (
      <div className="text-center py-20 w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4179F0] mx-auto mb-4"></div>
        <p className="font-vazirmatn font-normal text-base text-[#666666]">
          در حال بارگذاری نوبت‌ها...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 w-full">
        <p className="font-vazirmatn font-normal text-base text-[#E53E3E]">
          {error}
        </p>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-20 w-full">
        <p className="font-vazirmatn font-normal text-base text-[#666666]">
          هیچ نوبتی ثبت نشده است.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {appointments.map((appointment) => {
        // ساخت آبجکت دکتر برای AppointmentCard
        const doctor = {
          id: appointment.doctorId._id,
          _id: appointment.doctorId._id,
          name: appointment.doctorId.name,
          specialty: appointment.doctorId.specialty,
          image: appointment.doctorId.image || appointment.doctorId.avatar || '/assets/logo.png',
          rating: appointment.doctorId.rating || 5,
          reviewCount: appointment.doctorId.reviewCount || 0,
          medicalCode: appointment.doctorId.medicalCode || '---',
          address: appointment.doctorId.address || 'تهران',
        };

        return (
          <AppointmentCard
            key={appointment._id}
            doctor={doctor}
            appointmentDate={appointment.date}
            appointmentTime={appointment.time}
            trackingCode={appointment.trackingCode || appointment._id.slice(-6)}
          />
        );
      })}
    </div>
  );
}