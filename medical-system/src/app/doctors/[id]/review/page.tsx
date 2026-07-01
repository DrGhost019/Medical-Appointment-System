// src/app/doctors/[id]/review/page.tsx
import { notFound } from 'next/navigation';
import connectDB from '../../../lib/db';
import Doctor from '../../../models/Doctor';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import ReviewBackLink from '../../../components/review/ReviewBackLink';
import ReviewFormContainer from '../../../components/review/ReviewFormContainer';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReviewPage({ params }: Props) {
  const { id } = await params;

  // ✅ بدون isValid چون id از نوع string هست
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
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="max-w-[1440px] mx-auto py-8 px-[110px]">
        <div className="flex flex-col gap-6">
          <ReviewBackLink doctorId={doctorData.id} />
          <ReviewFormContainer doctor={doctorData} />
        </div>
      </div>
      <Footer />
    </main>
  );
}