// src/app/components/shared/StarRating.tsx
"use client";

import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating?: number;
  maxRating?: number;
  size?: number;
  onRatingChange?: (rating: number) => void;
}

export default function StarRating({ 
  rating = 0, 
  maxRating = 5, 
  size = 20,
  onRatingChange 
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleClick = (index: number) => {
    if (onRatingChange) {
      onRatingChange(index);
    }
  };

  return (
    <div className="flex items-center gap-1" dir="ltr">
      {[...Array(maxRating)].map((_, index) => {
        const starIndex = index + 1;
        const isFilled = starIndex <= (hoverRating || rating);
        
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(starIndex)}
            onMouseEnter={() => setHoverRating(starIndex)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none"
          >
            <Star
              size={size}
              className={`transition-colors ${
                isFilled ? 'fill-[#FFB800] text-[#FFB800]' : 'fill-gray-200 text-gray-200'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}