"use client";

import React, { useState, useEffect } from 'react';

// 👈 تبدیل آدرس الیاس (@) به آدرس کامل و نسبی محلی برای حل ارور ماژول
import { getUser } from '../../lib/auth';

import StarRating from './StarRating';
import RecommendationButtons from './RecommendationButtons';
import ReviewTextArea from './ReviewTextArea';
import TermsCheckbox from './TermsCheckbox';
import SubmitButton from './SubmitButton';
import ReviewSuccessMessage from './ReviewSuccessMessage';

interface ReviewFormClientProps {
  doctorId: string;
}

const ReviewFormClient = ({ doctorId }: ReviewFormClientProps) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [recommendation, setRecommendation] = useState<'positive' | 'negative' | null>(null);
  const [reviewText, setReviewText] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // چک کردن وضعیت لاگین
  useEffect(() => {
    const user = getUser();
    setIsLoggedIn(user !== null);
  }, []);

  // شرط اصلی: همه فیلدها پر شده باشن
  const isFormValid = 
    selectedRating > 0 && 
    reviewText.trim().length > 0 && 
    termsAccepted;

  // شرط نهایی: فرم معتبر + کاربر لاگین کرده باشه
  const canSubmit = isFormValid && isLoggedIn;

  const handleSubmit = () => {
    if (!canSubmit) return;
    
    console.log('Submitting review:', {
      rating: selectedRating,
      recommendation,
      text: reviewText,
      termsAccepted,
    });
    
    // نمایش Modal موفقیت
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
  };

  return (
    <>
      {/* فرم ثبت نظر */}
      <div className="flex flex-col gap-6">
        {/* Star Rating */}
        <StarRating onRatingChange={setSelectedRating} />
        
        {/* Recommendation Buttons */}
        <RecommendationButtons onRecommendationChange={setRecommendation} />

        {/* Review Text Area */}
        <ReviewTextArea value={reviewText} onChange={setReviewText} />

        {/* ردیف پایین: TermsCheckbox + SubmitButton */}
        <div 
          className="flex items-center justify-between gap-4 w-full" 
          style={{ maxWidth: '760px' }}
        >
          {/* سمت راست در حالت RTL: Terms Checkbox */}
          <TermsCheckbox 
            checked={termsAccepted} 
            onChange={setTermsAccepted} 
          />

          {/* سمت چپ در حالت RTL: Submit Button + پیام */}
          <div className="flex flex-col items-end gap-2">
            <SubmitButton 
              disabled={!canSubmit} 
              onClick={handleSubmit} 
            />
            
            {/* پیام خطا برای کاربر لاگین نکرده */}
            {!isLoggedIn && (
              <p className="font-vazirmatn font-normal text-xs text-[#E53E3E] text-left">
                ابتدا برای ثبت نظر باید ثبت نام کنید.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal موفقیت */}
      {isSubmitted && (
        <ReviewSuccessMessage 
          doctorId={doctorId} 
          onClose={handleClose} 
        />
      )}
    </>
  );
};

export default ReviewFormClient;