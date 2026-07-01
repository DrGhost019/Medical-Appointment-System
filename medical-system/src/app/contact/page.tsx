// src/app/contact/page.tsx
"use client";

import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // شبیه‌سازی ارسال به سرور
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Phone size={20} className="text-[#4179F0]" />,
      title: 'تلفن',
      details: ['۰۲۱-۱۲۳۴۵۶۷۸', '۰۹۱۲-۱۲۳۴۵۶۷'],
    },
    {
      icon: <Mail size={20} className="text-[#4179F0]" />,
      title: 'ایمیل',
      details: ['info@doctorrezerve.ir', 'support@doctorrezerve.ir'],
    },
    {
      icon: <MapPin size={20} className="text-[#4179F0]" />,
      title: 'آدرس',
      details: ['تهران، خیابان ولیعصر،', 'بالاتر از میدان ونک، پلاک ۱۲۳'],
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1440px] mx-auto py-8 px-4 md:px-[110px]">
        <div className="flex flex-col gap-8">
          
          {/* عنوان صفحه */}
          <div className="text-right">
            <h1 className="font-vazirmatn font-bold text-2xl text-[#2E2E2E]">
              تماس با ما
            </h1>
            <p className="font-vazirmatn font-normal text-sm text-[#666666] mt-1">
              ما همیشه در خدمت شما هستیم. سوالات و نظرات خود را با ما در میان بگذارید.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* سمت راست: اطلاعات تماس */}
            <div className="lg:w-[380px] flex-shrink-0">
              <div className="bg-white rounded-xl border border-[#E7E7E7] p-6 flex flex-col gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="text-right">
                      <h3 className="font-vazirmatn font-medium text-sm text-[#2E2E2E]">
                        {info.title}
                      </h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="font-vazirmatn font-normal text-sm text-[#666666]">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}

                {/* ساعات کاری */}
                <div className="border-t border-[#E7E7E7] pt-4">
                  <h3 className="font-vazirmatn font-medium text-sm text-[#2E2E2E] text-right mb-2">
                    ساعات کاری
                  </h3>
                  <div className="text-right space-y-1">
                    <p className="font-vazirmatn font-normal text-sm text-[#666666]">
                      شنبه تا چهارشنبه: ۸:۰۰ - ۲۰:۰۰
                    </p>
                    <p className="font-vazirmatn font-normal text-sm text-[#666666]">
                      پنجشنبه: ۸:۰۰ - ۱۴:۰۰
                    </p>
                    <p className="font-vazirmatn font-normal text-sm text-[#666666]">
                      جمعه: تعطیل
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* سمت چپ: فرم تماس */}
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#E7E7E7] p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* نام */}
                  <div className="text-right">
                    <label className="font-vazirmatn font-medium text-sm text-[#2E2E2E] block mb-1.5">
                      نام و نام خانوادگی
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="نام خود را وارد کنید"
                      className="w-full h-10 rounded-lg border border-[#E7E7E7] px-4 font-vazirmatn font-normal text-sm text-[#2E2E2E] placeholder:text-[#888888] focus:outline-none focus:border-[#4179F0]"
                      required
                    />
                  </div>

                  {/* ایمیل */}
                  <div className="text-right">
                    <label className="font-vazirmatn font-medium text-sm text-[#2E2E2E] block mb-1.5">
                      ایمیل
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ایمیل خود را وارد کنید"
                      className="w-full h-10 rounded-lg border border-[#E7E7E7] px-4 font-vazirmatn font-normal text-sm text-[#2E2E2E] placeholder:text-[#888888] focus:outline-none focus:border-[#4179F0]"
                      required
                    />
                  </div>

                  {/* تلفن */}
                  <div className="text-right">
                    <label className="font-vazirmatn font-medium text-sm text-[#2E2E2E] block mb-1.5">
                      شماره تلفن
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="تلفن خود را وارد کنید"
                      className="w-full h-10 rounded-lg border border-[#E7E7E7] px-4 font-vazirmatn font-normal text-sm text-[#2E2E2E] placeholder:text-[#888888] focus:outline-none focus:border-[#4179F0]"
                    />
                  </div>

                  {/* موضوع */}
                  <div className="text-right">
                    <label className="font-vazirmatn font-medium text-sm text-[#2E2E2E] block mb-1.5">
                      موضوع
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full h-10 rounded-lg border border-[#E7E7E7] px-4 font-vazirmatn font-normal text-sm text-[#2E2E2E] focus:outline-none focus:border-[#4179F0]"
                      required
                    >
                      <option value="">انتخاب موضوع</option>
                      <option value="support">پشتیبانی</option>
                      <option value="suggestion">پیشنهاد</option>
                      <option value="complaint">شکایت</option>
                      <option value="partnership">همکاری</option>
                      <option value="other">سایر</option>
                    </select>
                  </div>
                </div>

                {/* پیام */}
                <div className="text-right mt-4">
                  <label className="font-vazirmatn font-medium text-sm text-[#2E2E2E] block mb-1.5">
                    پیام شما
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="پیام خود را وارد کنید..."
                    rows={5}
                    className="w-full rounded-lg border border-[#E7E7E7] px-4 py-3 font-vazirmatn font-normal text-sm text-[#2E2E2E] placeholder:text-[#888888] focus:outline-none focus:border-[#4179F0] resize-none"
                    required
                  />
                </div>

                {/* دکمه ارسال */}
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-vazirmatn font-medium text-sm transition-colors ${
                      isSubmitting
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-[#4179F0] text-white hover:bg-[#3565d0]'
                    }`}
                  >
                    {isSubmitting ? 'در حال ارسال...' : 'ارسال پیام'}
                    <Send size={16} />
                  </button>
                </div>

                {/* پیام موفقیت */}
                {isSuccess && (
                  <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200 text-right">
                    <p className="font-vazirmatn font-medium text-sm text-green-600">
                      ✅ پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.
                    </p>
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}