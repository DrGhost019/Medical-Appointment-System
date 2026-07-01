import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Slot from '../../../models/Slot';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    await connectDB();

    // ۱. بررسی و تایید توکن JWT بیمار (کاربر عادی)
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

    // بررسی نقش کاربر (فقط کاربران عادی/بیماران می‌توانند نوبت رزرو کنند)
    if (decoded.role !== 'user') {
      return NextResponse.json(
        { message: 'فقط کاربران (بیماران) مجاز به رزرو نوبت هستند.' },
        { status: 403 }
      );
    }

    const patientId = decoded.userId;

    // ۲. دریافت شناسه بازه زمانی (slotId) از فرانت‌اَند
    const { slotId } = await request.json();

    if (!slotId) {
      return NextResponse.json(
        { message: 'انتخاب یک بازه زمانی (slotId) الزامی است.' },
        { status: 400 }
      );
    }

    // ۳. پیدا کردن بازه زمانی در دیتابیس
    const slot = await Slot.findById(slotId);

    if (!slot) {
      return NextResponse.json(
        { message: 'بازه زمانی مورد نظر یافت نشد.' },
        { status: 404 }
      );
    }

    // ۴. بررسی اینکه آیا این نوبت قبلاً توسط شخص دیگری رزرو شده یا خیر
    if (slot.isReserved) {
      return NextResponse.json(
        { message: 'این نوبت قبلاً توسط بیمار دیگری رزرو شده است.' },
        { status: 400 }
      );
    }

    // ۵. تغییر وضعیت نوبت به رزرو شده و ثبت شناسه بیمار
    slot.isReserved = true;
    slot.patientId = patientId;
    await slot.save();

    return NextResponse.json(
      {
        success: true,
        message: 'نوبت شما با موفقیت رزرو شد.',
        appointment: {
          slotId: slot._id,
          date: slot.date,
          time: slot.time,
          doctorId: slot.doctorId,
        },
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('❌ خطا در رزرو نوبت:', error);
    return NextResponse.json(
      { message: 'خطایی در سرور رخ داده است.', error: error.message },
      { status: 500 }
    );
  }
}