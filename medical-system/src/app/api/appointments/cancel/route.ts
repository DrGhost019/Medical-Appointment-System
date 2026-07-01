// src/app/api/appointments/cancel/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Slot from '../../../models/Slot';
import jwt from 'jsonwebtoken';

export async function PATCH(request: Request) {
  try {
    await connectDB();

    // ۱. بررسی توکن JWT
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

    const userId = decoded.userId;
    const userRole = decoded.role;

    // ۲. دریافت slotId از بدنه درخواست
    const { slotId } = await request.json();

    if (!slotId) {
      return NextResponse.json(
        { message: 'شناسه نوبت الزامی است.' },
        { status: 400 }
      );
    }

    // ۳. پیدا کردن نوبت در دیتابیس
    const slot = await Slot.findById(slotId);

    if (!slot) {
      return NextResponse.json(
        { message: 'نوبت یافت نشد.' },
        { status: 404 }
      );
    }

    // ۴. بررسی دسترسی برای کنسل کردن
    // فقط خود بیمار یا پزشک مربوطه می‌توانند نوبت را کنسل کنند
    if (userRole === 'user') {
      // بیمار: باید صاحب نوبت باشد
      if (slot.patientId?.toString() !== userId) {
        return NextResponse.json(
          { message: 'شما اجازه کنسل کردن این نوبت را ندارید.' },
          { status: 403 }
        );
      }
    } else if (userRole === 'doctor') {
      // پزشک: باید پزشک مربوط به این نوبت باشد
      if (slot.doctorId?.toString() !== userId) {
        return NextResponse.json(
          { message: 'شما اجازه کنسل کردن این نوبت را ندارید.' },
          { status: 403 }
        );
      }
    } else {
      return NextResponse.json(
        { message: 'نقش کاربر نامعتبر است.' },
        { status: 403 }
      );
    }

    // ۵. کنسل کردن نوبت
    slot.isReserved = false;
    slot.patientId = null;
    await slot.save();

    return NextResponse.json({
      success: true,
      message: 'نوبت با موفقیت کنسل شد.',
    });

  } catch (error: any) {
    console.error('❌ خطا در کنسل کردن نوبت:', error);
    return NextResponse.json(
      { message: 'خطایی در سرور رخ داده است.', error: error.message },
      { status: 500 }
    );
  }
}