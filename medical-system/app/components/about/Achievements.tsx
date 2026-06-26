// src/components/about/Achievements.tsx
import React from 'react';
import { toPersianNumber } from '../../lib/persianNumber';

const achievements = [
  {
    number: 5000,
    label: 'پزشک در سیستم',
  },
  {
    number: 3000,
    label: 'کلینیک فعال',
  },
  {
    number: 500000,
    label: 'نوبت ثبت‌شده',
  },
  {
    number: 2000,
    label: 'متخصص تایید شده',
  },
  {
    number: 100000,
    label: 'کاربر فعال',
  },
];

const Achievements = () => {
  return (
    <section className="w-full py-16">
      <div
        className="flex flex-col mx-auto"
        style={{
          width: '1197px',
          height: '177px',
          gap: '24px',
        }}
      >
        {/* عنوان سکشن */}
        <h2
          className="font-vazirmatn font-bold text-right"
          style={{
            width: '1197px',
            height: '36px',
            fontSize: '24px',
            lineHeight: '150%',
            color: '#000000',
          }}
        >
          افتخارات و دستاوردهای ما
        </h2>

        {/* 5 باکس آمار */}
        <div
          className="flex"
          style={{
            width: '1197px',
            height: '117px',
            gap: '28px',
          }}
        >
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-white flex-shrink-0"
              style={{
                width: '217px',
                height: '117px',
                borderRadius: '10px',
                border: '1px solid #E7E7E7',
                gap: '12px',
                padding: '20px',
              }}
            >
              {/* عدد */}
              <div className="font-vazirmatn font-bold text-[28px] text-black leading-[120%]">
                {toPersianNumber(achievement.number.toLocaleString('en-US'))}+
              </div>

              {/* متن توضیح */}
              <div className="font-vazirmatn font-normal text-[12px] text-[#666666] leading-[150%] text-center">
                {achievement.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;