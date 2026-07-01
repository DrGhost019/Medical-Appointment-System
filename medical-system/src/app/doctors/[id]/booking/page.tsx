// src/app/doctors/[id]/booking/page.tsx
import { notFound } from 'next/navigation';
import connectDB from '../../../lib/db';
import Doctor from '../../../models/Doctor';
import Slot from '../../../models/Slot';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import BookingBackLink from '../../../components/booking/BookingBackLink';
import SelectedDoctorInfo from '../../../components/booking/SelectedDoctorInfo';
import PatientSelector from '../../../components/booking/PatientSelector';
import ContinueButton from '../../../components/booking/ContinueButton';
import BookingCalendar from '../../../components/doctor/BookingCalendar';
import AppointmentSummary from '../../../components/booking/AppoitmentSummary';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BookingPage({ params }: Props) {
  const { id } = await params;

  await connectDB();

  const doctors = await Doctor.find().lean();
  const doctor = doctors.find((d: any) => d._id.toString() === id);

  if (!doctor) {
    notFound();
  }

  const allSlots = await Slot.find({ doctorId: id, isReserved: false })
    .sort({ date: 1, time: 1 })
    .limit(20)
    .lean();

  const doctorData = {
    ...doctor,
    _id: doctor._id.toString(),
    id: doctor._id.toString(),
    image: doctor.image || doctor.avatar || '/assets/logo.png',
    avatar: doctor.avatar || doctor.image || '/assets/logo.png',
    availableTimes: allSlots.map((slot: any) => ({
      _id: slot._id.toString(),
      time: slot.time,
      isReserved: slot.isReserved,
    })),
  };

  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <Header />
      
      <div className="max-w-[1440px] mx-auto py-8 px-4 md:px-[110px]">
        <div className="flex flex-col gap-6">
          
          <BookingBackLink backUrl={`/doctors/${id}`} />
          
          {/* ✅ ردیف اول: اطلاعات پزشک + تقویم + خلاصه نوبت */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* اطلاعات پزشک - 6 ستون */}
            <div className="lg:col-span-6">
              <SelectedDoctorInfo doctor={doctorData} />
            </div>
            
            {/* تقویم - 4 ستون */}
            <div className="lg:col-span-4">
              <BookingCalendar doctor={doctorData} />
            </div>
            
            {/* خلاصه نوبت - 2 ستون */}
            <div className="lg:col-span-2">
              <AppointmentSummary />
            </div>
          </div>
          
          {/* ✅ ردیف دوم: انتخاب مراجعه کننده */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6">
              <PatientSelector />
            </div>
            {/* سمت چپ خالی میمونه یا میتونی چیز دیگه بذاری */}
          </div>
          
          {/* ✅ ردیف سوم: دکمه ادامه */}
          <div className="flex justify-center">
            <ContinueButton doctorId={id} />
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}