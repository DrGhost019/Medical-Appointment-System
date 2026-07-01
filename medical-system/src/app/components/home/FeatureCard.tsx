// src/components/home/FeatureCard.tsx
import React from 'react';

interface FeatureCardProps {
  iconSrc: string;
  title: string;
  description: string;
}

const FeatureCard = ({ iconSrc, title, description }: FeatureCardProps) => {
  return (
    <div className="w-full h-[132px] rounded-[10px] border border-[#E7E7E7] bg-white p-10 flex items-center gap-3 hover:shadow-md transition-shadow">
      <div className="w-8 h-8 flex-shrink-0">
        <img 
          src={iconSrc} 
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-vazirmatn font-bold text-base text-[#262626]">
          {title}
        </h3>
        <p className="font-vazirmatn font-normal text-sm text-[#666666] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;