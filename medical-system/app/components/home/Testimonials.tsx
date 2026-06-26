// src/components/home/Testimonials.tsx
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  const testimonials = [
    {
      id: '1',
      userImage: '/assets/rahamoradi.jpg',
      userName: 'رها مرادی',
      date: '۱۴۰۳/۰۸/۲۰',
      rating: 4,
      comment: 'سلام دکتر بسیار خون گرم و مهربون بود.',
      doctorName: 'دکتر زهرا وارسته',
    },
    {
      id: '2',
      userImage: '/assets/mitra.jpg',
      userName: 'میترا',
      date: '۱۴۰۳/۰۸/۱۸',
      rating: 4,
      comment: 'دکتر عالی هستند و تشخیصشون درست در اولین معاینه بیماری را تشخیص دادند و با تجویز یک نسخه درمان کردند.',
      doctorName: 'دکتر محمد محمودی',
    },
    {
      id: '3',
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
        
        {/* Main Container */}
        <div className="w-[1216px] mx-auto flex flex-col gap-[18px] py-6">
          
          {/* Header: Title + View All Button */}
          <div className="w-full h-[40px] flex items-center justify-between pr-2">
            <h2 className="font-vazirmatn font-medium text-[24px] leading-[100%] text-[#000000]">
              نظرات کاربران
            </h2>
            <button className="flex items-center gap-1 text-[#666666] font-vazirmatn font-normal text-sm hover:text-primary-500 transition-colors">
              مشاهده همه
              <ChevronLeft size={16} />
            </button>
          </div>

          {/* Testimonials Cards with Navigation */}
          <div className="relative w-full">
            
            {/* Navigation Button - Right (Previous) */}
            <button className="absolute right-[-18px] top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#F6F6F6] flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm">
              <ChevronLeft size={18} className="text-[#666666] rotate-180" />
            </button>

            {/* Testimonials Cards */}
            <div className="w-full flex items-center gap-4">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  userImage={testimonial.userImage}
                  userName={testimonial.userName}
                  date={testimonial.date}
                  rating={testimonial.rating}
                  comment={testimonial.comment}
                  doctorName={testimonial.doctorName}
                />
              ))}
            </div>

            {/* Navigation Button - Left (Next) */}
            <button className="absolute left-[-18px] top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#F6F6F6] flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm">
              <ChevronLeft size={18} className="text-[#666666]" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;