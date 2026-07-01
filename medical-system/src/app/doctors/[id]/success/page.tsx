// src/app/doctors/[id]/success/page.tsx
import { Suspense } from 'react';
import SuccessContent from './SuccessContent';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4179F0] mx-auto mb-4"></div>
            <p className="text-gray-500">در حال بارگذاری...</p>
          </div>
        </div>
      }>
        <SuccessContent />
      </Suspense>
      <Footer />
    </main>
  );
}