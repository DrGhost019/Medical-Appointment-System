import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Doctor from '../../../models/Doctor';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    await connectDB();

    const { phone, password } = await request.json();

    // ۱. اعتبارسنجی اولیه ورودی‌ها
    if (!phone || !password) {
      return NextResponse.json(
        { message: 'وارد کردن شماره موبایل و رمز عبور الزامی است.' },
        { status: 400 }
      );
    }

    // ۲. پیدا کردن پزشک در دیتابیس بر اساس شماره موبایل
    const doctor = await Doctor.findOne({ phone });
    if (!doctor) {
      return NextResponse.json(
        { message: 'پزشکی با این شماره موبایل یافت نشد.' },
        { status: 404 }
      );
    }

    // ۳. بررسی صحت رمز عبور وارد شده
    const isPasswordValid = await bcrypt.compare(password, doctor.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'رمز عبور اشتباه است.' },
        { status: 401 }
      );
    }

    // ۴. صدور توکن امنیتی JWT برای پزشک
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('متغیر JWT_SECRET در فایل env تعریف نشده است.');
    }

    const token = jwt.sign(
      { userId: doctor._id, phone: doctor.phone, role: 'doctor' }, // نقش پزشک را doctor می‌گذاریم
      jwtSecret,
      { expiresIn: '7d' } // توکن تا ۷ روز معتبر است
    );

    // ۵. بازگرداندن پاسخ موفقیت آمیز به همراه توکن
    return NextResponse.json(
      {
        success: true,
        message: 'ورود پزشک با موفقیت انجام شد.',
        token,
        doctor: {
          id: doctor._id,
          name: doctor.name,
          phone: doctor.phone,
          specialty: doctor.specialty,
          role: 'doctor',
        },
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('❌ خطا در لاگین پزشک:', error);
    return NextResponse.json(
      { message: 'خطایی در سرور رخ داده است.', error: error.message },
      { status: 500 }
    );
  }
}