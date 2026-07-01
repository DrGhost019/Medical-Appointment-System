// src/lib/persianNumber.ts
/**
 * تبدیل اعداد انگلیسی به فارسی
 */
export const toPersianNumber = (num: number | string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

/**
 * تبدیل امتیاز (مثلاً 4.0) به فرمت فارسی (۴.۰)
 */
export const toPersianRating = (rating: number): string => {
  return toPersianNumber(rating.toFixed(1));
};