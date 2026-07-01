// src/components/review/TermsCheckbox.tsx
"use client";

import React from 'react';
import { Check } from 'lucide-react';

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const TermsCheckbox = ({ checked, onChange }: TermsCheckboxProps) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      {/* چک‌باکس */}
      <div
        onClick={() => onChange(!checked)}
        className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
          checked
            ? 'bg-[#4179F0] border-[#4179F0]'
            : 'border border-[#CCCCCC] bg-white'
        }`}
      >
        {checked && <Check size={14} className="text-white" strokeWidth={3} />}
      </div>

      {/* متن */}
      <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E]">
        <span className="text-[#4179F0] underline cursor-pointer hover:text-[#3565d0]">
          قوانین ثبت نظر
        </span>{' '}
        را خوانده‌ام و موافقم.
      </span>
    </label>
  );
};

export default TermsCheckbox;