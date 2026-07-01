"use client";

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) => {
  
  // اضافه شدن فونت وزیرمتن و بهینه‌سازی ترنزیشن‌ها
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-vazirmatn font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';
  
  // همگام‌سازی کامل با رنگ اختصاصی پروژه [#4179F0]
  const variants = {
    primary: 'bg-[#4179F0] text-white hover:bg-[#3565d0] focus:ring-[#4179F0]',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400',
    outline: 'border-2 border-[#4179F0] text-[#4179F0] hover:bg-blue-50 focus:ring-[#4179F0]',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={props.type || 'button'} // 👈 پیش‌فرض قرار دادن type='button' برای جلوگیری از رفتارهای ناخواسته در فرم‌ها
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;