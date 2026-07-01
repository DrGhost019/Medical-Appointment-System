// src/components/home/HealthTest.tsx
import React from 'react';

const HealthTest = () => {
  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-[1440px] mx-auto px-4">
        
        {/* Main Container */}
        <div 
          className="w-[1216px] h-[331px] mx-auto rounded-2xl border border-[#E7E7E7] bg-white relative overflow-hidden"
          style={{
            borderWidth: '1.5px',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Image - Left Side */}
          <div className="absolute left-0 top-[1.5px] w-[492px] h-[329px]">
            <img
              src="/assets/testresultpaper.png"
              alt="تست سلامت"
              className="w-full h-full object-cover"
              style={{
                borderTopRightRadius: '16px',
                borderBottomRightRadius: '16px',
              }}
            />
          </div>

          {/* Content - Right Side */}
          <div 
            className="absolute top-[41px] right-[88px] w-[508px] h-[96px] p-[10px] flex flex-col gap-4"
          >
            <h2 className="font-vazirmatn font-bold text-2xl text-[#000000] leading-[130%]">
              همین حالا رایگان تست سلامت بگیرید!
            </h2>
            <p className="font-vazirmatn font-normal text-base text-[#666666] leading-[180%]">
              در کمتر از دو دقیقه سلامت خود را ارزیابی کنید
            </p>
          </div>

          {/* Button */}
          <button 
            className="absolute top-[165px] right-[108px] w-[200px] h-14 min-w-[88px] rounded-lg bg-[#4179F0] text-white font-vazirmatn font-medium text-base py-3 px-[12px] hover:bg-[#3565d0] transition-colors"
            style={{
              paddingRight: '12px',
              paddingLeft: '10px',
            }}
          >
            شروع تست سلامت
          </button>

        </div>

      </div>
    </section>
  );
};

export default HealthTest;