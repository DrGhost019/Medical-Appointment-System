// src/components/home/FAQItem.tsx
"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div className="w-full border-b border-[#E7E7E7] last:border-b-0">
      {/* Question Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-right hover:bg-gray-50 transition-colors px-2 rounded-lg group"
      >
        <span className="font-vazirmatn font-medium text-base text-[#2E2E2E]">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`transition-all duration-300 flex-shrink-0 mr-2 ${
            isOpen 
              ? 'rotate-180 text-[#4179F0]' 
              : 'rotate-0 text-[#2E2E2E] group-hover:text-[#4179F0]'
          }`}
        />
      </button>

      {/* Answer */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="font-vazirmatn font-normal text-sm text-[#666666] leading-[180%] px-2">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default FAQItem;