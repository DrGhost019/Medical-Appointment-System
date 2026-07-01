import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Otp from '../../../models/Otp';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    // ۱. اتصال به دیتابیس
    await connectDB();

    // ۲. دریافت اطلاعات از فرانت‌اَند
    const { phone, code } = await request.json();

    // اعتبارسنجی اولیه ورودی‌ها
    if (!phone || !code) {
      return NextResponse.json(
        { message: 'شماره موبایل و کد تایید الزامی هستند.' },
        { status: 400 }
      );
    }

    // ۳. پیدا کردن کد OTP ذخیره شده در دیتابیس برای این شماره
    const otpRecord = await Otp.findOne({ phone, code });

    // اگر رکوردی پیدا نشد یا کد اشتباه بود
    if (!otpRecord) {
      return NextResponse.json(
        { message: 'کد تایید اشتباه است یا منقضی شده است.' },
        { status: 400 }
      );
    }

    // بررسی زمان انقضا (هرچند TTL index مونگو خودش بعد از ۲ دقیقه پاکش می‌کند، اما این شرط جهت امنیت مضاعف است)
    if (new Date() > otpRecord.expiresAt) {
      await Otp.deleteOne({ _id: otpRecord._id }); // پاک کردن کد منقضی شده
      return NextResponse.json(
        { message: 'کد تایید منقضی شده است.' },
        { status: 400 }
      );
    }

    // ۴. کد صحیح بوده؛ پس آن را از دیتابیس پاک می‌کنیم تا دوباره قابل استفاده نباشد
    await Otp.deleteOne({ _id: otpRecord._id });

    // ۵. بررسی اینکه آیا کاربر از قبل ثبت‌نام کرده یا کاربر جدید است
    let user = await User.findOne({ phone });

    if (!user) {
      // اگر کاربر جدید بود، او را در دیتابیس ثبت‌نام می‌کنیم
      user = await User.create({
        phone,
        role: 'user', // نقش پیش‌فرض بیمار یا همان کاربر عادی است
      });
    }

    // ۶. صدور توکن امنیتی JWT برای کاربر
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('متغیر JWT_SECRET در فایل env تعریف نشده است.');
    }

    const token = jwt.sign(
      { userId: user._id, phone: user.phone, role: user.role },
      jwtSecret,
      { expiresIn: '7d' } // توکن تا ۷ روز معتبر است
    );

    // ۷. فرستادن توکن و اطلاعات کاربر برای فرانت‌اَند
    return NextResponse.json(
      {
        success: true,
        message: 'ورود با موفقیت انجام شد.',
        token,
        user: {
          id: user._id,
          phone: user.phone,
          name: user.name || '',
          role: user.role,
        },
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('❌ خطا در API تایید کد:', error);
    return NextResponse.json(
      { message: 'خطایی در سرور رخ داده است.', error: error.message },
      { status: 500 }
    );
  }
}