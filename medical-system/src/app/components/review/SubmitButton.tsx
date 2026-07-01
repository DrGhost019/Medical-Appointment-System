// src/components/review/SubmitButton.tsx
"use client";

import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface SubmitButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

const SubmitButton = ({ disabled = false, onClick }: SubmitButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 rounded-lg font-vazirmatn font-medium text-base transition-colors ${
        disabled
          ? 'bg-[#CCCCCC] text-white cursor-not-allowed'
          : 'bg-[#4179F0] text-white hover:bg-[#3565d0]'
      }`}
      style={{
        width: '320px',
        height: '48px',
      }}
    >
      <span>ارسال نظر</span>
      <ArrowLeft size={18} />
    </button>
  );
};

export default SubmitButton;