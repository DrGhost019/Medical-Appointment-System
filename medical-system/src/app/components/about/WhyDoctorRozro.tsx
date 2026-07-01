// src/components/about/WhyDoctorRozro.tsx
import React from 'react';

const features = [
  {
    icon: '/assets/setting-04.png',
    title: 'مدیریت و تغییر نوبت به راحتی',
    description: 'توانایی لغو، تغییر و مدیریت نوبت‌ها به راحتی',
  },
  {
    icon: '/assets/comment-01.png',
    title: 'اطمینان از انتخاب بهترین پزشکان',
    description: 'بهترین پزشکان با توجه به نظرات کاربران انتخاب کنید',
  },
  {
    icon: '/assets/clock-02.png',
    title: 'دسترسی 24 ساعته به پزشکان',
    description: 'در هر زمان می‌توانید نوبت خود را رزرو کنید',
  },
];

const WhyDoctorRozro = () => {
  return (
    <section className="w-full py-16">
      <div
        className="flex flex-col mx-auto"
        style={{
          width: '1216px',
          height: '192px',
          gap: '24px',
        }}
      >
        {/* عنوان سکشن */}
        <h2
          className="font-vazirmatn font-bold text-right"
          style={{
            width: '1216px',
            height: '36px',
            fontSize: '24px',
            lineHeight: '150%',
            color: '#000000',
          }}
        >
          چرا دکتر رزرو؟
        </h2>

        {/* سه باکس ویژگی */}
        <div
          className="flex"
          style={{
            width: '1216px',
            height: '132px',
            gap: '16px',
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center bg-white flex-shrink-0"
              style={{
                width: '394.67px',
                height: '132px',
                borderRadius: '10px',
                border: '1px solid #E7E7E7',
                gap: '12px',
                padding: '20px',
              }}
            >
              {/* آیکون سمت راست */}
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-10 h-10 object-contain flex-shrink-0"
              />

              {/* متن کنار آیکون */}
              <div className="flex flex-col gap-1">
                <h3 className="font-vazirmatn font-bold text-sm text-[#2E2E2E]">
                  {feature.title}
                </h3>
                <p className="font-vazirmatn font-normal text-xs text-[#666666] leading-[180%]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDoctorRozro;