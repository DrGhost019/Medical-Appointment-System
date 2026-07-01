// src/components/home/Testimonials.tsx
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import TestimonialCard from './TestimonialCard';
import connectDB from '../../lib/db';
import Testimonial from '../../models/Testimonial';

export const dynamic = 'force-dynamic';

export default async function Testimonials() {
  await connectDB();
  
  const testimonialsFromDB = await Testimonial.find({})
    .sort({ date: -1, createdAt: -1 })
    .limit(3)
    .lean();

  const testimonials = testimonialsFromDB.length > 0 ? testimonialsFromDB : [
    {
      _id: '1',
      userImage: '/assets/rahamoradi.jpg',
      userName: 'رها مرادی',
      date: '۱۴۰۳/۰۸/۲۰',
      rating: 4,
      comment: 'سلام دکتر بسیار خون گرم و مهربون بود.',
      doctorName: 'دکتر زهرا وارسته',
    },
    {
      _id: '2',
      userImage: '/assets/mitra.jpg',
      userName: 'میترا',
      date: '۱۴۰۳/۰۸/۱۸',
      rating: 4,
      comment: 'دکتر عالی هستند و تشخیصشون درست در اولین معاینه بیماری را تشخیص دادند.',
      doctorName: 'دکتر محمد محمودی',
    },
    {
      _id: '3',
      userImage: '/assets/hasanahmadi.jpg',
      userName: 'حسن احمدی',
      date: '۱۴۰۳/۰۸/۱۵',
      rating: 4,
      comment: 'دکتر عالی هستند و تشخیصشون درست بود و زود خوب شدم',
      doctorName: 'دکتر علی وارسته',
    },
  ];

  return (
    <section className="w-full bg-white py-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="w-[1216px] mx-auto flex flex-col gap-[18px] py-6">
          
          <div className="w-full h-[40px] flex items-center justify-between pr-2">
            <h2 className="font-vazirmatn font-medium text-[24px] leading-[100%] text-[#000000]">
              نظرات کاربران
            </h2>
            <button className="flex items-center gap-1 text-[#666666] font-vazirmatn font-normal text-sm hover:text-primary-500 transition-colors">
              مشاهده همه
              <ChevronLeft size={16} />
            </button>
          </div>

          <div className="relative w-full">
            <div className="w-full flex items-center gap-4">
              {testimonials.map((testimonial: any) => (
                <TestimonialCard
                  key={testimonial._id?.toString() || testimonial.id}
                  userImage={testimonial.userImage || testimonial.avatar || '/assets/logo.png'}
                  userName={testimonial.userName}
                  date={testimonial.date}
                  rating={testimonial.rating || 5}
                  comment={testimonial.comment}
                  doctorName={testimonial.doctorName}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}