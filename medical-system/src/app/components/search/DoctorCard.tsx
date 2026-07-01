"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Star, MapPin } from "lucide-react";

interface DoctorCardProps {
  imageSrc: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  location: string;
  doctorId: string;
}

const toPersianNumber = (num: number | string): string => {
  if (num === null || num === undefined) return "۰";

  const persianDigits = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];

  return num
    .toString()
    .replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

export default function DoctorCard({
  imageSrc,
  name,
  specialty,
  rating,
  reviewCount,
  location,
  doctorId,
}: DoctorCardProps) {
  const router = useRouter();

  const handleProfileClick = () => {
    console.log("Doctor ID:", doctorId);
    console.log("Profile URL:", `/doctors/${doctorId}`);

    router.push(`/doctors/${doctorId}`);
  };

  const handleBookingClick = () => {
    console.log("Doctor ID:", doctorId);
    console.log("Booking URL:", `/doctors/${doctorId}/booking`);

    router.push(`/doctors/${doctorId}/booking`);
  };

  return (
    <div className="w-[289px] h-[363px] rounded-[10px] border border-[#E7E7E7] bg-white pb-4 flex flex-col hover:shadow-lg transition-shadow">

      {/* تصویر پزشک */}
      <div
        onClick={handleProfileClick}
        className="cursor-pointer"
      >
        <div className="w-[289px] h-[200px] rounded-t-[10px] overflow-hidden bg-gray-100">
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4 flex-1">

        <div className="flex items-center justify-between">
          <h3 className="font-vazirmatn font-medium text-base text-[#000]">
            {name}
          </h3>

          <div className="flex items-center gap-1">
            <Star
              size={14}
              className="fill-[#FFB800] text-[#FFB800]"
            />

            <span className="font-bold text-sm text-[#FFB800]">
              {toPersianNumber(rating)}
            </span>

            <span className="text-xs text-[#888]">
              ({toPersianNumber(reviewCount)})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-[#666]">
            {specialty}
          </p>

          <div className="flex items-center gap-1">
            <MapPin size={14} />

            <span className="text-xs">
              {location}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-auto">

          <button
            type="button"
            onClick={handleBookingClick}
            className="w-full h-10 rounded-lg border-2 border-[#4179F0] text-[#4179F0] hover:bg-blue-50"
          >
            رزرو نوبت
          </button>

          <button
            type="button"
            onClick={handleProfileClick}
            className="w-full h-10 rounded-lg border border-[#E7E7E7] hover:bg-gray-50"
          >
            مشاهده پروفایل
          </button>

        </div>

      </div>
    </div>
  );
}