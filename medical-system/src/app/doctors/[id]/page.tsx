// src/app/doctors/[id]/page.tsx
import { notFound } from 'next/navigation';
import connectDB from '../../lib/db';
import Doctor from '../../models/Doctor';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import DoctorInfo from '../../components/doctor/DoctorInfo';
import ContactMethods from '../../components/doctor/ContactMethods';
import ReviewsSection from '../../components/doctor/ReviewsSection';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DoctorDetailPage({ params }: Props) {
  const { id } = await params;

  await connectDB();

  const doctors = await Doctor.find().lean();
  const doctor = doctors.find((d: any) => d._id.toString() === id);

  if (!doctor) {
    notFound();
  }

  const doctorData = {
    ...doctor,
    _id: doctor._id.toString(),
    id: doctor._id.toString(),
    image: doctor.image || doctor.avatar || '/assets/logo.png',
    avatar: doctor.avatar || doctor.image || '/assets/logo.png',
  };

  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <Header />
      
      <div className="max-w-[1440px] mx-auto py-8 px-4 md:px-[110px]">
        <div className="flex flex-col gap-6">
          
          <DoctorInfo doctor={doctorData} />
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <ContactMethods doctor={doctorData} />
            </div>
            {/* ❌ تقویم رو حذف کردیم */}
          </div>
          
          <ReviewsSection 
            doctorId={doctorData._id}
            doctorName={doctorData.name}
            reviews={[]}
            rating={doctorData.rating || 5}
            reviewCount={doctorData.reviewCount || 0}
          />

        </div>
      </div>

      <Footer />
    </main>
  );
}