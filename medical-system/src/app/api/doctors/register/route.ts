import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Doctor from '../../../models/Doctor';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await connectDB();

    const { name, phone, password, specialty, bio, avatar } = await request.json();

    // ۱. اعتبارسنجی فیلدهای اجباری
    if (!name || !phone || !password || !specialty) {
      return NextResponse.json(
        { message: 'وارد کردن نام، شماره موبایل، رمز عبور و تخصص الزامی است.' },
        { status: 400 }
      );
    }

    // ۲. بررسی تکراری نبودن شماره موبایل پزشک
    const doctorExists = await Doctor.findOne({ phone });
    if (doctorExists) {
      return NextResponse.json(
        { message: 'پزشکی با این شماره موبایل قبلاً ثبت‌نام کرده است.' },
        { status: 400 }
      );
    }

    // ۳. هش کردن رمز عبور با ابزار bcrypt
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // ۴. ایجاد حساب پزشک در دیتابیس
    const newDoctor = await Doctor.create({
      name,
      phone,
      passwordHash,
      specialty,
      bio: bio || '',
      avatar: avatar || '',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'ثبت‌نام پزشک با موفقیت انجام شد.',
        doctor: {
          id: newDoctor._id,
          name: newDoctor.name,
          phone: newDoctor.phone,
          specialty: newDoctor.specialty,
        },
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('❌ خطا در ثبت‌نام پزشک:', error);
    return NextResponse.json(
      { message: 'خطایی در سرور رخ داده است.', error: error.message },
      { status: 500 }
    );
  }
}