// src/components/about/OurTeam.tsx
import React from 'react';

const teamMembers = [
  {
    name: 'Mehdi Zarei',
    role: 'UI/UX Designer',
    image: '/assets/mehdi.png',
    top: '199.5px',
    left: '33.68px',
    width: '308px',
    height: '382px',
  },
  {
    name: 'Mohamad Reza Abiri',
    role: 'UI/UX Designer',
    image: '/assets/mohammadreza.jpg',
    top: '8.5px',
    left: '405.68px',
    width: '308px',
    height: '382px',
  },
  {
    name: 'Zahra Moradian',
    role: 'UI/UX Designer',
    image: '/assets/zahra.jpg',
    top: '193.24px',
    left: '782px',
    width: '308px',
    height: '386px',
  },
  {
    name: 'Reza Sherafat',
    role: 'UI/UX Designer',
    image: '/assets/reza.png',
    top: '628.5px',
    left: '209.68px',
    width: '332px',
    height: '382px',
  },
  {
    name: 'Majid Borhani',
    role: 'UI/UX Designer',
    image: '/assets/majid.jpg',
    top: '628px',
    left: '590px',
    width: '332px',
    height: '382px',
  },
];

const OurTeam = () => {
  return (
    <section className="w-full py-16">
      <div
        className="flex flex-col mx-auto"
        style={{
          width: '1119px',
          height: '1138px',
          gap: '59px',
        }}
      >
        {/* عنوان */}
        <h2
          className="font-vazirmatn font-bold text-center"
          style={{
            width: '1119px',
            height: '36px',
            fontSize: '24px',
            lineHeight: '150%',
            color: '#000000',
          }}
        >
          تیم ما
        </h2>

        {/* باکس عکس‌ها - با position relative برای قرار دادن کارت‌ها */}
        <div
          className="relative mx-auto"
          style={{
            width: '1119px',
            height: '1043px',
          }}
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="absolute flex flex-col bg-white"
              style={{
                top: member.top,
                left: member.left,
                width: member.width,
                height: member.height,
                borderRadius: '20px',
                border: '1px solid #E7E7E7',
                padding: '16px',
                gap: '20px',
              }}
            >
              {/* تصویر عضو تیم */}
              <div className="w-full flex-1 rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* نام */}
              <h3 className="font-vazirmatn font-bold text-base text-[#2E2E2E] text-center">
                {member.name}
              </h3>

              {/* عنوان شغلی */}
              <p className="font-vazirmatn font-normal text-sm text-[#666666] text-center">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;