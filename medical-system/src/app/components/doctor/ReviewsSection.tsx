// src/components/doctor/ReviewsSection.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThumbsUp, MessageSquare, ChevronDown } from 'lucide-react';

const toPersianNumber = (value: number | string | undefined): string => {
  if (value === undefined || value === null) return '۰';
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return value.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

interface ReviewItem {
  _id?: string;
  id?: string;
  userName: string;
  userImage?: string;
  rating: number;
  date?: string;
  comment: string;
}

interface ReviewsSectionProps {
  doctorId: string;
  doctorName: string;
  reviews?: ReviewItem[];
  rating?: number;
  reviewCount?: number;
}

export default function ReviewsSection({
  doctorId,
  doctorName,
  reviews = [],
  rating = 5,
  reviewCount = 0,
}: ReviewsSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [allReviews, setAllReviews] = useState<ReviewItem[]>(reviews);
  const [isLoading, setIsLoading] = useState(false);

  // دریافت نظرات از دیتابیس
  useEffect(() => {
    const fetchReviews = async () => {
      if (!doctorId) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(`/api/doctors/${doctorId}/reviews`);
        const data = await response.json();
        
        if (data.success && data.reviews) {
          setAllReviews(data.reviews);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // استفاده از دیتای ورودی در صورت خطا
        if (reviews.length > 0) {
          setAllReviews(reviews);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (reviews.length === 0) {
      fetchReviews();
    }
  }, [doctorId, reviews]);

  const displayedReviews = showAll ? allReviews : allReviews.slice(0, 3);
  const recommendationPercent = 90;

  if (isLoading) {
    return (
      <div className="w-[804px] rounded-[10px] border border-[#E7E7E7] bg-white p-6 flex items-center justify-center" dir="rtl">
        <p className="font-vazirmatn text-sm text-[#666666]">در حال بارگذاری نظرات...</p>
      </div>
    );
  }

  return (
    <div className="w-[804px] rounded-[10px] border border-[#E7E7E7] bg-white p-6 flex flex-col gap-6" dir="rtl">
      
      {/* عنوان */}
      <h3 className="font-vazirmatn font-bold text-base text-[#2E2E2E] text-right">
        نظرات کاربران
      </h3>

      {/* Summary Row */}
      <div className="flex items-center justify-between border-b border-[#E7E7E7] pb-4">
        
        {/* سمت راست: ستاره + عدد */}
        <div className="flex items-center gap-2">
          <div className="flex items-center" dir="ltr">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={star <= Math.floor(rating) ? '#FFB800' : '#E0E0E0'}
                className="mr-0.5"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="font-vazirmatn font-bold text-sm text-[#FFB800]">
            {toPersianNumber(rating)}
          </span>
          <span className="font-vazirmatn font-normal text-xs text-[#888888]">
            ({toPersianNumber(reviewCount)} نظر)
          </span>
        </div>

        {/* وسط: درصد پیشنهاد */}
        <div className="flex items-center gap-2">
          <ThumbsUp size={18} className="text-[#4CAF50] flex-shrink-0" />
          <span className="font-vazirmatn font-normal text-sm text-[#666666]">
            {toPersianNumber(recommendationPercent)}٪ مراجعه‌کنندگان این پزشک را پیشنهاد داده‌اند
          </span>
        </div>

        {/* سمت چپ: دکمه ثبت نظر */}
        <Link href={`/doctors/${doctorId}/review`}>
          <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#4179F0] text-[#4179F0] font-vazirmatn font-medium text-sm hover:bg-blue-50 transition-colors cursor-pointer">
            <MessageSquare size={16} />
            ثبت نظر
          </button>
        </Link>
      </div>

      {/* Reviews List */}
      <div className="flex flex-col gap-6 text-right">
        {displayedReviews.length === 0 ? (
          <p className="font-vazirmatn font-normal text-sm text-[#888888] text-center py-4">
            هنوز نظری برای این پزشک ثبت نشده است. اولین نفر باشید!
          </p>
        ) : (
          displayedReviews.map((review, idx) => {
            const reviewId = review._id || review.id || `rev_${idx}`;
            const userAvatar = review.userImage || '/assets/logo.png';
            const reviewDate = review.date || 'اخیر';

            return (
              <div key={reviewId} className="flex flex-col gap-3 border-b border-[#E7E7E7] pb-6 last:border-b-0 last:pb-0">
                
                {/* User Info + Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 relative flex-shrink-0">
                      <img
                        src={userAvatar}
                        alt={review.userName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/logo.png';
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-vazirmatn font-medium text-sm text-[#2E2E2E]">
                        {review.userName}
                      </span>
                      <div className="flex items-center gap-0.5 mt-0.5" dir="ltr">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill={star <= review.rating ? '#FFB800' : '#E0E0E0'}
                            className="mr-0.5"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="font-vazirmatn font-normal text-xs text-[#888888]">
                    {reviewDate}
                  </span>
                </div>

                {/* Comment */}
                <p className="font-vazirmatn font-normal text-sm text-[#666666] leading-[180%]">
                  {review.comment}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* دکمه نظرات بیشتر */}
      {!showAll && allReviews.length > 3 && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="flex items-center gap-2 text-[#4179F0] font-vazirmatn font-medium text-sm hover:text-[#3565d0] transition-colors cursor-pointer"
          >
            نظرات بیشتر
            <ChevronDown size={16} />
          </button>
        </div>
      )}
    </div>
  );
}