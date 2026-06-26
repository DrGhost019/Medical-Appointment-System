// src/components/payment/PaymentAlert.tsx
import React from 'react';

const PaymentAlert = () => {
  return (
    <div className="w-full rounded-lg bg-[#FFF5F5] border border-[#FFE0E0] px-5 py-3 flex items-center gap-3">
      {/* آیکون نقطه */}
      <div className="w-2.5 h-2.5 rounded-full bg-[#E53E3E] flex-shrink-0"></div>
      
      {/* متن هشدار */}
      <p className="font-vazirmatn font-normal text-sm text-[#666666]">
        نوبت شما هنوز تکمیل نشده است، برای ادامه پرداخت را انجام دهید.
      </p>
    </div>
  );
};

export default PaymentAlert;