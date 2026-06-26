// src/components/about/ContactInfo.tsx
import React from 'react';
import { Smartphone, Phone } from 'lucide-react';

const ContactInfo = () => {
  return (
    <section className="w-full py-16">
      <div
        className="flex flex-col mx-auto"
        style={{
          width: '1216px',
          height: '196px',
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
          اطلاعات تماس
        </h2>

        {/* دو باکس تماس */}
        <div
          className="flex"
          style={{
            width: '1216px',
            height: '136px',
            gap: '16px',
          }}
        >
          {/* باکس 1: جهت مشاوره */}
          <div
            className="flex items-center bg-white flex-shrink-0"
            style={{
              width: '600px',
              height: '136px',
              borderRadius: '10px',
              border: '1px solid #E7E7E7',
              gap: '12px',
              padding: '20px',
            }}
          >
            <Smartphone size={24} className="text-[#666666] flex-shrink-0" />
            <div className="flex flex-col gap-1">
              <h3 className="font-vazirmatn font-bold text-sm text-[#2E2E2E]">
                جهت مشاوره
              </h3>
              <p className="font-vazirmatn font-normal text-xs text-[#666666] leading-[180%]">
                ۰۹۱۲ ۳۴۵ ۶۷۸۹
              </p>
              <p className="font-vazirmatn font-normal text-xs text-[#666666] leading-[180%]">
                ۰۹۱۲ ۳۴۵ ۶۹۰
              </p>
            </div>
          </div>

          {/* باکس 2: جهت شکایات و انتقادات */}
          <div
            className="flex items-center bg-white flex-shrink-0"
            style={{
              width: '600px',
              height: '136px',
              borderRadius: '10px',
              border: '1px solid #E7E7E7',
              gap: '12px',
              padding: '20px',
            }}
          >
            <Phone size={24} className="text-[#666666] flex-shrink-0" />
            <div className="flex flex-col gap-1">
              <h3 className="font-vazirmatn font-bold text-sm text-[#2E2E2E]">
                جهت شکایات و انتقادات
              </h3>
              <p className="font-vazirmatn font-normal text-xs text-[#666666] leading-[180%]">
                ۰۲۱-۷۷ ۴۲۵۸۶
              </p>
              <p className="font-vazirmatn font-normal text-xs text-[#666666] leading-[180%]">
                ۰۲۱-۷۷ ۴۲۵۸۶۸
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;