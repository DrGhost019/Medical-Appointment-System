"use client";

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, className = '', ...props }: InputProps) => {
  return (
    <div className="w-full text-right" dir="rtl">
      {/* برچسب ورودی */}
      {label && (
        <label className="block text-sm font-vazirmatn font-medium text-[#2E2E2E] mb-1.5">
          {label}
        </label>
      )}
      
      {/* فیلد اصلی اینپوت */}
      <input
        className={`w-full px-4 py-2 border rounded-lg font-vazirmatn font-normal text-sm text-[#2E2E2E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4179F0] focus:border-transparent transition-all duration-200 ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      
      {/* پیام خطا */}
      {error && (
        <p className="mt-1 text-xs font-vazirmatn font-normal text-red-500 animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;