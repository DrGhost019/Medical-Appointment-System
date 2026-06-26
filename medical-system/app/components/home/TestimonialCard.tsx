// src/components/home/TestimonialCard.tsx
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  userImage: string;
  userName: string;
  date: string;
  rating: number;
  comment: string;
  doctorName: string;
}

const TestimonialCard = ({ userImage, userName, date, rating, comment, doctorName }: TestimonialCardProps) => {
  return (
    <div className="w-[394px] h-[183px] rounded-[10px] border border-[#E7E7E7] bg-white p-4 flex flex-col gap-2">
      
      {/* Row 1: User Image + Name + Date */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={userImage}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-vazirmatn font-medium text-sm text-[#000000]">
            {userName}
          </span>
        </div>
        <span className="font-vazirmatn font-normal text-xs text-[#888888]">
          {date}
        </span>
      </div>

      {/* Row 2: Rating */}
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={14}
            className={
              index < rating
                ? 'fill-[#FFB800] text-[#FFB800]'
                : 'fill-gray-200 text-gray-200'
            }
          />
        ))}
      </div>

      {/* Row 3: Comment */}
      <p className="font-vazirmatn font-normal text-xs text-[#666666] leading-[180%] line-clamp-2">
        {comment}
      </p>

      {/* Row 4: Doctor Name + View Button */}
      <div className="flex items-center justify-between mt-auto">
        <span className="font-vazirmatn font-normal text-xs text-[#888888]">
          درباره {doctorName}
        </span>
        <button className="font-vazirmatn font-medium text-xs text-[#4179F0] hover:text-[#3565d0] transition-colors">
          مشاهده دکتر
        </button>
      </div>

    </div>
  );
};

export default TestimonialCard;