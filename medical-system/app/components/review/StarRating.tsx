// src/components/review/StarRating.tsx
"use client";

import React, { useState } from 'react';

interface StarRatingProps {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
}

const StarRating = ({ initialRating = 0, onRatingChange }: StarRatingProps) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleMouseEnter = (starIndex: number) => {
    setHoverRating(starIndex);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (starIndex: number) => {
    setRating(starIndex);
    if (onRatingChange) {
      onRatingChange(starIndex);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div
      className="flex items-center justify-between"
      style={{
        width: '760px',
        height: '32px',
        paddingTop: '6px',
        paddingRight: '8px',
        paddingBottom: '6px',
        paddingLeft: '8px',
      }}
    >
      {/* عنوان */}
      <span className="font-vazirmatn font-normal text-sm text-[#2E2E2E]">
        امتیاز شما به نوبت گرفته شده:
      </span>

      {/* ستاره‌ها */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <button
            key={starIndex}
            type="button"
            className="p-0 bg-transparent border-none cursor-pointer"
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={starIndex <= displayRating ? '#FFB800' : '#E0E0E0'}
              className="transition-colors duration-150"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StarRating;