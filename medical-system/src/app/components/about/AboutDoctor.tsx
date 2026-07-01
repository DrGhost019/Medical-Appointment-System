// src/components/about/AboutDoctor.tsx
import React from 'react';

const AboutDoctor = () => {
  return (
    <section className="w-full py-16">
      <div
        className="flex items-center mx-auto"
        style={{
          maxWidth: '1240px',
          height: '426px',
          gap: '43px',
        }}
      >
        {/* سمت راست: نوشته‌ها */}
        <div
          className="flex flex-col flex-shrink-0"
          style={{
            width: '352px',
            height: '292px',
            gap: '17px',
          }}
        >
          {/* عنوان */}
          <h2 className="font-vazirmatn font-bold text-[28px] text-[#2E2E2E] leading-[140%]">
            درباره دکتر رزرو
          </h2>

          {/* زیرعنوان */}
          <h3 className="font-vazirmatn font-bold text-[18px] text-black leading-[160%]">
            نوبت‌دهی سریع و هوشمند برای پزشکان و بیماران
          </h3>

          {/* متن توضیحات */}
          <p className="font-vazirmatn font-normal text-[14px] text-[#666666] leading-[200%]">
            دکتر رزرو یک پلتفرم مدرن و پیشرفته برای مدیریت نوبت‌دهی پزشکان و بیماران است. ما با ارائه یک سیستم هوشمند، به پزشکان کمک می‌کنیم تا زمان‌های خود را بهتر مدیریت کنند و به بیماران این امکان را می‌دهیم که بدون اتلاف وقت، نوبت خود را به صورت آنلاین رزرو کنند.
          </p>
        </div>

        {/* سمت چپ: تصاویر */}
        <div
          className="relative flex items-center justify-center flex-shrink-0"
          style={{
            width: '845px',
            height: '426px',
          }}
        >
          {/* تصویر لپ‌تاپ */}
          <img
            src="/assets/laptop.png"
            alt="دکتر رزرو در لپ‌تاپ"
            className="absolute"
            style={{
              width: '700px',
              height: 'auto',
              objectFit: 'contain',
            }}
          />

          {/* تصویر موبایل */}
          <img
            src="/assets/iphone.png"
            alt="دکتر رزرو در موبایل"
            className="absolute"
            style={{
              width: '220px',
              height: 'auto',
              objectFit: 'contain',
              left: '50px',
              bottom: '20px',
              zIndex: 10,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutDoctor;