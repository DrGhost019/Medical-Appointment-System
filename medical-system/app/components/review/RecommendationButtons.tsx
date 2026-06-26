"use client";

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

type Recommendation = 'positive' | 'negative' | null;

interface RecommendationButtonsProps {
  onRecommendationChange?: (recommendation: Recommendation) => void;
}

const RecommendationButtons = ({ onRecommendationChange }: RecommendationButtonsProps) => {
  const [selected, setSelected] = useState<Recommendation>(null);

  const handleClick = (type: Recommendation) => {
    // اگه همون دکمه قبلی رو زد، deselect کن
    const newSelection = selected === type ? null : type;
    setSelected(newSelection);
    if (onRecommendationChange) {
      onRecommendationChange(newSelection);
    }
  };

  return (
    <div
      className="flex items-center gap-4 w-full"
      style={{
        maxWidth: '760px',
      }}
    >
      {/* دکمه پیشنهاد می‌کنم */}
      <button
        type="button"
        onClick={() => handleClick('positive')}
        className={`flex-1 h-12 rounded-lg border font-vazirmatn font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
          selected === 'positive'
            ? 'border-[#4CAF50] bg-[#4CAF50]/5 text-[#4CAF50]'
            : 'border-[#E7E7E7] bg-white text-[#666666] hover:bg-gray-50'
        }`}
      >
        <ThumbsUp size={18} />
        <span>پزشک را پیشنهاد می‌کنم</span>
      </button>

      {/* دکمه پیشنهاد نمی‌کنم */}
      <button
        type="button"
        onClick={() => handleClick('negative')}
        className={`flex-1 h-12 rounded-lg border font-vazirmatn font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
          selected === 'negative'
            ? 'border-[#E53E3E] bg-[#E53E3E]/5 text-[#E53E3E]'
            : 'border-[#E7E7E7] bg-white text-[#666666] hover:bg-gray-50'
        }`}
      >
        <ThumbsDown size={18} />
        <span>پزشک را پیشنهاد نمی‌کنم</span>
      </button>
    </div>
  );
};

export default RecommendationButtons;