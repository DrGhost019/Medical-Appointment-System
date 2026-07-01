import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Doctor from '../../../models/Doctor';
import jwt from 'jsonwebtoken';

export async function PUT(request: Request) {
  try {
    await connectDB();

    // ۱. بررسی و تایید توکن JWT پزشک از روی هدر درخواست (Authorization)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'دسترسی غیرمجاز؛ توکن امنیتی ارسال نشده است.' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET!;
    
    let decoded: any;
    try {
      decoded = jwt.verify(token, jwtSecret);
    } catch (err) {
      return NextResponse.json(
        { message: 'توکن نامعتبر یا منقضی شده است.' },
        { status: 401 }
      );
    }

    // بررسی اینکه آیا فرد لاگین شده حتماً نقش پزشک دارد یا خیر
    if (decoded.role !== 'doctor') {
      return NextResponse.json(
        { message: 'فقط کاربران با نقش پزشک به این بخش دسترسی دارند.' },
        { status: 403 }
      );
    }

    const doctorId = decoded.userId;

    // ۲. دریافت اطلاعات جدید از فرانت‌اَند
    // ۲. دریافت اطلاعات جدید از فرانت‌اَند به صورت ایمن
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json(
        { message: 'بدنه درخواست (Body) نمی‌تواند خالی باشد و باید فرمت JSON معتبر داشته باشد.' },
        { status: 400 }
      );
    }

    const { name, specialty, bio, avatar } = body;
    //const { name, specialty, bio, avatar } = await request.json();

    // ۳. پیدا کردن و بروزرسانی اطلاعات پزشک در دیتابیس
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      {
        $set: {
          ...(name && { name }),
          ...(specialty && { specialty }),
          ...(bio !== undefined && { bio }),
          ...(avatar !== undefined && { avatar }),
        },
      },
      { new: true, runValidators: true } // گزینه‌ی new باعث می‌شود دیتای آپدیت‌شده جدید خروجی داده شود
    ).select('-passwordHash'); // پسورد هش شده را در خروجی نفرستد

    if (!updatedDoctor) {
      return NextResponse.json(
        { message: 'پزشک مورد نظر یافت نشد.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'اطلاعات پروفایل با موفقیت بروزرسانی شد.',
        doctor: updatedDoctor,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('❌ خطا در ویرایش پروفایل پزشک:', error);
    return NextResponse.json(
      { message: 'خطایی در سرور رخ داده است.', error: error.message },
      { status: 500 }
    );
  }
}