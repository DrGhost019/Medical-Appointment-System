// src/components/about/TechForHealth.tsx
import React from 'react';

const TechForHealth = () => {
  return (
    <section className="w-full py-16">
      <div
        className="flex items-center mx-auto"
        style={{
          width: '1146px',
          height: '541px',
          gap: '146px',
        }}
      >
        {/* سمت راست: تصاویر موبایل */}
        <div
          className="flex items-end flex-shrink-0"
          style={{
            width: '498px',
            height: '541px',
            gap: '24px',
          }}
        >
          {/* تصویر iphone2 - بزرگتر */}
          <img
            src="/assets/iphone2.png"
            alt="اپلیکیشن دکتر رزرو"
            className="object-contain"
            style={{
              width: '280px',
              height: 'auto',
            }}
          />

          {/* تصویر iphone3 - کوچکتر */}
          <img
            src="/assets/iphone3.png"
            alt="اپلیکیشن دکتر رزرو"
            className="object-contain"
            style={{
              width: '220px',
              height: 'auto',
            }}
          />
        </div>

        {/* سمت چپ: متن */}
        <div
          className="flex flex-col flex-shrink-0"
          style={{
            width: '502px',
            height: '337px',
            gap: '31px',
          }}
        >
          {/* عنوان */}
          <h2 className="font-vazirmatn font-bold text-[24px] text-[#000000] leading-[150%] text-right">
            تکنولوژی در خدمت سلامت
          </h2>

          {/* متن توضیحات */}
          <p className="font-vazirmatn font-normal text-[14px] text-[#666666] leading-[220%] text-right">
            ما با استفاده از فناوری‌های روز، فرآیند نوبت‌دهی پزشکی را به سطحی جدید ارتقا داده‌ایم. دکتر رزرو با بهره‌گیری از الگوریتم‌های هوشمند، سیستم یادآوری خودکار و داده‌های ایمن‌شده، بستری مطمئن و سریع برای دریافت خدمات پزشکی فراهم کرده است.
          </p>

          <p className="font-vazirmatn font-normal text-[14px] text-[#666666] leading-[220%] text-right">
            برای کاربرپسند و دسترسی آسان به اطلاعات، باعث شده تا بیماران بدون پیچیدگی‌های اضافی و در کمترین زمان، نوبت موردنظر خود را رزرو کنند. همچنین، پزشکان می‌توانند با مدیریت دقیق‌تر زمان‌های خود، بهره‌وری بیشتری داشته باشند.
          </p>

          <p className="font-vazirmatn font-normal text-[14px] text-[#666666] leading-[220%] text-right">
            با دکتر رزرو، نوبت‌دهی دیگر یک چالش نیست، بلکه تجربه‌ای راحت، سریع و بدون دغدغه است.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechForHealth;