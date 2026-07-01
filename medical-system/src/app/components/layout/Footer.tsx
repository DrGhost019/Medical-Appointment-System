// src/app/components/layout/Footer.tsx
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  Smartphone,
  Send,
  ArrowLeft
} from 'lucide-react';

// آیکون SVG اینستاگرام
const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// آیکون SVG لینکدین
const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// آیکون SVG واتساپ
const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.76 1-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227  1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297 A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState('');

  const quickLinks = [
    { label: 'صفحه اصلی', href: '/' },
    { label: 'لیست پزشکان', href: '/doctors' },
    { label: 'سوالات متداول', href: '/faq' },
    { label: 'درباره ما', href: '/about' },
    { label: 'تماس با ما', href: '/contact' },
  ];

  const legalLinks = [
    { label: 'شرایط و قوانین', href: '/terms' },
    { label: 'حریم خصوصی', href: '/privacy' },
    { label: 'سیاست بازگشت وجه', href: '/refund' },
  ];

  const socialIcons = [
    { icon: <LinkedinIcon size={20} />, label: 'لینکدین', href: '#' },
    { icon: <Send size={20} />, label: 'تلگرام', href: '#' },
    { icon: <InstagramIcon size={20} />, label: 'اینستاگرام', href: '#' },
    { icon: <WhatsAppIcon size={20} />, label: 'واتساپ', href: '#' },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    console.log("ایمیل ثبت شده برای خبرنامه:", email);
    alert('ایمیل شما با موفقیت در خبرنامه ثبت شد.');
    setEmail('');
  };

  return (
    <footer className="w-full bg-white border-t border-[#E7E7E7]" dir="rtl">
      <div className="max-w-[1440px] mx-auto">
        {/* Main Footer Container */}
        <div 
          className="w-full rounded-t-[32px] bg-white"
          style={{
            paddingTop: '64px',
            paddingRight: '120px',
            paddingBottom: '48px',
            paddingLeft: '120px',
          }}
        >
          
          {/* Top Section: 4 Columns */}
          <div 
            className="mx-auto flex items-start justify-between mb-12"
            style={{ width: '1200px' }}
          >
            
            {/* Column 1: Quick Links */}
            <div className="flex flex-col gap-3 text-right">
              <h3 className="font-vazirmatn font-bold text-base text-[#2E2E2E] mb-2">
                لینک‌های سریع
              </h3>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="font-vazirmatn font-normal text-sm text-[#666666] hover:text-[#4179F0] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Column 2: Legal Info */}
            <div className="flex flex-col gap-3 text-right">
              <h3 className="font-vazirmatn font-bold text-base text-[#2E2E2E] mb-2">
                اطلاعات حقوقی
              </h3>
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="font-vazirmatn font-normal text-sm text-[#666666] hover:text-[#4179F0] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Column 3: Contact Info */}
            <div className="flex flex-col gap-3 text-right">
              <h3 className="font-vazirmatn font-bold text-base text-[#2E2E2E] mb-2">
                اطلاعات تماس
              </h3>
              
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-[#666666] flex-shrink-0" />
                <span className="font-vazirmatn font-normal text-sm text-[#666666]" dir="ltr">
                  ۰۲-۱۲۳۴۵۶۷۸
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Smartphone size={16} className="text-[#666666] flex-shrink-0" />
                <span className="font-vazirmatn font-normal text-sm text-[#666666]" dir="ltr">
                  ۰۹۱-۱۲۳۴۵۶۷
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} className="text-[#666666] flex-shrink-0" />
                <span className="font-vazirmatn font-normal text-sm text-[#666666]">
                  info@doctorrezerve.ir
                </span>
              </div>

              <p className="font-vazirmatn font-normal text-sm text-[#666666] leading-[180%] mt-2">
                تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۱۲
              </p>
            </div>

            {/* Column 4: Newsletter */}
            <div 
              className="rounded-xl flex flex-col gap-[10px] text-right"
              style={{
                width: '370px',
                padding: '24px 32px',
                background: '#203C8608',
              }}
            >
              <h3 className="font-vazirmatn font-bold text-base text-[#2E2E2E]">
                مشترک شوید
              </h3>
              <p className="font-vazirmatn font-normal text-sm text-[#666666] leading-[180%]">
                برای دریافت آخرین اخبار و مقالات پزشکی، ایمیل خود را وارد کنید.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 mt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="آدرس ایمیل"
                  className="flex-1 h-10 px-3 rounded-lg border border-[#E7E7E7] bg-white font-vazirmatn font-normal text-sm text-[#2E2E2E] placeholder:text-[#888888] outline-none focus:border-[#4179F0] transition-colors text-right"
                  required
                />
                <button 
                  type="submit" 
                  className="w-10 h-10 rounded-lg bg-[#4179F0] text-white flex items-center justify-center hover:bg-[#3565d0] transition-colors flex-shrink-0"
                >
                  <ArrowLeft size={18} />
                </button>
              </form>
            </div>

          </div>

          {/* Divider Line */}
          <div 
            className="w-full h-[1px] mx-auto mb-8"
            style={{
              maxWidth: '1214px',
              background: '#0A142F',
              opacity: 0.06,
            }}
          ></div>

          {/* Bottom Section: Social Icons (Right) + Logo (Left) */}
          <div 
            className="mx-auto flex items-center justify-between"
            style={{ width: '1200px' }}
          >
            
            {/* Social Icons - Right Side */}
            <div className="flex items-center gap-4">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-[#F6F6F6] flex items-center justify-center text-[#666666] hover:bg-[#4179F0] hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Logo - Left Side */}
            <Link href="/" className="flex-shrink-0">
              <img
                src="/assets/logo.png"
                alt="دکتر رزرو"
                className="h-10 object-contain cursor-pointer"
              />
            </Link>

          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;