"use client";

import React, { useEffect, useState } from 'react';
import AppointmentCard from './AppointmentCard';

// 👈 اضافه کردن DoctorDetail به ایمپورت‌ها برای حل ارور
import { allDoctors, DoctorDetail } from '../../data/doctorDetails';

interface Appointment {
  doctorId: string;
  date: string;
  time: string;
  trackingCode: string;
}

const AppointmentList = () => {
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    // خواندن آخرین نوبت از localStorage
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      const appointments = JSON.parse(savedAppointments);
      // فقط آخرین نوبت رو نمایش بده
      if (appointments.length > 0) {
        setAppointment(appointments[appointments.length - 1]);
      }
    }
  }, []);

  if (!appointment) {
    return (
      <div className="text-center py-20 w-full">
        <p className="font-vazirmatn font-normal text-base text-[#666666]">
          هیچ نوبتی ثبت نشده است.
        </p>
      </div>
    );
  }

  // اگر پارامتر داخل پرانتز نباشد، باید آن را داخل پرانتز بگذارید
  const doctor = allDoctors.find((d: DoctorDetail) => d.id === appointment.doctorId);
  if (!doctor) {
    return (
      <div className="text-center py-20 w-full">
        <p className="font-vazirmatn font-normal text-base text-[#666666]">
          اطلاعات پزشک یافت نشد.
        </p>
      </div>
    );
  }

  return (
    <AppointmentCard
      doctor={doctor}
      appointmentDate={appointment.date}
      appointmentTime={appointment.time}
      trackingCode={appointment.trackingCode}
    />
  );
};

export default AppointmentList;