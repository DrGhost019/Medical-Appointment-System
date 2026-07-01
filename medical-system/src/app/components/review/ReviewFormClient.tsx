// src/app/components/review/ReviewFormClient.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import StarRating from '../shared/StarRating'; // ✅ مسیر درست
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
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  const { user, token, isAuthenticated } = useAuthStore();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [isAuthenticated]);

  const isFormValid = 
    selectedRating > 0 && 
    reviewText.trim().length > 0 && 
    termsAccepted;

  const canSubmit = isFormValid && isLoggedIn;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorId,
          rating: selectedRating,
          recommendation,
          comment: reviewText,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setIsSubmitted(true);
      } else {
        alert(data.message || 'خطا در ثبت نظر');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('خطا در ارتباط با سرور');
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <StarRating onRatingChange={setSelectedRating} />
        <RecommendationButtons onRecommendationChange={setRecommendation} />
        <ReviewTextArea value={reviewText} onChange={setReviewText} />

        <div className="flex items-center justify-between gap-4 w-full" style={{ maxWidth: '760px' }}>
          <TermsCheckbox checked={termsAccepted} onChange={setTermsAccepted} />

          <div className="flex flex-col items-end gap-2">
            <SubmitButton disabled={!canSubmit} onClick={handleSubmit} />
            
            {!isLoggedIn && (
              <p className="font-vazirmatn font-normal text-xs text-[#E53E3E] text-left">
                ابتدا برای ثبت نظر باید وارد حساب خود شوید.
              </p>
            )}
          </div>
        </div>
      </div>

      {isSubmitted && (
        <ReviewSuccessMessage doctorId={doctorId} onClose={handleClose} />
      )}
    </>
  );
};

export default ReviewFormClient;