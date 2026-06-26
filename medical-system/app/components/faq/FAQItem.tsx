// src/components/faq/FAQItem.tsx
"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#E7E7E7] last:border-b-0">
      {/* سوال */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-6 text-right hover:bg-gray-50 transition-colors"
      >
        {/* متن سوال */}
        <span className="font-vazirmatn font-medium text-sm text-[#2E2E2E]">
          {question}
        </span>

        {/* آیکون فلش */}
        <ChevronDown
          size={18}
          className={`text-[#666666] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* پاسخ - نمایش هنگام باز شدن */}
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="font-vazirmatn font-normal text-sm text-[#666666] leading-[180%]">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;