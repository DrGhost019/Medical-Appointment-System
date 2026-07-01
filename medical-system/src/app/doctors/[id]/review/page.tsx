// src/app/doctors/[id]/review/page.tsx
import { notFound } from 'next/navigation';
import connectDB from '../../../lib/db';
import Doctor from '../../../models/Doctor';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import ReviewBackLink from '../../../components/review/ReviewBackLink';
import ReviewFormContainer from '../../../components/review/ReviewFormContainer';
import mongoose from 'mongoose';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReviewPage({ params }: Props) {
  const { id } = await params;
  
  // اعتبارسنجی ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  await connectDB();
  
  // دریافت اطلاعات پزشک از دیتابیس
  const doctor = await Doctor.findById(id).lean();

  if (!doctor) {
    notFound();
  }

  // تبدیل به فرمت مورد نیاز
  const doctorData = {
    ...doctor,
    _id: doctor._id.toString(),
    id: doctor._id.toString(),
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1440px] mx-auto py-8 px-[110px]">
        <div className="flex flex-col gap-6">
          
          {/* Back Link */}
          <ReviewBackLink doctorId={id} />

          {/* Review Form Container */}
          <ReviewFormContainer doctor={doctorData} />

        </div>
      </div>

      <Footer />
    </main>
  );
}