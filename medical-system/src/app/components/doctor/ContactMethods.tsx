import React from 'react';

const GlobeIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#4179F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const PhoneIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#4179F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.4 5 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#4179F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

interface ContactMethodsProps {
  doctor: {
    website?: string;
    phone?: string;
    instagram?: string;
  };
}

const ContactMethods = ({ doctor }: ContactMethodsProps) => {
  const contacts = [
    {
      icon: <GlobeIcon size={20} />,
      label: 'وبسایت',
      value: doctor.website || 'dr-reserve.com',
      href: doctor.website ? `https://${doctor.website}` : '#',
      width: 'w-[215px]',
    },
    {
      icon: <PhoneIcon size={20} />,
      label: 'شماره تماس',
      value: doctor.phone || 'ثبت نشده',
      href: doctor.phone ? `tel:${doctor.phone}` : '#',
      width: 'w-[215px]',
    },
    {
      icon: <InstagramIcon size={20} />,
      label: 'اینستاگرام',
      value: doctor.instagram ? `@${doctor.instagram}` : 'ثبت نشده',
      href: doctor.instagram ? `https://instagram.com/${doctor.instagram}` : '#',
      width: 'w-[280px]',
    },
  ];

  return (
    <div className="w-[804px] rounded-[10px] border border-[#E7E7E7] bg-white pb-2 flex flex-col gap-[10px] p-4" dir="rtl">
      {/* عنوان */}
      <h3 className="font-vazirmatn font-bold text-base text-[#2E2E2E] text-right">
        راه‌های ارتباطی
      </h3>

      {/* 3 باکس ارتباطی */}
      <div className="flex items-center gap-[10px]">
        {contacts.map((contact, index) => (
          <a
            key={index}
            href={contact.href}
            target={contact.href !== '#' ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`${contact.width} h-[52px] rounded-lg border border-[#E7E7E7] flex items-center gap-3 hover:bg-gray-50 transition-colors overflow-hidden`}
            style={{
              paddingTop: '12px',
              paddingRight: '20px',
              paddingBottom: '12px',
              paddingLeft: '24px',
            }}
          >
            {/* آیکون */}
            <div className="flex-shrink-0">
              {contact.icon}
            </div>
            <div className="flex flex-col min-w-0 text-right">
              <span className="font-vazirmatn font-normal text-xs text-[#888888]">
                {contact.label}
              </span>
              <span className="font-vazirmatn font-medium text-sm text-[#2E2E2E] truncate" dir="ltr">
                {contact.value}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactMethods;