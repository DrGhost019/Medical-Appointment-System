import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Slot from '../../../models/Slot';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    await connectDB();

    // ۱. بررسی توکن امنیتی پزشک
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'توکن امنیتی ارسال نشده است.' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decoded.role !== 'doctor') {
      return NextResponse.json({ message: 'فقط پزشکان مجاز به ثبت زمان کاری هستند.' }, { status: 403 });
    }

    const doctorId = decoded.userId;

    // ۲. دریافت اطلاعات زمان‌بندی از بدنه درخواست
    // فرانت‌اَند می‌تواند یک آرایه از ساعت‌ها بفرستد تا پزشک همزمان چند بازه را ثبت کند
    const { date, times } = await request.json(); // نمونه ورودی: date: "1405/04/10", times: ["09:00-09:30", "09:30-10:00"]

    if (!date || !times || !Array.isArray(times) || times.length === 0) {
      return NextResponse.json(
        { message: 'وارد کردن تاریخ و حداقل یک بازه زمانی الزامی است.' },
        { status: 400 }
      );
    }

    // ۳. ساخت بازه‌های زمانی در دیتابیس
    const createdSlots = [];
    
    for (const timeStr of times) {
      try {
        // ایجاد هر بازه به صورت مجزا
        const newSlot = await Slot.create({
          doctorId,
          date,
          time: timeStr,
          isReserved: false
        });
        createdSlots.push(newSlot);
      } catch (err: any) {
        // اگر بازه‌ای از قبل تکراری بود (بخاطر unique index) از آن عبور می‌کنیم تا بقیه ثبت شوند
        console.warn(`بازه تکراری ثبت نشد: ${date} - ${timeStr}`);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `${createdSlots.length} بازه زمانی با موفقیت برای شما ثبت شد.`,
        slots: createdSlots,
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('❌ خطا در ثبت زمان‌های کاری پزشک:', error);
    return NextResponse.json(
      { message: 'خطایی در سرور رخ داده است.', error: error.message },
      { status: 500 }
    );
  }
}